import { NextRequest, NextResponse } from "next/server";
import { confirmInscription } from "@/lib/notion";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ token: string }> }
) {
  try {
    const { token } = await params;

    if (!token) {
      return NextResponse.redirect(
        new URL("/confirmation?status=error&message=token_manquant", request.url)
      );
    }

    const confirmed = await confirmInscription(token);

    if (!confirmed) {
      return NextResponse.redirect(
        new URL("/confirmation?status=error&message=token_invalide", request.url)
      );
    }

    return NextResponse.redirect(
      new URL("/confirmation?status=success", request.url)
    );
  } catch (error) {
    console.error("Erreur confirmation:", error);
    return NextResponse.redirect(
      new URL("/confirmation?status=error&message=erreur_serveur", request.url)
    );
  }
}
