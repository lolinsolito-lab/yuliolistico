# PROTOCOLLO OPERATIVO IMPERIALE (AI_OPERATIONAL_PROTOCOL)

Questo documento definisce le **Leggi Immutabili** per ogni Agente AI che opera su questo repository. La violazione di queste regole minaccia l'integrità dell'Impero Digitale ed è severamente proibita.

## 1. LA REGOLA DELLA SINCRONIZZAZIONE (PULL PRIMA DI TUTTO)
**PRIMA** di scrivere una singola riga di codice o creare un piano, l'Agente DEVE sincronizzarsi con la Verità Centrale.
- Esegui SÈMPRE: `git pull origin main`
- Se ci sono conflitti, risolvili PRIMA di procedere. Mai ignorarli.

## 2. LA REGOLA DELLA CONSAPEVOLEZZA (CHECK STATUS)
**PRIMA** di effettuare un commit, l'Agente DEVE verificare cosa sta per cambiare.
- Esegui SÈMPRE: `git status`
- Analizza l'output.
- **ALLARME ROSSO:** Se vedi file modificati che NON hai toccato intenzionalmente o che non c'entrano con il tuo task attuale, **FERMATI**.
- Non fare mai `git add .` alla cieca se non sei sicuro al 100% di ogni singolo file nella lista.

## 3. LA REGOLA DEI RAMI (BRANCH PER GRANDI MANOVRE)
Per modifiche complesse, rischiose o che richiedono tempo (es. refactoring completi, nuove feature massicce), non lavorare direttamente sul trono (`main`).
- Crea un ramo dedicato: `git checkout -b feature/nome-feature`
- Lavora in sicurezza nel tuo ramo.
- Fai il merge su `main` solo quando il lavoro è perfetto e testato.

---

*Queste regole sono scritte nel DNA del progetto. Ignorarle significa fallire la missione dell'Imperatore.*
