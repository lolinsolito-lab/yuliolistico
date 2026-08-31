# 🔒 SECURITY_ARCHITECTURE.md — Yuli Olistico

Documento di riferimento vivo: **va aggiornato ogni volta che si tocca RLS,
si crea una nuova tabella pubblica, o si modifica una funzione RPC.**
Non è teoria generica — è l'inventario esatto di cosa è protetto, come, e
perché, in questo specifico progetto.

---

## 1. Principi Fondamentali (non negoziabili)

1. **Minimo privilegio**: le funzioni serverless (Vercel) usano sempre
   l'**Anon Key**, mai la Service Role Key, a meno che sia strettamente
   indispensabile bypassare RLS in lettura per un motivo esplicito e
   documentato (es. leggere `email_templates`, che non deve essere
   pubblicamente leggibile).
2. **Mai allargare una policy pubblica per comodità**: quando serve una
   scrittura pubblica ristretta (es. incrementare un contatore, disiscrivere
   un'email), si crea una funzione `SECURITY DEFINER` dedicata e ristretta
   al minimo indispensabile — mai una policy `USING (true)` generica.
3. **Fonte unica di verità**: un dato che esiste già in una tabella (prezzo
   e durata in `services`, categoria/tier in `services.category`) non va
   mai duplicato in un'altra tabella "per comodità". Si referenzia o si
   legge al bisogno. Se una duplicazione è temporaneamente inevitabile, va
   commentata esplicitamente nel codice (`-- TEMP: duplicato da X, da
   migrare`).
4. **Testato dal vivo, non solo letto nel codice**: nessuna funzionalità
   che tocca dati va dichiarata "completa" solo perché il codice compila.
   Va verificata in browser + controllata la riga risultante su Supabase.

---

## 2. Inventario RLS per Tabella

| Tabella | Lettura pubblica | Scrittura pubblica | Scrittura admin |
|---|---|---|---|
| `profiles` | Solo la propria riga (`auth.uid() = id`) | ❌ Nessuna (ruolo assegnato solo manualmente da Table Editor, per evitare auto-promozione) | — |
| `services` | ✅ Tutte le righe | ❌ | ✅ via subquery `profiles.role = 'admin'` |
| `site_settings` | ✅ | ❌ | ✅ |
| `posts` | ✅ Solo `published = true` (admin vede anche le bozze) | ❌ | ✅ |
| `quiz_config` | ✅ | ❌ | ✅ |
| `business_profile` | ✅ | ❌ | ✅ |
| `archive_resources` | ✅ Solo `is_published = true` | ❌ (il contatore download passa da RPC dedicata, vedi §3) | ✅ |
| `courses` | ✅ Solo `is_published = true` | ❌ | ✅ |
| `modules` | Solo utenti con `enrollments.status = 'active'` per quel corso, o admin | ❌ | ✅ |
| `enrollments` | Solo la propria riga (`auth.uid() = user_id`) | ❌ (nessun self-enroll oggi — gap funzionale noto, non di sicurezza) | ✅ |
| `leads` | ❌ Nessuna lettura pubblica (solo admin) | ❌ Insert diretto rimosso — solo via RPC `submit_lead()` (vedi §3) | ✅ (`SELECT`/`UPDATE`/`DELETE`) |
| `gift_vouchers` | ✅ Solo `active = true` | ❌ | ✅ |
| `email_templates` | ❌ Nessuna lettura pubblica (nemmeno con Anon Key) — letta solo server-side con Service Role Key dall'endpoint email | ❌ | 🟡 Policy di scrittura admin da confermare esplicitamente (non ancora vista in revisione) |

---

## 3. Funzioni `SECURITY DEFINER` (bypassano RLS in modo controllato)

Tutte con `SET search_path = public` (protezione contro hijacking dello
schema) e `GRANT EXECUTE` esplicito a `anon, authenticated`.

### `submit_lead(...)`
Punto di ingresso **unico** per ogni creazione di lead (quiz, newsletter,
archive, academy, gift, sanctuary). Firma attuale confermata in produzione:

```sql
submit_lead(
  p_name text, p_email text, p_phone text, p_symptom text,
  p_result_treatment text, p_source text, p_honeypot text,
  p_resource_id uuid DEFAULT NULL::uuid,
  p_marketing_consent boolean DEFAULT false
)
```

Comportamento:
- Se `p_honeypot` non è vuoto → esce silenziosamente, nessun insert (finto
  successo, per non allertare bot).
- Valida `p_source` contro whitelist interna (ridondante rispetto al CHECK
  constraint sulla tabella — difesa in profondità).
- Blocca iscrizioni duplicate stessa email+source (eccetto `quiz`, che può
  ripetersi).
- Scrive `consent_given_at` solo se `marketing_consent = true`.

**⚠️ Regola di modifica — letta col sangue, oggi:** per aggiungere un nuovo
`source` o un nuovo parametro:
1. Prima esegui `select pg_get_functiondef(oid) from pg_proc where proname
   = 'submit_lead';` per vedere la definizione ESATTA e COMPLETA, inclusi
   i default — non fidarti di `pg_get_function_identity_arguments`, che
   mostra i tipi ma NON i default.
2. Se cambi l'**ordine** dei parametri rispetto a quello reale, Postgres
   crea un secondo overload invece di sostituire — causa un errore
   ambiguo (`PGRST203`) che rompe **tutti** i chiamanti, non solo quello
   nuovo. Mantieni sempre lo stesso ordine esistente.
3. Se devi comunque cambiare l'ordine, usa `DROP FUNCTION` con la firma
   esatta PRIMA di `CREATE`, e ricorda che il `DROP` cancella i permessi:
   va rifatto il `GRANT EXECUTE` dopo.
4. Aggiorna in coppia: il `CHECK` constraint su `leads.source` E la
   whitelist interna della funzione — mai uno senza l'altro.

### `increment_resource_download(resource_id uuid)`
Incrementa `archive_resources.download_count` per utenti anonimi, senza
concedere `UPDATE` pubblico sull'intera riga (che permetterebbe di
modificare titolo, file_url, is_published).

