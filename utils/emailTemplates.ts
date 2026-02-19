
import { AiRecommendation } from '../types';

export const generateLeadEmail = (name: string, result: AiRecommendation): string => {
    return `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: 'Times New Roman', serif; background-color: #faf9f6; color: #292524; margin: 0; padding: 0; }
    .container { max-width: 600px; margin: 0 auto; background-color: #ffffff; border: 1px solid #e7e5e4; }
    .header { background-color: #1c1917; color: #f3e9d2; padding: 40px 20px; text-align: center; }
    .logo { font-size: 24px; letter-spacing: 0.2em; text-transform: uppercase; font-weight: bold; }
    .content { padding: 40px 30px; }
    .greeting { font-size: 18px; margin-bottom: 20px; color: #57534e; }
    .title { font-size: 32px; margin-bottom: 10px; color: #292524; line-height: 1.2; }
    .subtitle { font-size: 14px; text-transform: uppercase; letter-spacing: 0.1em; color: #c07a60; margin-bottom: 30px; }
    .result-box { background-color: #faf9f6; border-left: 4px solid #c07a60; padding: 30px; margin-bottom: 30px; }
    .treatment-name { font-size: 24px; margin-bottom: 10px; font-weight: bold; }
    .reasoning { font-style: italic; color: #57534e; line-height: 1.6; margin-bottom: 20px; }
    .oil-box { background-color: #fff; border: 1px solid #e7e5e4; padding: 15px; display: inline-block; font-size: 14px; }
    .cta-button { display: block; width: 100%; background-color: #c07a60; color: #ffffff; text-align: center; padding: 15px 0; text-decoration: none; text-transform: uppercase; letter-spacing: 0.2em; font-size: 12px; font-weight: bold; margin-top: 30px; }
    .footer { background-color: #faf9f6; padding: 20px; text-align: center; font-size: 10px; color: #a8a29e; text-transform: uppercase; letter-spacing: 0.1em; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <div class="logo">Yuli Olistico</div>
    </div>
    <div class="content">
      <div class="greeting">Bentornata, ${name}.</div>
      <div class="title">La tua Anima ha parlato.</div>
      <div class="subtitle">Analisi Diagnostica Completata</div>

      <div class="result-box">
        <div class="treatment-name">${result.treatment}</div>
        <div class="reasoning">"${result.reasoning}"</div>
        
        <div class="oil-box">
          <strong>Consiglio Sensoriale:</strong> ${result.oilRecommendation}
        </div>
      </div>

      <p style="line-height: 1.6; color: #57534e;">
        Questo non è un semplice massaggio. È il rituale che il tuo corpo ha scelto per ritrovare il suo asse.
        Ti aspettiamo nell'atelier per renderlo reale.
      </p>

      <a href="https://yuliolistico.com" class="cta-button">Prenota il Rituale</a>
    </div>
    <div class="footer">
      Insolito Experiences • Yuli Olistico<br>
      Milano, Italia
    </div>
  </div>
</body>
</html>
  `;
};
