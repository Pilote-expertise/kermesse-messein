"use client";

import { programme } from "@/data/stands";

export default function ProgrammeSection() {
  return (
    <section id="programme" className="py-20 bg-gradient-to-b from-white to-[#fef7e0]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* En-tête */}
        <div className="text-center mb-12">
          <span className="text-5xl mb-4 block">📋</span>
          <h2 className="section-title text-3xl sm:text-4xl font-extrabold text-gray-800 mb-4">
            Programme de l&apos;Événement
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto mt-6">
            Voici le déroulé prévu pour cette magnifique soirée de kermesse !
          </p>
        </div>

        {/* Timeline */}
        <div className="relative pl-8 border-l-4 border-gradient-to-b from-[#ff6b6b] to-[#4ecdc4]" style={{ borderImage: "linear-gradient(to bottom, #ff6b6b, #4ecdc4) 1" }}>
          {programme.map((item, index) => (
            <div
              key={index}
              className="timeline-item relative mb-8 last:mb-0"
            >
              <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow ml-4">
                <div className="flex items-start gap-4">
                  <span className="text-3xl">{item.icon}</span>
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <span className="px-3 py-1 bg-gradient-to-r from-[#ff6b6b]/10 to-[#4ecdc4]/10 text-sm font-semibold text-gray-700 rounded-full">
                        {item.time}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-gray-800">{item.title}</h3>
                    <p className="text-gray-600 text-sm mt-1">{item.description}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Info importante Auberge Espagnole */}
        <div className="mt-12 p-6 bg-gradient-to-r from-[#f97316]/10 via-[#eab308]/10 to-[#22c55e]/10 rounded-2xl border-2 border-dashed border-[#f97316]/30">
          <div className="flex items-start gap-4">
            <span className="text-4xl">🍽️</span>
            <div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                Repas &quot;Auberge Espagnole&quot;
              </h3>
              <p className="text-gray-600 mb-3">
                Le soir, nous partagerons un repas convivial où chacun apporte un plat à partager !
              </p>
              <ul className="space-y-2">
                <li className="flex items-center gap-2 text-sm text-gray-700">
                  <span className="w-2 h-2 rounded-full bg-[#ff6b6b]"></span>
                  Apportez une entrée, un plat ou un dessert à partager
                </li>
                <li className="flex items-center gap-2 text-sm text-gray-700">
                  <span className="w-2 h-2 rounded-full bg-[#4ecdc4]"></span>
                  <strong>N&apos;oubliez pas vos couverts et assiettes !</strong>
                </li>
                <li className="flex items-center gap-2 text-sm text-gray-700">
                  <span className="w-2 h-2 rounded-full bg-[#a855f7]"></span>
                  Moment de partage et de convivialité garanti
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
