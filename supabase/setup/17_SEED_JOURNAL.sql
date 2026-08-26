-- =====================================================
-- 18_SEED_JOURNAL.sql
-- Yuli Olistico — Seed dei 10 articoli "Brochure VIP" per il Journal
-- =====================================================

-- Ripuliamo i vecchi test se esistono
DELETE FROM public.posts;

-- Inseriamo 10 articoli premium, divisi in: Mindset, Il Percorso (Story), e I Rituali
INSERT INTO public.posts (title, category, image_url, published, content, created_at) VALUES

-- 1. MINDSET / FILOSOFIA
(
    'Oltre il Massaggio: Perché Scegliere l''Approccio Yuli Olistico',
    'Mindset',
    'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=1000',
    true,
    'Il tocco è il linguaggio più antico che conosciamo. Eppure, nel mondo frenetico in cui viviamo, l''idea di un "massaggio" è spesso ridotta a un semplice sfregamento muscolare per alleviare la tensione di una settimana al computer. In Yuli Olistico, crediamo che il corpo meriti un rispetto molto più profondo. 

Scegliere questo approccio significa smettere di trattare il proprio corpo come una macchina da riparare. Significa ascoltare i sussurri prima che diventino urla. Ogni sessione è costruita su un dialogo silenzioso tra operatore e ricevente, dove la pelle diventa la mappa per decifrare blocchi emotivi antichi. 

Non vieni qui per essere "aggiustato", vieni per ricordare come sentirti intero. L''approccio olistico considera i tuoi ritmi, il tuo vissuto e la tua energia attuale, creando uno spazio di sospensione totale dove il sistema nervoso può finalmente deporre le armi.',
    now() - interval '10 days'
),

(
    'Il Corpo Ricorda: La Somatizzazione e il Rilascio Emozionale',
    'Mindset',
    'https://images.unsplash.com/photo-1499209974431-9dddcece7f88?q=80&w=1000',
    true,
    'Hai mai notato come la tensione si accumuli sempre nello stesso punto? Le spalle che si sollevano verso le orecchie, la mandibola serrata durante la notte, o quel nodo allo stomaco che non si scioglie mai completamente. La scienza e le antiche tradizioni orientali oggi concordano su un fatto inconfutabile: il corpo tiene il punteggio.

Ogni emozione non processata, ogni stress soppresso, si cristallizza nelle fasce muscolari. Durante i trattamenti di liberazione profonda, non andiamo solo a sciogliere un muscolo contratto, ma invitiamo il sistema a rilasciare la memoria di quello stress. 

È normale provare un senso di leggerezza emotiva, o persino commozione, dopo un trattamento profondo. È il corpo che ringrazia per aver ricevuto finalmente il permesso di lasciar andare. Il vero benessere inizia quando smettiamo di scindere la mente dal corpo e impariamo a curarli come un''unica, magnifica entità.',
    now() - interval '9 days'
),

(
    'L''Arte del Silenzio: Perché il Recupero Passivo non Basta Più',
    'Mindset',
    'https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=1000',
    true,
    'Siamo ossessionati dalla produttività. La nostra cultura ci insegna che il valore di una giornata si misura da quante cose abbiamo depennato dalla to-do list. E quando siamo esausti, ci collassiamo sul divano, scrollando lo smartphone. Lo chiamiamo "riposo", ma il nostro sistema nervoso sta ancora lavorando a ritmi forsennati per processare input.

Il recupero passivo non è sufficiente. Quello di cui abbiamo disperatamente bisogno è il **Recupero Strategico**. 

Il silenzio vero non è solo l''assenza di rumore, è l''assenza di richieste. Durante un rituale olistico, il tuo unico compito è respirare. Non devi compiacere nessuno, non devi performare, non devi rispondere. Questo stato di vuoto fertile permette al sistema nervoso parasimpatico di prendere il controllo, attivando i reali processi di autoguarigione cellulare. Concederti il lusso del niente è il più grande atto di amore verso te stesso.',
    now() - interval '8 days'
),

