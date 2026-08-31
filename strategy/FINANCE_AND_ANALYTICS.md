# 💰 FINANCE_AND_ANALYTICS.md — Yuli Olistico

> **🟡 STATO: BOZZA DI PARTENZA, NON DOCUMENTO DEFINITIVO.**
> A differenza degli altri due file di questa cartella, questo non è stato
> costruito su fatti verificati passo per passo — è uno scheletro
> ragionevole da riempire con dati reali e decisioni ancora da prendere.
> Vedi la sezione "Domande Aperte" in fondo prima di considerarlo affidabile.

---

## 1. Costi Ricorrenti dell'Infrastruttura

| Servizio | Piano attuale | Costo | Note |
|---|---|---|---|
| Vercel (hosting) | *da confermare* | *da confermare* | Verifica se ancora nel piano gratuito (Hobby) o già passato a Pro |
| Supabase (database) | *da confermare* | *da confermare* | Attenzione ai limiti del piano free (righe DB, storage, bandwidth) man mano che i lead crescono |
| Resend (email) | Free tier | Fino a 3.000 email/mese, 100/giorno | Verificato in conversazione — sufficiente per il volume attuale, monitorare se si avvicina al limite |
| Dominio `yuliolistico.com` | Registrato su Hostinger | *da confermare costo annuale* | Rinnovo da tracciare |
| Luminel Manager | N/A (progetto separato) | N/A | Quando Yuli lo userà come cliente, valutare se a costo agevolato essendo il caso pilota |

**Suggerimento pratico**: questa tabella andrebbe aggiornata ogni volta che
si cambia piano su uno di questi servizi — costa 2 minuti e previene
sorprese in fattura.

---

## 2. Prezzi e Ricavi — Fonte Unica di Verità

**Non duplicare i prezzi qui.** Il catalogo prezzi reale vive in
`services` (tabella Supabase, editabile da Admin → Servizi & Rituali) e in
`gift_vouchers` per le carte regalo. Questo documento non li ripete, per
evitare esattamente il tipo di disallineamento già capitato una volta col
quiz (due fonti degli stessi dati che si sono scollegate nel tempo).

Se serve un'istantanea dei prezzi per un business plan o una proiezione,
va esportata al momento dal CRM/catalogo reale, non mantenuta a mano qui.

---

## 3. Analytics — Cosa Esiste Già vs Cosa Manca

### ✅ Già disponibile, zero lavoro aggiuntivo
- **Funnel lead per canale**: `leads.source` distingue già quiz, newsletter,
  archive, academy, gift, sanctuary — visibile con badge colorati nel CRM
  admin. Query semplice per contare lead per fonte e periodo.
- **Tasso di conversione grezzo**: confrontando lead totali per fonte nel
  tempo si può già vedere quale canale porta più contatti.

### ❌ Non ancora installato
- **Web analytics tradizionale** (Google Analytics 4, Plausible, o simile):
  nessuno strumento di tracciamento visite/pagine è mai stato menzionato o
  installato in questa conversazione. Se serve sapere "quante persone
  visitano il sito, da dove arrivano, quali pagine guardano di più" — va
  scelto e integrato come task a parte.
- **Tracciamento conversioni economiche reali** (chi ha effettivamente
  prenotato/pagato): oggi non esiste, perché il booking è ancora in
  simulazione (Luminel non collegato). Quando Luminel sarà attivo, andrà
  deciso come far parlare i due sistemi per chiudere il cerchio
  lead→prenotazione→incasso.

---

## 4. Domande Aperte (da chiudere con Mike/Yuli prima di considerare questo file completo)

1. Vercel e Supabase sono ancora sui piani gratuiti, o già passati a pagamento?
2. Serve davvero un web analytics tradizionale (GA4/Plausible), o il
   conteggio lead per fonte nel CRM basta per ora?
3. Il costo del dominio e altri costi one-time (es. eventuale hosting email
   Hostinger) vanno tracciati qui o restano solo nella tua contabilità personale?
4. Quando Luminel gestirà booking/pagamenti, questo documento dovrebbe
   assorbire anche quei dati, o restare specifico solo per Yuli Olistico
   come sito vetrina?

---

> *Bozza generata: 31 Agosto 2026 — da validare e completare con dati reali.*
