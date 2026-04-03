"use client";

import { useState } from "react";
import { stands as initialStands, standsOrganisation as initialStandsOrga, Stand } from "@/data/stands";
import StandCard from "./StandCard";
import InscriptionModal from "./InscriptionModal";

export default function StandsSection() {
  const [stands, setStands] = useState<Stand[]>(initialStands);
  const [standsOrga, setStandsOrga] = useState<Stand[]>(initialStandsOrga);
  const [selectedStand, setSelectedStand] = useState<{
    stand: Stand;
    creneau: "creneau1" | "creneau2";
  } | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const allStands = [...stands, ...standsOrga];

  const handleRegister = (standId: string, creneau: "creneau1" | "creneau2") => {
    const stand = allStands.find((s) => s.id === standId);
    if (stand) {
      setSelectedStand({ stand, creneau });
      setIsModalOpen(true);
    }
  };

  const updateStandList = (
    setter: React.Dispatch<React.SetStateAction<Stand[]>>,
    standId: string,
    creneau: "creneau1" | "creneau2"
  ) => {
    setter((prev) =>
      prev.map((s) => {
        if (s.id === standId) {
          return {
            ...s,
            slots: {
              ...s.slots,
              [creneau]: {
                ...s.slots[creneau],
                registered: s.slots[creneau].registered + 1,
              },
            },
          };
        }
        return s;
      })
    );
  };

  const handleInscriptionSuccess = (standId: string, creneau: "creneau1" | "creneau2") => {
    // Vérifie dans quelle liste se trouve le stand
    if (stands.find((s) => s.id === standId)) {
      updateStandList(setStands, standId, creneau);
    } else {
      updateStandList(setStandsOrga, standId, creneau);
    }
    setIsModalOpen(false);
    setSelectedStand(null);
  };

  // Fonction de tri : ceux avec le plus de besoins en premier
  const sortByNeeds = (list: Stand[]) =>
    [...list].sort((a, b) => {
      const needsA =
        a.slots.creneau1.needed - a.slots.creneau1.registered +
        a.slots.creneau2.needed - a.slots.creneau2.registered;
      const needsB =
        b.slots.creneau1.needed - b.slots.creneau1.registered +
        b.slots.creneau2.needed - b.slots.creneau2.registered;
      return needsB - needsA;
    });

  const sortedStands = sortByNeeds(stands);
  const sortedStandsOrga = sortByNeeds(standsOrga);

  // Stats globales (inclut tous les stands)
  const totalNeeded = allStands.reduce(
    (acc, s) =>
      acc +
      (s.slots.creneau1.needed - s.slots.creneau1.registered) +
      (s.slots.creneau2.needed - s.slots.creneau2.registered),
    0
  );

  const totalRegistered = allStands.reduce(
    (acc, s) => acc + s.slots.creneau1.registered + s.slots.creneau2.registered,
    0
  );

  const totalSlots = allStands.reduce(
    (acc, s) => acc + s.slots.creneau1.needed + s.slots.creneau2.needed,
    0
  );

  const progressPercent = totalSlots > 0 ? Math.round((totalRegistered / totalSlots) * 100) : 0;

  return (
    <section id="stands" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* En-tête */}
        <div className="text-center mb-12">
          <span className="text-5xl mb-4 block">🎪</span>
          <h2 className="section-title text-3xl sm:text-4xl font-extrabold text-gray-800 mb-4">
            Les stands de la kermesse
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto mt-6">
            Découvrez tous les stands qui animeront cette belle journée et inscrivez-vous
            pour aider à les faire vivre !
          </p>
        </div>

        {/* Barre de progression globale */}
        <div className="max-w-2xl mx-auto mb-12 p-6 bg-gradient-to-r from-[#4ecdc4]/10 to-[#ff6b6b]/10 rounded-2xl">
          <div className="flex items-center justify-between mb-3">
            <span className="font-semibold text-gray-700">Progression des inscriptions</span>
            <span className="text-2xl font-bold text-[#ff6b6b]">{progressPercent}%</span>
          </div>
          <div className="h-4 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#ff6b6b] to-[#4ecdc4] transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <div className="flex justify-between mt-3 text-sm text-gray-600">
            <span>{totalRegistered} inscrits</span>
            <span>{totalNeeded} places restantes</span>
          </div>
        </div>

        {/* Titre stands de jeux */}
        <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
          <span className="text-3xl">🎮</span>
          Stands de jeux
        </h3>

        {/* Grille des stands de jeux */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedStands.map((stand) => (
            <StandCard key={stand.id} stand={stand} onRegister={handleRegister} />
          ))}
        </div>

        {/* Titre stands organisation */}
        <h3 className="text-2xl font-bold text-gray-800 mt-16 mb-6 flex items-center gap-3">
          <span className="text-3xl">🏪</span>
          Stands organisation
        </h3>

        {/* Grille des stands organisation */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedStandsOrga.map((stand) => (
            <StandCard key={stand.id} stand={stand} onRegister={handleRegister} />
          ))}
        </div>

        {/* Modal d'inscription */}
        {isModalOpen && selectedStand && (
          <InscriptionModal
            stand={selectedStand.stand}
            creneau={selectedStand.creneau}
            onClose={() => {
              setIsModalOpen(false);
              setSelectedStand(null);
            }}
            onSuccess={handleInscriptionSuccess}
          />
        )}
      </div>
    </section>
  );
}
