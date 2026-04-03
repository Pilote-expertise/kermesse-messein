"use client";

import { useSearchParams } from "next/navigation";
import { CheckCircle, XCircle, Home } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";

function ConfirmationContent() {
  const searchParams = useSearchParams();
  const status = searchParams.get("status");
  const message = searchParams.get("message");

  const isSuccess = status === "success";

  const errorMessages: Record<string, string> = {
    token_manquant: "Le lien de confirmation est incomplet.",
    token_invalide: "Ce lien de confirmation n'est plus valide ou a déjà été utilisé.",
    erreur_serveur: "Une erreur est survenue. Veuillez réessayer plus tard.",
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#fff5e6] to-white flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Header */}
          <div
            className={`p-8 text-center ${
              isSuccess
                ? "bg-gradient-to-br from-green-400 to-green-600"
                : "bg-gradient-to-br from-red-400 to-red-600"
            }`}
          >
            <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
              {isSuccess ? (
                <CheckCircle className="w-12 h-12 text-white" />
              ) : (
                <XCircle className="w-12 h-12 text-white" />
              )}
            </div>
            <h1 className="text-2xl font-bold text-white">
              {isSuccess ? "Inscription confirmée !" : "Oups !"}
            </h1>
          </div>

          {/* Content */}
          <div className="p-8 text-center">
            {isSuccess ? (
              <>
                <p className="text-gray-600 text-lg mb-6">
                  Merci ! Votre inscription a bien été confirmée. Nous avons hâte de vous voir à la kermesse !
                </p>
                <div className="bg-green-50 border border-green-200 rounded-xl p-4 mb-6">
                  <p className="text-green-700 font-medium">
                    Rendez-vous le 12 juin 2026
                  </p>
                  <p className="text-green-600 text-sm mt-1">
                    N'oubliez pas de venir 10 minutes avant votre créneau
                  </p>
                </div>
              </>
            ) : (
              <p className="text-gray-600 text-lg mb-6">
                {message ? errorMessages[message] || "Une erreur est survenue." : "Une erreur est survenue."}
              </p>
            )}

            <Link
              href="/"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#ff6b6b] to-[#ee5a5a] text-white font-bold rounded-full hover:scale-105 transition-transform"
            >
              <Home className="w-5 h-5" />
              Retour à l'accueil
            </Link>
          </div>
        </div>

        <p className="text-center text-gray-500 text-sm mt-6">
          Kermesse 2026 - École Jean Rostand Messein
        </p>
      </div>
    </div>
  );
}

export default function ConfirmationPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#ff6b6b]"></div>
      </div>
    }>
      <ConfirmationContent />
    </Suspense>
  );
}
