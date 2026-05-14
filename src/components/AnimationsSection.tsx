"use client";

import { Sparkles } from "lucide-react";

export default function AnimationsSection() {
  return (
    <section className="py-20 bg-gradient-to-b from-[#fef7e0] via-[#fff5e6] to-white overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* En-tête */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-lime-400 to-green-500 text-white rounded-full text-sm font-bold mb-6 shadow-lg">
            <Sparkles className="w-4 h-4" />
            À ne pas manquer !
            <Sparkles className="w-4 h-4" />
          </div>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-gray-800 mb-4">
            Animation{" "}
            <span className="bg-gradient-to-r from-lime-500 to-green-500 bg-clip-text text-transparent">
              spéciale
            </span>
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Le grand moment qui fera battre votre cœur !
          </p>
        </div>

        {/* Carte animation */}
        <div className="max-w-xl mx-auto">
          {/* Panier Garni */}
          <div className="group relative">
            {/* Effet glow */}
            <div className="absolute -inset-1 bg-gradient-to-r from-lime-400 via-green-400 to-emerald-400 rounded-3xl blur-lg opacity-50 group-hover:opacity-75 transition-opacity"></div>

            <div className="relative bg-gradient-to-br from-lime-400 via-green-500 to-emerald-500 rounded-3xl overflow-hidden shadow-2xl">
              {/* Décorations */}
              <div className="absolute top-4 right-4 text-6xl animate-bounce">🧺</div>
              <div className="absolute top-12 left-8 text-4xl animate-pulse">🎲</div>
              <div className="absolute bottom-24 left-4 text-4xl animate-bounce" style={{ animationDelay: "0.3s" }}>🃏</div>

              {/* Zone illustration */}
              <div className="h-48 sm:h-56 flex items-center justify-center relative">
                <div className="text-center">
                  <div className="text-8xl sm:text-9xl mb-2 drop-shadow-lg">🧺</div>
                  <div className="flex justify-center gap-2">
                    {["🎲", "🃏", "🧩", "🎯", "🏆"].map((emoji, i) => (
                      <span
                        key={i}
                        className="text-2xl sm:text-3xl animate-bounce"
                        style={{ animationDelay: `${i * 0.1}s` }}
                      >
                        {emoji}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Contenu */}
              <div className="bg-white/95 backdrop-blur p-6 sm:p-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-lime-400 to-green-500 rounded-xl flex items-center justify-center shadow-lg text-2xl">
                    ⚖️
                  </div>
                  <div>
                    <h3 className="text-2xl sm:text-3xl font-extrabold text-gray-800">Panier garni</h3>
                    <p className="text-green-600 font-semibold">Devinez son poids et gagnez-le !</p>
                  </div>
                </div>

                <p className="text-gray-600 mb-6 text-lg">
                  Un magnifique panier rempli de jeux de société du partenaire Iello (fabricant d&apos;Heillecourt). Estimez son poids au gramme près !
                </p>

                <div className="bg-gradient-to-r from-lime-50 to-green-50 rounded-2xl p-5 border-2 border-lime-200">
                  <p className="font-bold text-gray-800 mb-3">Comment jouer ?</p>
                  <div className="space-y-3">
                    {[
                      { step: "1", text: "Observez bien le panier", emoji: "👀" },
                      { step: "2", text: "Notez votre estimation", emoji: "✏️" },
                      { step: "3", text: "Le plus proche gagne !", emoji: "🏆" },
                    ].map((item) => (
                      <div key={item.step} className="flex items-center gap-3">
                        <span className="w-8 h-8 bg-gradient-to-br from-lime-400 to-green-500 rounded-full flex items-center justify-center text-white font-bold text-sm shadow">
                          {item.step}
                        </span>
                        <span className="text-gray-700 font-medium">{item.text}</span>
                        <span className="text-xl">{item.emoji}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Rappel résultat */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-3 px-6 py-4 bg-white rounded-2xl shadow-lg border-2 border-dashed border-lime-300">
            <span className="text-3xl">🎊</span>
            <p className="text-gray-700 font-semibold">
              Annonce du gagnant en <span className="text-green-600">fin de kermesse</span> !
            </p>
            <span className="text-3xl">🎊</span>
          </div>
        </div>
      </div>
    </section>
  );
}
