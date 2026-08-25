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

## 4. LA REGOLA DELLA VERITÀ VERIFICATA (TESTA PRIMA DI DICHIARARE)
Un Agente non dichiara mai una funzionalità "reale", "collegata" o "completata" 
basandosi solo sulla lettura del codice o sul ragionamento logico.
- "Testato staticamente" (compila, nessun errore) NON equivale a "testato dal vivo" 
  (verificato in browser + controllato che la riga esista davvero nel database).
- Prima di chiudere un task che tocca dati, specifica ESPLICITAMENTE se è stato 
  verificato dal vivo o solo per lettura di codice. Se non è stato testato, dillo.
- Prima di dichiarare confermato un bug o una fix, verifica su quale ambiente 
  (produzione, preview, branch non ancora mergiato) è stato eseguito il test — 
  un comportamento "vecchio" su un URL preview può significare solo che il branch 
  giusto non è ancora live, non che la fix non funzioni.

## 5. LA REGOLA DEL PERIMETRO DI SICUREZZA (MAI ALLARGARE PER COMODITÀ)
Quando una nuova funzionalità pubblica richiede scrittura sul database, non si 
allarga mai una policy RLS esistente in modo generico solo per farla funzionare.
- Preferisci sempre una funzione dedicata (`security definer`), con permessi 
  ristretti al minimo indispensabile, a una policy pubblica ampia.
- Ogni nuova capacità di scrittura pubblica va giustificata esplicitamente: 
  "perché questo utente anonimo deve poter scrivere qui, e SOLO qui."

## 6. LA REGOLA DELLA FONTE UNICA (MAI DUPLICARE UN DATO CHE ESISTE GIÀ)
Se un dato (prezzo, durata, testo) esiste già in una tabella, non copiarlo in 
un'altra "per comodità" — referenzialo, o leggilo al bisogno.
Se una duplicazione è temporaneamente inevitabile, va segnata esplicitamente 
nel file con un commento tipo `-- TEMP: duplicato da services, da migrare a FK`, 
così non diventa un disallineamento silenzioso scoperto mesi dopo.

---

*Queste regole sono scritte nel DNA del progetto. Ignorarle significa fallire la missione dell'Imperatore.*