### `unsubscribe_lead(p_email text)`
Imposta `marketing_consent = false` per l'email data. **Nota accettata
come rischio basso**: nessun token di sicurezza — chiunque conosca
un'email altrui potrebbe tecnicamente disiscriverla. Danno pratico
trascurabile alla scala attuale; da rinforzare con token firmato se la
lista cresce molto.

---

## 4. Storage Buckets

| Bucket | Pubblico? | Note |
|---|---|---|
| `images` | ✅ Sì | Foto servizi/profilo, contenuto sempre pubblico per design |
| `archive_files` | ✅ Sì | PDF/audio lead magnet, pubblico per design (il gate è l'email, non il file) |
| `academy_content` | ⚠️ Sì, **temporaneamente** | Va reso privato con policy legata a `enrollments` PRIMA di caricare contenuto corsi a pagamento. Oggi non c'è ancora nessun corso reale, quindi il rischio è teorico — ma non dimenticare questo prima del lancio Academy. |

Limiti dimensione: `images` 10MB, `archive_files`/`academy_content` 100MB
(rivedere se si useranno video lunghi self-hosted).

---

## 5. Anti-Spam / Anti-Abuso

- **Honeypot** lato frontend + validato lato RPC (`p_honeypot`). Protegge
  dai bot "ciechi" che compilano ogni campo di un form HTML. **Non
  protegge** da un bot che replica la chiamata di rete omettendo
  volontariamente il campo — limite noto e accettato per la scala attuale.
- **Prossimo step quando il traffico cresce**: CAPTCHA (Turnstile/reCAPTCHA)
  + Edge Function di verifica, con rimozione totale del permesso di
  chiamata diretta anonima. Non ancora necessario oggi.

---

## 6. Email (Resend)

- Mittente: `Yuli Olistico <yuli@yuliolistico.com>` (dominio verificato).
- `reply_to` e destinatario notifica admin letti dinamicamente da
  `business_profile.email` — mai hardcoded nel codice.
- Endpoint unico `/api/submit-and-email.js`: inserisce il lead via
  `submit_lead` (Anon Key) PRIMA di tentare l'invio email — se l'email
  fallisce, il lead resta comunque salvato (nessuna perdita di dati).
- Try-catch globale presente: logga lo stack trace lato server
  (`console.error`, visibile solo nei log Vercel), **mai** nella risposta
  pubblica JSON (rischio di esporre dettagli interni a un endpoint
  pubblico).

---

## 7. Aperto / Da Verificare

- 🟡 **Supabase Realtime sul CRM leads**: se il canale realtime rispetta la
  stessa RLS della tabella (solo admin), o se un client anonimo potrebbe
  sottoscriversi e vedere i lead in tempo reale bypassando la policy. Mai
  confermato tecnicamente — verificare prima di considerarlo sicuro.
- 🟡 Policy di scrittura su `email_templates` non ancora vista in revisione
  esplicita — presumibilmente admin-only, da confermare col file SQL reale.
- 🟡 `academy_content` bucket pubblico — promemoria per prima del lancio
  Academy reale (vedi §4).

---

> *Ultimo aggiornamento: 31 Agosto 2026*
> *Documento vivo — aggiornare ad ogni modifica RLS/RPC/bucket.*
