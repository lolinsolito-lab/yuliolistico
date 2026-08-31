# 👑 Yuli Olistico: 360° Project Audit & Status

Questo documento è la fotografia completa, esaustiva ed esatta del progetto (branch `main`), dettagliata per ogni singolo strato: database, backend serverless, frontend pubblico (Pagine e Componenti), pannello di controllo privato e strategia. L'ultimo grande aggiornamento (31 Agosto 2026) ha chiuso l'intero funnel di acquisizione lead, perfezionato l'esperienza Mobile-First (anche per l'area Admin) e allineato l'architettura tecnica al brand "a domicilio".

---

## 🌳 Albero del Progetto Dettagliato (Architettura)

### 1. 🧭 Cuore Strategico (`/strategy`)
- `YULI_DNA.md` — Identità brand, tone of voice, copy, e regole anti-promessa-clinica (L.4/2013).
- `SECURITY_ARCHITECTURE.md` — Inventario vivo delle Row Level Security (RLS), funzioni RPC, e architettura di sicurezza.
- `FINANCE_AND_ANALYTICS.md` — Struttura dei costi infrastrutturali (Vercel, Supabase, Resend) e metriche/conversioni.

### 2. 🗄️ Backend e Database (`/supabase/setup`)
L'infrastruttura dati è interamente descritta in 23 script SQL (idempotenti e versionati):
- `01_CORE_SCHEMA.sql` — Tabelle base (profiles, services, site_settings, posts, ecc.).
- `02_ALTER_SERVICES.sql` — Espansione campi catalogo.
- `03_ACADEMY.sql` — Schema LMS (corsi, moduli, enrollments).
- `04_ARCHIVE.sql` — Gestione risorse gratuite (lead magnet).
- `05_BUSINESS_PROFILE.sql` — Dati e contatti dell'attività.
- `06_QUIZ_CONFIG.sql` — Configurazione dinamica per l'engine diagnostico.
- `07_SITE_CONTENT_SEED.sql` — Contenuti statici del sito.
- `08_LEADS.sql` — Tabella CRM principale per l'acquisizione contatti.
- `09_STORAGE_POLICIES.sql` — Policy pubbliche per i bucket immagini e documenti.
- `10_OPTIMIZATIONS.sql` — Indici e ottimizzazioni performance.
- `11_archive_download_rpc.sql` — RPC sicura per conteggio download anonimi.
- `12_sync_quiz_config.sql` & `13_update_images.sql` — Utility DB.
- `14_SEED_SERVICES.sql` — Inserimento massivo del catalogo trattamenti aggiornato.
- `15_GIFT_VOUCHERS.sql` & `15_UPDATE_TRIGGER.sql` — Carte regalo e trigger di aggiornamento data.
- `16_LEADS_RPC.sql` — Funzione base `submit_lead` per validazione sicura e inserimento (anti-spam).
- `17_SEED_JOURNAL.sql` — Popolamento iniziale articoli Journal VIP.
- `18_MARKETING_CONSENT.sql` — Estensione schema per tracciare il consenso newsletter GDPR.
- `19_EMAIL_TEMPLATES.sql` — Creazione tabella e seed dei testi per email transazionali.
- `20_UNSUBSCRIBE_RPC.sql` — Funzione (RPC) per revocare il consenso marketing.
- `21_UPDATE_EMAIL_COPY.sql` — Correzione chirurgica del copy email ("studio" rimosso).
- `22_FIX_SANCTUARY_LEAD.sql` — Fix critico per estendere in sicurezza la whitelist di `submit_lead`.

### 3. ⚙️ API Serverless (`/api`)
- `submit-and-email.ts` — Endpoint REST (Vercel) che inserisce il lead via Supabase RPC in modo anonimo, e successivamente spara l'email transazionale via Resend. Dotato di try-catch anti-crash.
- `unsubscribe.ts` — Endpoint Vercel per la disiscrizione sicura dalle email.

### 4. 🌐 Ecosistema Pubblico (Frontend: Pagine)
*(Posizione: `src/pages/public/`)*
- `HomePage.tsx` — Hub principale con navigazione fluida.
- `JournalPage.tsx` / `JournalPostPage.tsx` — Vetrina VIP asimmetrica (stile editoriale), articoli caricati dinamicamente dal DB.
- `ArchivePage.tsx` — "Cancello Email": PDF di grande valore bloccato dietro inserimento lead.
- `GiftVouchersPage.tsx` — Selezione carta regalo e CTA verso WhatsApp.
- `BookingPage.tsx` — Pagina di prenotazione (attualmente simulata/placeholder per il futuro).
- `AcademyPage.tsx` — Landing page d'attesa (waitlist) collegata al CRM.

