import { Resend } from "resend";
import { InscriptionData } from "./validation";

// Initialisation lazy pour éviter les erreurs au build
let resend: Resend | null = null;

function getResendClient(): Resend {
  if (!resend) {
    if (!process.env.RESEND_API_KEY) {
      throw new Error("RESEND_API_KEY non configurée");
    }
    resend = new Resend(process.env.RESEND_API_KEY);
  }
  return resend;
}

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

export async function sendConfirmationEmail(
  data: InscriptionData,
  token: string
): Promise<boolean> {
  const confirmUrl = `${baseUrl}/api/inscriptions/confirm/${token}`;

  try {
    await getResendClient().emails.send({
      from: "Kermesse Messein <onboarding@resend.dev>",
      to: data.email,
      subject: `Confirmez votre inscription - ${data.standName}`,
      html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; margin: 0; padding: 0; background-color: #f5f5f5;">
  <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
    <div style="background: linear-gradient(135deg, #ff6b6b 0%, #ee5a5a 100%); border-radius: 16px 16px 0 0; padding: 30px; text-align: center;">
      <h1 style="color: white; margin: 0; font-size: 28px;">Kermesse 2026</h1>
      <p style="color: rgba(255,255,255,0.9); margin: 10px 0 0 0;">École Jean Rostand - Messein</p>
    </div>

    <div style="background: white; padding: 30px; border-radius: 0 0 16px 16px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
      <h2 style="color: #333; margin-top: 0;">Bonjour ${data.prenom} !</h2>

      <p style="color: #555; line-height: 1.6;">
        Merci pour votre inscription en tant que bénévole ! Pour confirmer votre participation, veuillez cliquer sur le bouton ci-dessous.
      </p>

      <div style="background: #f8f9fa; border-radius: 12px; padding: 20px; margin: 20px 0;">
        <h3 style="color: #333; margin: 0 0 15px 0;">Récapitulatif</h3>
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 8px 0; color: #666;">Stand :</td>
            <td style="padding: 8px 0; color: #333; font-weight: 600;">${data.standName}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #666;">Créneau :</td>
            <td style="padding: 8px 0; color: #333; font-weight: 600;">${data.creneauLabel}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #666;">Enfant :</td>
            <td style="padding: 8px 0; color: #333; font-weight: 600;">${data.prenomEnfant} (${data.classeEnfant})</td>
          </tr>
        </table>
      </div>

      <div style="text-align: center; margin: 30px 0;">
        <a href="${confirmUrl}" style="display: inline-block; background: linear-gradient(135deg, #ff6b6b 0%, #ee5a5a 100%); color: white; text-decoration: none; padding: 16px 40px; border-radius: 50px; font-weight: bold; font-size: 16px;">
          Confirmer mon inscription
        </a>
      </div>

      <p style="color: #999; font-size: 12px; text-align: center; margin-top: 30px;">
        Si le bouton ne fonctionne pas, copiez ce lien dans votre navigateur :<br>
        <a href="${confirmUrl}" style="color: #ff6b6b; word-break: break-all;">${confirmUrl}</a>
      </p>
    </div>

    <p style="color: #999; font-size: 12px; text-align: center; margin-top: 20px;">
      Cet email a été envoyé automatiquement. Merci de ne pas y répondre.
    </p>
  </div>
</body>
</html>
      `,
    });

    return true;
  } catch (error) {
    console.error("Erreur envoi email:", error);
    return false;
  }
}