-- 2. IL PERCORSO (JOURNEY)
(
    'Dalla Passione alla Vocazione: La Nascita di Yuli Olistico',
    'Story',
    'https://images.unsplash.com/photo-1552845108-5f774a2cc786?q=80&w=1000',
    true,
    'Ci sono chiamate che non possono essere ignorate. La nascita di Yuli Olistico non è stata una decisione a tavolino, ma l''esito naturale di un percorso di ricerca personale che si è trasformato in missione.

Tutto è iniziato dalla semplice consapevolezza di quanto il tocco potesse trasmutare l''energia di una stanza. Ho viaggiato, studiato, e sperimentato su me stessa le discipline più antiche. Ho capito che la vera guarigione non è mai un atto meccanico, ma un passaggio di energia pura. 

Ho creato Yuli Olistico per colmare un vuoto: volevo un luogo che fosse un santuario, non una semplice cabina estetica. Un luogo dove l''eleganza si sposasse con la sacralità, e dove ogni persona varcando la soglia potesse lasciare fuori il caos del mondo, sentendosi istantaneamente accolta, protetta e al sicuro. Questo spazio è il riflesso della mia anima.',
    now() - interval '7 days'
),

(
    'Le Radici del Benessere: Formazione e Viaggi alla Scoperta di Sé',
    'Story',
    'https://images.unsplash.com/photo-1545205597-3d9d02c29597?q=80&w=1000',
    true,
    'Non si può guidare qualcuno in territori che non si sono esplorati in prima persona. Il mio viaggio nella formazione olistica mi ha portato a studiare anatomia avanzata in accademie prestigiose, per poi volare verso l''Oriente, assorbendo la filosofia millenaria dell''Ayurveda e del Thai.

Ho passato ore nei templi, imparando dai maestri che non c''è tecnica perfetta senza la giusta intenzione (Metta, la gentilezza amorevole). Ho appreso l''arte della coppettazione (Cupping) e del rilascio miofasciale profondo non solo dai libri di testo, ma dalla pratica incessante.

Ogni trattamento che offro oggi è una sintesi unica di tutto questo: il rigore anatomico occidentale fuso con la saggezza energetica orientale. Non smetto mai di formarmi, perché il corpo umano è un universo infinito di meraviglie, e la mia promessa è di offrirti sempre la massima evoluzione del tocco.',
    now() - interval '6 days'
),

(
    'Il Tuo Spazio Sacro: Cosa Aspettarsi da una Sessione con Yuli',
    'Story',
    'https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?q=80&w=1000',
    true,
    'Il viaggio inizia ancora prima che il trattamento vero e proprio abbia inizio. Quando arrivi, l''aroma degli oli essenziali pregiati ti avvolge, la luce soffusa calma istantaneamente la retina e una frequenza sonora specifica inizia a rallentare le tue onde cerebrali.

Ti viene offerta una tisana personalizzata mentre ci sediamo per capire non solo cosa ti fa male, ma come ti senti. Ogni sessione è cucita su misura nel "qui e ora". 

Sul lettino, userò solo oli vettori puri, riscaldati alla temperatura perfetta. Ascolterò il ritmo del tuo respiro, sincronizzando il tocco. Non guarderò mai l''orologio in modo sbrigativo. E quando il trattamento finirà, il risveglio sarà lento, dolce e rispettoso. Verrai accompagnato dolcemente verso il mondo esterno, portando con te una nuova armonia. Questa non è una spa, è la tua cerimonia privata.',
    now() - interval '5 days'
),

