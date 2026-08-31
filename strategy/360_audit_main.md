# 👑 Yuli Olistico: 360° Project Audit & Status

Questo documento è la mappatura assoluta, esaustiva e millimetrica del progetto (branch `main`). Non ci sono approssimazioni: ogni singolo file logico, componente, pagina e script di backend è censito e documentato. L'ultimo grande aggiornamento (31 Agosto 2026) ha chiuso il funnel di acquisizione, perfezionato l'esperienza Mobile-First (anche per l'area Admin) e allineato l'architettura tecnica al brand "a domicilio".

---

## 🌳 1. Cuore Strategico (`/strategy/`)
I pilastri testuali e le regole del business:
- `YULI_DNA.md` — Identità brand, tone of voice, copy e regole stringenti anti-promessa-clinica (Compliance L.4/2013).
- `SECURITY_ARCHITECTURE.md` — Inventario vivo delle Row Level Security (RLS), funzioni RPC, bucket storage e policy di sicurezza.
- `FINANCE_AND_ANALYTICS.md` — Tracciamento costi infrastrutturali (Vercel, Supabase, Resend) e metriche.

---

## 🗄️ 2. Backend e Database (`/supabase/setup/`)
L'infrastruttura dati è definita in 23 script SQL idempotenti, versionati in ordine di esecuzione:
- `01_CORE_SCHEMA.sql` — Creazione tabelle base (profiles, services, site_settings, posts).
- `02_ALTER_SERVICES.sql` — Espansione campi catalogo trattamenti.
- `03_ACADEMY.sql` — Schema LMS (corsi, moduli, enrollments).
- `04_ARCHIVE.sql` — Gestione risorse gratuite (lead magnet, pdf, audio).
- `05_BUSINESS_PROFILE.sql` — Dati e contatti master dell'attività.
- `06_QUIZ_CONFIG.sql` — Configurazione parametri dinamici per l'engine diagnostico.
- `07_SITE_CONTENT_SEED.sql` — Contenuti statici del sito web.
- `08_LEADS.sql` — Tabella CRM principale per l'acquisizione contatti.
- `09_STORAGE_POLICIES.sql` — Policy pubbliche per i bucket (images, archive_files).
- `10_OPTIMIZATIONS.sql` — Indici e ottimizzazioni performance (B-Tree index).
- `11_archive_download_rpc.sql` — RPC `increment_resource_download` per conteggio download anonimi.
- `12_sync_quiz_config.sql` — Utility DB di sincronizzazione logica quiz.
- `13_update_images.sql` — Utility aggiornamento percorsi immagini.
- `14_SEED_SERVICES.sql` — Inserimento massivo del catalogo trattamenti aggiornato (tiers).
- `15_GIFT_VOUCHERS.sql` — Tabella e struttura carte regalo.
- `15_UPDATE_TRIGGER.sql` — Trigger PostgreSQL `update_updated_at_column`.
- `16_LEADS_RPC.sql` — Creazione iniziale `submit_lead` per validazione sicura e anti-spam.
- `17_SEED_JOURNAL.sql` — Popolamento iniziale articoli Journal VIP.
- `18_MARKETING_CONSENT.sql` — Estensione schema per tracciare il consenso GDPR (`marketing_consent`, `consent_given_at`).
- `19_EMAIL_TEMPLATES.sql` — Tabella e seed dei testi per email transazionali.
- `20_UNSUBSCRIBE_RPC.sql` — RPC `unsubscribe_lead` per revocare il consenso marketing.
- `21_UPDATE_EMAIL_COPY.sql` — Correzione chirurgica copy email (rimozione riferimenti a "studio fisico").
- `22_FIX_SANCTUARY_LEAD.sql` — Fix critico (con firma e default esatti) per la whitelist RPC di `submit_lead`.

---

## ⚙️ 3. API Serverless (`/api/`)
Microservizi eseguiti da Vercel Edge/Node Functions:
- `submit-and-email.ts` — Inserisce il lead su Supabase via REST e invia l'email tramite Resend (try-catch globale).
- `unsubscribe.ts` — Endpoint per gestire il link di disiscrizione presente nei footer email.

---

## 🧩 4. Frontend: Core, Config & State (`/src/`)
Il motore React/Vite che alimenta l'interfaccia.

**Radice (`/src/`)**
- `App.tsx` & `index.tsx` — Entry point e Router dell'applicazione.
- `index.css` — Tailwind import e custom utilities.
- `types.ts` — Definizioni TypeScript globali (interfacce Lead, Service, QuizResult).
- `constants.ts` — Variabili statiche e chiavi configurazione.
- `integrations.ts` / `vite-env.d.ts` — Setup Vite e TS.

**State & Context (`/src/context/`)**
- `AuthContext.tsx` — Provider di autenticazione sessione (Supabase).
- `BookingContext.tsx` — Gestione stato globale prenotazioni.

**Hooks Custom (`/src/hooks/`)**
- `useCanonical.ts` — Iniezione dinamica tag canonical per SEO corretta.
- `useServices.ts` — Fetching ottimizzato del catalogo da DB.

**Servizi & Logica (`/src/services/` & `/src/lib/`)**
- `diagnosticEngine.ts` — **Cuore algoritmico del Quiz**. Valuta archetipi, spareggi (weight) e sinergie sussurrate. Non ha prezzi/durate hardcoded.
- `supabaseService.ts` / `lib/supabaseClient.ts` — Client e chiamate wrapper verso Supabase.
- `emailService.ts` — Helper lato client per le email.
- `geminiService.ts` — *(Feature Flag)* Predisposizione per Virtual Twin AI.

**Dati Mock & Utilities (`/src/data/` & `/src/utils/`)**
- `dataMigration.ts`, `emailTemplates.ts` — Script di utility interne.
- `collaborations.ts`, `journalPosts.ts`, `testimonials.ts` — Mock data residuali in via di completa dismissione (sostituiti da Supabase DB).

---

## 🌐 5. Frontend: Pagine Pubbliche (`/src/pages/public/`)
- `HomePage.tsx` — Landing hub principale.
- `JournalPage.tsx` / `JournalPostPage.tsx` — Vetrina VIP asimmetrica (stile editoriale), feed live DB.
- `ArchivePage.tsx` — Fabbrica Contatti (Gate PDF bloccato dietro inserimento lead).
- `GiftVouchersPage.tsx` — Selezione carta regalo e redirect WhatsApp.
- `AcademyPage.tsx` — Landing page d'attesa (waitlist) collegata al CRM.
- `BookingPage.tsx` — Placeholder prenotazioni.
- `AboutPage.tsx` / `ServicesPage.tsx` — Pagine testuali di servizio.

---

## 🛠️ 6. Frontend: Componenti Pubblici (`/src/components/`)
I blocchi visuali (UI) che compongono il sito:
- `WellnessQuiz.tsx` — UI dinamica del quiz. Interagisce col `diagnosticEngine.ts`.
- `Membership.tsx` — Modulo per iscrizione alla "Sanctuary VIP", con filtro honeypot.
- `ChatWidget.tsx` — "Taccuino asincrono" galleggiante. Modelli testo adattati al servizio a domicilio.
- `SolutionBridge.tsx` — Raccordo post-quiz. *(Da revisionare per copy clinico)*.
- `Navigation.tsx` / `Footer.tsx` — Header responsive (mobile-first) e footer legale.
- `Hero.tsx`, `About.tsx`, `Philosophy.tsx` — Sezioni descrittive della homepage.
- `Services.tsx`, `ServiceModal.tsx` — Griglia trattamenti e overlay di dettaglio a vetro.
- `GiftCards.tsx`, `Journal.tsx`, `AcademyTeaserSection.tsx` — Vetrina prodotti.
- `Newsletter.tsx` — Form acquisizione lead dal footer.
- `BookingCalendar.tsx`, `BookingModal.tsx` — Widget calendario.
- `Logo.tsx`, `Dashboard.tsx`, `PublicLayout.tsx` — Componenti infrastrutturali UI.

---

## 👑 7. Frontend: Il Pannello di Controllo Admin
L'interfaccia protetta per la gestione del business.

**Pagine (`/src/pages/admin/`)**
- `AdminDashboard.tsx` — Overview visiva (Grid) con le "card" di accesso rapido.
- `LoginPage.tsx` — Accesso protetto (Supabase Auth).
- `DashboardPage.tsx` — Componente routing.

**Componenti Admin (`/src/components/admin/`)**
- `AdminLayout.tsx` — Wrapper globale protetto. **Super Mobile-Ready** (backdrop blur, sidebar a comparsa, swipe/click to close, fix padding text).
- `LeadsViewer.tsx` — CRM Realtime (Supabase subscriptions). Filtri avanzati (Sanctuary, Quiz, ecc). UI reattiva: stack su mobile, tabelle scrollabili orizzontalmente (`min-w`).
- `JournalEditor.tsx` — CMS articoli VIP (realtime, toggle publish/hide).
- `ServicesEditor.tsx` / `GiftCardsEditor.tsx` — Gestione CRUD dinamica listini/carte.
- `EmailTemplatesEditor.tsx` — Editor visuale per personalizzare le email DB.
- `ArchiveEditor.tsx` — Upload/Gestione PDF Lead Magnet e copertine.
- `QuizConfig.tsx` — Parametrizzazione algoritmica del motore diagnostico.
- `ProfileEditor.tsx` — Settings account master.
- `AcademyEditor.tsx` — Gestione LMS (moduli/video) in attesa di sviluppo.
- `cms/ContentsManager.tsx` — Gestore testi statici del sito.

---

## 📌 Decisioni di Prodotto Consolidate

1. **Identità**: Servizio **rigorosamente a domicilio**, con tariffa integrativa fuori Bergamo. Rimosso ogni riferimento a "studio/clinica".
2. **Booking**: Simulato (Luminel Manager fungerà da SaaS esterno in futuro).
3. **Academy**: Coda d'attesa (Waitlist) attiva; frontend LMS visuale congelato in attesa di video pronti.
4. **Gift Card**: Flusso WhatsApp per massimizzare la relazione esclusiva.
5. **Fisco (P.IVA)**: Apertura ufficiale rimandata al 2027.

---

## 🎯 Backlog / Da Fare (Non Urgenti)

- 🟡 **Applicazione Regole Copy (Anti-Promessa-Clinica)**: Rivedere le frasi nel codice (es. in `SolutionBridge.tsx`) per rimuovere allusioni a cure o "spegnimento dolori", tutelandosi ai sensi della L. 4/2013.
- 🟡 **Rimozione Placeholder Academy**: Sostituire l'attuale finta testimonianza ("Studente Masterclass 2024") con "Coming Soon" onesto.
- 🟡 **Verifica Realtime RLS CRM**: Testare tecnicamente che `public:leads` in Realtime non invii broadcast di contatti a client senza JWT admin valido.
- 🟡 **CAPTCHA Avanzato**: Sostituire l'Honeypot con Cloudflare Turnstile quando il volume reale di attacchi spam diventerà un problema.

> *Ultimo aggiornamento: 31 Agosto 2026 — Espansione Analitica File-by-File (Deep Scan 100%)*
