"use client";

import { Heart, Users, Clock, CheckCircle } from "lucide-react";

export default function InscriptionSection() {
  return (
    <section id="inscription" className="py-20 bg-gradient-to-br from-[#ff6b6b] to-[#ee5a5a] text-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          {/* Icône */}
          <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <Heart className="w-10 h-10" />
          </div>

          {/* Titre */}
          <h2 className="text-3xl sm:text-4xl font-extrabold mb-4">
            Devenez Bénévole !
          </h2>
          <p className="text-white/90 text-lg max-w-2xl mx-auto mb-10">
            Votre aide est précieuse pour faire de cette kermesse un succès !
            Inscrivez-vous pour animer un stand pendant un créneau de 45 minutes.
          </p>

          {/* Avantages */}
          <div className="grid sm:grid-cols-3 gap-6 mb-10">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-5">
              <Clock className="w-8 h-8 mx-auto mb-3" />
              <h3 className="font-bold mb-1">Créneaux courts</h3>
              <p className="text-white/80 text-sm">Seulement 45 min par créneau</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-5">
              <Users className="w-8 h-8 mx-auto mb-3" />
              <h3 className="font-bold mb-1">Travail d&apos;équipe</h3>
              <p className="text-white/80 text-sm">1 à 2 personnes par stand</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-5">
              <CheckCircle className="w-8 h-8 mx-auto mb-3" />
              <h3 className="font-bold mb-1">Confirmation email</h3>
              <p className="text-white/80 text-sm">Recevez un récapitulatif</p>
            </div>
          </div>

          {/* CTA */}
          <a
            href="#stands"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-[#ff6b6b] font-bold text-lg rounded-full shadow-xl hover:shadow-2xl hover:scale-105 transition-all"
          >
            <span className="text-2xl">👆</span>
            Voir les stands et s&apos;inscrire
          </a>

          {/* Note */}
          <p className="mt-8 text-white/70 text-sm">
            En vous inscrivant, vous indiquerez votre prénom, email et le nom de votre enfant pour faciliter la communication.
          </p>
        </div>
      </div>
    </section>
  );
}
