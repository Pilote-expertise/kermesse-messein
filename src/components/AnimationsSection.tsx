"use client";

import { Sparkles, Star, Trophy } from "lucide-react";

export default function AnimationsSection() {
  return (
    <section className="py-20 bg-gradient-to-b from-[#fef7e0] via-[#fff5e6] to-white overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* En-tête */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-amber-400 to-orange-400 text-white rounded-full text-sm font-bold mb-6 shadow-lg">
            <Sparkles className="w-4 h-4" />
            À ne pas manquer !
            <Sparkles className="w-4 h-4" />
          </div>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-gray-800 mb-4">
            Animations{" "}
            <span className="bg-gradient-to-r from-amber-500 to-orange-500 bg-clip-text text-transparent">
              Spéciales
            </span>
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Deux grands moments qui feront battre votre cœur !
          </p>
        </div>

        {/* Cartes animations */}
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {/* Tombola */}
          <div className="group relative">
            {/* Effet glow */}
            <div className="absolute -inset-1 bg-gradient-to-r from-amber-400 via-orange-400 to-red-400 rounded-3xl blur-lg opacity-50 group-hover:opacity-75 transition-opacity"></div>

            <div className="relative bg-gradient-to-br from-amber-400 via-orange-500 to-red-500 rounded-3xl overflow-hidden shadow-2xl">
              {/* Décorations */}
              <div className="absolute top-4 left-4 text-6xl animate-bounce">🎟️</div>
              <div className="absolute top-8 right-8 text-4xl animate-pulse">⭐</div>
              <div className="absolute bottom-20 right-4 text-5xl animate-bounce" style={{ animationDelay: "0.5s" }}>🎁</div>

              {/* Zone illustration */}
              <div className="h-48 sm:h-56 flex items-center justify-center relative">
                <div className="text-center">
                  <div className="text-8xl sm:text-9xl mb-2 drop-shadow-lg animate-pulse">🎰</div>
                  <div className="flex justify-center gap-2">
                    {["🎮", "🧸", "🎨", "📚", "🎧"].map((emoji, i) => (
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
                  <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-orange-500 rounded-xl flex items-center justify-center shadow-lg">
                    <Trophy className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl sm:text-3xl font-extrabold text-gray-800">Grande Tombola</h3>
                    <p className="text-orange-500 font-semibold">Des dizaines de lots à gagner !</p>
                  </div>
                </div>

                <p className="text-gray-600 mb-6 text-lg">
                  Chaque ticket peut être le bon ! Tentez votre chance pour repartir avec l&apos;un de nos supers lots.
                </p>

                <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl p-5 border-2 border-amber-200">
                  <p className="font-bold text-gray-800 mb-3 flex items-center gap-2">
                    <Star className="w-5 h-5 text-amber-500" />
                    Lots à gagner :
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {[
                      { label: "Jeux de société", emoji: "🎲" },
                      { label: "Jouets", emoji: "🧸" },
                      { label: "Livres", emoji: "📚" },
                      { label: "Bons cadeaux", emoji: "🎁" },
                      { label: "Et plein de surprises...", emoji: "✨" },
                    ].map((lot) => (
                      <span
                        key={lot.label}
                        className="inline-flex items-center gap-1 px-4 py-2 bg-white rounded-full text-sm font-medium text-gray-700 shadow-sm border border-amber-100"
                      >
                        <span>{lot.emoji}</span>
                        {lot.label}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Panier Garni */}
          <div className="group relative">
            {/* Effet glow */}
            <div className="absolute -inset-1 bg-gradient-to-r from-lime-400 via-green-400 to-emerald-400 rounded-3xl blur-lg opacity-50 group-hover:opacity-75 transition-opacity"></div>

            <div className="relative bg-gradient-to-br from-lime-400 via-green-500 to-emerald-500 rounded-3xl overflow-hidden shadow-2xl">
              {/* Décorations */}
              <div className="absolute top-4 right-4 text-6xl animate-bounce">🧺</div>
              <div className="absolute top-12 left-8 text-4xl animate-pulse">🍎</div>
              <div className="absolute bottom-24 left-4 text-4xl animate-bounce" style={{ animationDelay: "0.3s" }}>🧀</div>

              {/* Zone illustration */}
              <div className="h-48 sm:h-56 flex items-center justify-center relative">
                <div className="text-center">
                  <div className="text-8xl sm:text-9xl mb-2 drop-shadow-lg">🧺</div>
                  <div className="flex justify-center gap-2">
                    {["🍷", "🧀", "🥖", "🍫", "🍯"].map((emoji, i) => (
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
                    <h3 className="text-2xl sm:text-3xl font-extrabold text-gray-800">Panier Garni</h3>
                    <p className="text-green-600 font-semibold">Devinez son poids et gagnez-le !</p>
                  </div>
                </div>

                <p className="text-gray-600 mb-6 text-lg">
                  Un magnifique panier rempli de produits gourmands ! Estimez son poids au gramme près...
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

        {/* Rappel tirage */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-3 px-6 py-4 bg-white rounded-2xl shadow-lg border-2 border-dashed border-amber-300">
            <span className="text-3xl">🎊</span>
            <p className="text-gray-700 font-semibold">
              Tirage des gagnants en <span className="text-orange-500">fin de kermesse</span> !
            </p>
            <span className="text-3xl">🎊</span>
          </div>
        </div>
      </div>
    </section>
  );
}