-- 3. I RITUALI E I SERVIZI
(
    'Thai Royal Flow: L''Antica Danza della Guarigione',
    'Rituals',
    'https://images.unsplash.com/photo-1519823551278-64ac92734fb1?q=80&w=1000',
    true,
    'Il massaggio Tradizionale Thailandese viene spesso definito "lo Yoga per i pigri", ma nella sua essenza più profonda è una meditazione in movimento. Nato nei templi buddhisti, è un rituale sacro che agisce lungo le linee sen (i canali energetici del corpo).

A differenza dei massaggi tradizionali, il Thai Royal Flow si riceve comodamente vestiti con abiti morbidi, su un futon a terra. Utilizzo il peso del mio corpo per praticare digitopressioni profonde, allungamenti dolci e torsioni assistite. 

I benefici sono straordinari: sblocco articolare, miglioramento drastico della postura e un rilascio istantaneo dell''ormone dello stress. È ideale per chi si sente "incastrato" fisicamente o energeticamente. Dopo 90 minuti di questo rituale, non camminerai... fluttuerai.',
    now() - interval '4 days'
),

(
    'Cupping Therapy: Il Respiro Profondo dei Tessuti',
    'Rituals',
    'https://images.unsplash.com/photo-1515377905703-c4788e51af15?q=80&w=1000',
    true,
    'Nota fin dall''antico Egitto e celebrata nella Medicina Tradizionale Cinese, la Cupping Therapy (Coppettazione) sfrutta il potere del vuoto per operare miracoli sui tessuti congestionati. 

Invece di "spingere" il tessuto verso il basso come in un massaggio classico, le coppette in silicone o vetro "tirano" il tessuto verso l''alto. Questa decompressione separa gli strati miofasciali incollati, richiama sangue fresco ossigenato in zone bloccate e drena i ristagni tossinici. 

Sì, può lasciare i famosi "marchi" temporanei, ma quei segni non sono lividi: sono la prova visiva del sangue stagnante che viene riportato in superficie per essere spurgato dal sistema linfatico. Il senso di leggerezza muscolare post-trattamento è incomparabile. Perfetto per gli sportivi e per chi soffre di contratture croniche.',
    now() - interval '3 days'
),

(
    'Deep Tissue Release: Sciogliere le Armature del Corpo',
    'Rituals',
    'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?q=80&w=1000',
    true,
    'Il massaggio Deep Tissue non è, come molti credono, un "massaggio svedese fatto molto forte". È una tecnica specifica, lenta e mirata, che mira ad accedere agli strati più profondi del tessuto muscolare e della fascia.

Quando accumuliamo tensione per anni, le fibre muscolari si aggrovigliano formando delle vere e proprie "aderenze". Il tocco leggero scivola via, mentre il Deep Tissue aggancia queste restrizioni e, sciogliendole al ritmo del tuo respiro, restituisce flessibilità.

Utilizzo avambracci, nocche e gomiti con una pressione decisa ma sempre rispettosa della tua soglia del dolore. È un lavoro di fino, scultoreo. Se senti la schiena "di marmo" o hai tensioni cervicali che non ti danno tregua, questo rituale è la chiave per disintegrare le armature che hai costruito per difenderti dallo stress.',
    now() - interval '2 days'
),

(
    'Ayurveda Soul Connection: Riequilibrare i Dosha per Rinascere',
    'Rituals',
    'https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=1000',
    true,
    'L''Ayurveda, la Scienza della Vita indiana, ci insegna che non esiste un corpo uguale all''altro. Siamo tutti costituiti da un mix unico di tre energie vitali: Vata, Pitta e Kapha (i Dosha). Quando questi elementi vanno fuori asse a causa del clima, della dieta o dello stress emotivo, ci ammaliamo.

Il massaggio ayurvedico non segue un protocollo standard. L''olio medicato (caldo, profumatissimo, a base di erbe specifiche) viene scelto in base al tuo squilibrio del momento. Le manualità cambiano: possono essere lente, pesanti e radicanti se sei in uno stato di eccessiva ansia (eccesso di Vata), o vigorose, calde e drenanti se ti senti letargico (eccesso di Kapha).

È il trattamento d''elezione per disintossicare i tessuti e calmare l''insonnia. È un bagno di calore materno che nutre non solo la pelle, ma gli strati più profondi della tua anima.',
    now() - interval '1 days'
);
