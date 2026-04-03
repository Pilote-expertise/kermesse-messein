"use client";

import { MapPin, Upload } from "lucide-react";

export default function PlanSection() {
  return (
    <section id="plan" className="py-20 bg-gradient-to-b from-white to-[#fef7e0]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* En-tête */}
        <div className="text-center mb-12">
          <span className="text-5xl mb-4 block">🗺️</span>
          <h2 className="section-title text-3xl sm:text-4xl font-extrabold text-gray-800 mb-4">
            Plan de la Kermesse
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto mt-6">
            Retrouvez l&apos;emplacement de chaque stand sur le plan de l&apos;école
          </p>
        </div>

        {/* Zone du plan */}
        <div className="relative bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Placeholder pour le plan */}
          <div className="aspect-[16/10] bg-gradient-to-br from-gray-100 to-gray-200 flex flex-col items-center justify-center p-8">
            <div className="w-20 h-20 bg-gray-300 rounded-full flex items-center justify-center mb-4">
              <Upload className="w-10 h-10 text-gray-500" />
            </div>
            <h3 className="text-xl font-bold text-gray-600 mb-2">Plan de l&apos;école</h3>
            <p className="text-gray-500 text-center max-w-md">
              Le plan avec l&apos;emplacement des stands sera ajouté prochainement.
              <br />
              <span className="text-sm">(Ajoutez votre image du plan ici)</span>
            </p>
          </div>

          {/* Légende */}
          <div className="p-6 bg-gray-50 border-t">
            <h4 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
              <MapPin className="w-5 h-5 text-[#ff6b6b]" />
              Légende des zones
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
              {[
                { color: "bg-pink-500", name: "Peluches" },
                { color: "bg-orange-500", name: "Chamboule-tout" },
                { color: "bg-green-500", name: "Circuit vélo" },
                { color: "bg-blue-500", name: "Pêche canards" },
                { color: "bg-cyan-500", name: "Jeux d'eau" },
                { color: "bg-amber-700", name: "Course café" },
                { color: "bg-purple-500", name: "Maquillage" },
                { color: "bg-rose-400", name: "Sucettes" },
                { color: "bg-yellow-500", name: "Fort Boyard" },
                { color: "bg-red-500", name: "Restauration" },
              ].map((item) => (
                <div key={item.name} className="flex items-center gap-2">
                  <span className={`w-4 h-4 rounded-full ${item.color}`}></span>
                  <span className="text-sm text-gray-700">{item.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Photos de l'école */}
        <div className="mt-12">
          <h3 className="text-xl font-bold text-gray-800 mb-6 text-center">
            Photos de l&apos;école
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="aspect-square bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl flex items-center justify-center"
              >
                <div className="text-center">
                  <span className="text-3xl block mb-2">📷</span>
                  <span className="text-sm text-gray-500">Photo {i}</span>
                </div>
              </div>
            ))}
          </div>
          <p className="text-center text-gray-500 text-sm mt-4">
            Ajoutez vos photos de l&apos;école pour illustrer le site
          </p>
        </div>
      </div>
    </section>
  );
}
