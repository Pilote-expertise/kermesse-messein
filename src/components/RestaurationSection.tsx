"use client";

import { restauration } from "@/data/stands";

export default function RestaurationSection() {
  return (
    <section id="restauration" className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* En-tête */}
        <div className="text-center mb-12">
          <span className="text-5xl mb-4 block">🍿</span>
          <h2 className="section-title text-3xl sm:text-4xl font-extrabold text-gray-800 mb-4">
            Restauration sur Place
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto mt-6">
            De quoi vous régaler tout au long de la journée !
          </p>
        </div>

        {/* Grille des produits */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {restauration.map((item, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-white to-gray-50 rounded-xl p-4 shadow-md hover:shadow-lg hover:scale-105 transition-all text-center group cursor-default"
            >
              <span className="text-4xl block mb-2 group-hover:animate-wiggle">
                {item.icon}
              </span>
              <h3 className="font-semibold text-gray-800 text-sm">{item.name}</h3>
              <span className="text-xs text-gray-500 mt-1 block">{item.price}</span>
            </div>
          ))}
        </div>

        {/* Note météo */}
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500 inline-flex items-center gap-2 bg-blue-50 px-4 py-2 rounded-full">
            <span>🌤️</span>
            Les Mister Freeze seront disponibles si le temps le permet !
          </p>
        </div>

        {/* Rappel bénéfices */}
        <div className="mt-12 p-6 bg-gradient-to-r from-[#ff6b6b]/5 to-[#4ecdc4]/5 rounded-2xl text-center">
          <p className="text-gray-700">
            <span className="font-bold text-[#ff6b6b]">Rappel :</span> Tous les bénéfices de la vente
            permettront de financer les <span className="font-bold text-[#4ecdc4]">activités et sorties scolaires</span> des enfants !
          </p>
        </div>
      </div>
    </section>
  );
}
