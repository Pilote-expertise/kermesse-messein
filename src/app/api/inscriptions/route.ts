import { NextRequest, NextResponse } from "next/server";
import { inscriptionSchema } from "@/lib/validation";
import { createInscription, getConfirmedInscriptions } from "@/lib/notion";
import { sendConfirmationEmail } from "@/lib/resend";
import crypto from "crypto";

export async function GET() {
  try {
    const inscriptions = await getConfirmedInscriptions();
    return NextResponse.json({ inscriptions });
  } catch (error) {
    console.error("Erreur récupération inscriptions:", error);
    return NextResponse.json(
      { error: "Une erreur est survenue", inscriptions: [] },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validation des données
    const result = inscriptionSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        { error: "Données invalides", details: result.error.flatten() },
        { status: 400 }
      );
    }

    const data = result.data;

    // Générer un token unique
    const token = crypto.randomBytes(32).toString("hex");

    // Créer l'inscription dans Notion (statut: en attente)
    await createInscription(data, token);

    // Envoyer l'email de confirmation
    const emailSent = await sendConfirmationEmail(data, token);

    if (!emailSent) {
      return NextResponse.json(
        { error: "Erreur lors de l'envoi de l'email" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Un email de confirmation vous a été envoyé",
    });
  } catch (error) {
    console.error("Erreur inscription:", error);
    return NextResponse.json(
      { error: "Une erreur est survenue" },
      { status: 500 }
    );
  }
}