### 5. 🧩 Componenti Pubblici Core
*(Posizione: `src/components/`)*
- `WellnessQuiz.tsx` & `diagnosticEngine.ts` — Motore di diagnostica intelligente. Valuta archetipi vincenti e secondari (sinergie sussurrate). Nessun prezzo/durata hardcoded, carica dinamicamente le Categorie.
- `ChatWidget.tsx` — "Taccuino asincrono" in basso a destra per raccogliere pensieri pre-contatto (zero finti-bot).
- `Navigation.tsx` / `Footer.tsx` — Struttura globale adattiva e footer con disclaimer legale (L.4/2013).
- `ServiceModal.tsx` / `BookingModal.tsx` — Overlay eleganti in stile "vetro smerigliato" per dettagli e appuntamenti.
- `Membership.tsx` — Modulo per iscrizione alla "Sanctuary VIP", con filtro invisibile honeypot.
- `SolutionBridge.tsx` — *(Da revisionare per copy clinico)*. Raccordo post-quiz.

### 6. 👑 Il Pannello di Controllo (Frontend: Admin)
*(Posizione: `src/pages/admin/` & `src/components/admin/`)*
- `AdminLayout.tsx` — Wrapper globale protetto. **Completamente Mobile-Ready** (sidebar a scomparsa, backdrop-blur, swipe-to-close automatico, navigazione rapida "one-tap").
- `AdminDashboard.tsx` — Centro di comando (Grid card view).
- `LeadsViewer.tsx` — CRM Realtime (tramite Supabase subscriptions). Filtri avanzati su singole source (Tutti, Quiz, Academy, Newsletter, Sanctuary). Layout di tabella responsivo.
- `JournalEditor.tsx` — CMS per articoli VIP (scrittura realtime, toggle visibilità).
- `ServicesEditor.tsx` / `GiftCardsEditor.tsx` — Gestione dinamica dei listini e dei voucher.
- `EmailTemplatesEditor.tsx` — Editor visuale per personalizzare i testi delle mail inviate dall'API.
- `ArchiveEditor.tsx` — Pannello per gestire i PDF "Lead Magnet" e relative copertine.
- `QuizConfig.tsx` — Interfaccia per ritoccare algoritmicamente l'engine diagnostico.
- `AcademyEditor.tsx` — (Futuro) Gestione moduli e video.
- `ProfileEditor.tsx` — Settings dell'utente master e info base per il footer dinamico.

---

## 📱 UI/UX & Responsive Audit

L'intera applicazione è costruita in **Tailwind CSS** secondo i crismi del lusso digitale e dell'approccio *Mobile-First*:
- **Area Pubblica**: Modali che lasciano respiro (margine del 5% su smartphone), griglie stile Masonry che collassano ordinatamente in colonna singola, font grandi e interattivi per facilitare la "Touch UX".
- **Area Amministratore**: Ottimizzata con l'ultimo rilascio (`fix(ui)`). Barre di ricerca impilabili verticalmente, tabelle che scorrono in orizzontale senza stritolare i contenuti (`min-w` enforcing), header intelligenti che evitano l'hamburger menu.

---

## 📌 Decisioni di Prodotto Consolidate

1. **Booking**: Resta in simulazione (nessuna urgenza, si farà affidamento a *Luminel Manager* come SaaS in futuro).
2. **Academy**: Coda d'attesa (Waitlist) attiva; frontend per la visualizzazione reale dei corsi (LMS) in stand-by finché non ci saranno video pronti.
3. **Gift Card**: Trattativa delegata su WhatsApp (niente checkout e-commerce forzato) per mantenere l'esclusività del dialogo uno-a-uno.
4. **Fisco (P.IVA)**: Apertura ufficiale rimandata al 2027.
5. **Identità**: Servizio **rigorosamente a domicilio**, con tariffa flessibile (+20€ zona Bergamo). Rimozione di qualsiasi termine legato a cliniche e studi medici.

---

## 🎯 Backlog / Da Fare (Non Urgenti)

- 🟡 **Applicazione Regole Copy (Anti-Promessa-Clinica)**: Rivedere le frasi nel codice (es. in `SolutionBridge.tsx`) per rimuovere allusioni a cure e "spegnimento dolori cronici", tutelandosi ai sensi della L. 4/2013.
- 🟡 **Rimozione Placeholder Academy**: Rimuovere o sostituire l'attuale finta testimonianza ("Studente Masterclass 2024") in attesa del lancio reale.
- 🟡 **Verifica Realtime RLS sul CRM**: Testare e dimostrare tecnicamente che il canale `public:leads` su Supabase Realtime non invii broadcast di contatti a client privi del ruolo di amministratore.
- 🟡 **CAPTCHA Avanzato**: Upgradare l'Honeypot con Cloudflare Turnstile quando il volume di visite e i tentativi di spam cresceranno realmente.

> *Ultimo aggiornamento: 31 Agosto 2026 — Espansione Analitica File-by-File*
