UPDATE email_templates
SET subject = '{{name}}, il tuo corpo ha parlato. Ecco cosa ci ha detto.',
    body_content = 'Ciao {{name}},

Hai preso un momento per fermarti e ascoltare — non è scontato, in un mondo che corre.

L''algoritmo di {{companyName}} ha decodificato quello che ci hai raccontato. Il rituale che risuona di più con te in questo momento è:

{{treatment}}

Non è una scelta a caso. È il punto da cui iniziare per tornare al tuo corpo.

Se senti che è il momento giusto, sono pronta a raggiungerti.

A presto,
Yuli'
WHERE source = 'quiz';

UPDATE email_templates
SET subject = 'Benvenuta/o nel cerchio di {{companyName}}',
    body_content = 'Ciao {{name}},

Benvenuta/o nel cerchio di {{companyName}}.

Niente promozioni martellanti, nessun rumore. Solo pensieri, rituali e verità sul corpo che raramente si leggono altrove — una volta ogni tanto, mai di più.

Rispetteremo il tuo inbox come un tempio.

A presto,
Yuli'
WHERE source = 'newsletter';

UPDATE email_templates
SET subject = '{{name}}, ecco {{title}} come promesso',
    body_content = 'Ciao {{name}},

Grazie per aver chiesto {{title}}. Eccolo, tutto tuo:

{{fileUrl}}

Prenditi il tempo che ti serve per leggerlo — non c''è fretta, qui non c''è mai.

Se qualcosa di quello che leggerai risuona con un bisogno più profondo, sai dove trovarci.

A presto,
Yuli'
WHERE source = 'archive';

UPDATE email_templates
SET subject = '{{name}}, il tuo posto è assicurato',
    body_content = 'Ciao {{name}},

Sei ufficialmente in lista per l''Accademia {{companyName}}.

Non formiamo esecutori. Creiamo Autorevolezza. Quando le porte si apriranno, riceverai un invito privato prima di chiunque altro.

Nel frattempo, tieni duro: l''attesa è parte del rituale.

A presto,
Yuli'
WHERE source = 'academy';
