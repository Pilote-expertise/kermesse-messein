"use client";

import { useState, useEffect } from "react";
import { stands as initialStands, standsOrganisation as initialStandsOrga, Stand } from "@/data/stands";
import StandCard from "./StandCard";
import InscriptionModal from "./InscriptionModal";
import InscritsModal, { Inscription } from "./InscritsModal";

export default function StandsSection() {
  const [stands, setStands] = useState<Stand[]>(initialStands);
  const [standsOrga, setStandsOrga] = useState<Stand[]>(initialStandsOrga);
  const [inscriptions, setInscriptions] = useState<Inscription[]>([]);
  const [isLoadingInscriptions, setIsLoadingInscriptions] = useState(true);
  const [selectedStand, setSelectedStand] = useState<{
    stand: Stand;
    creneau: "creneau0" | "creneau1" | "creneau2";
  } | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isInscritsModalOpen, setIsInscritsModalOpen] = useState(false);
  const [viewingStand, setViewingStand] = useState<{
    stand: Stand;
    creneau: "creneau0" | "creneau1" | "creneau2";
  } | null>(null);

  const allStands = [...stands, ...standsOrga];

  // Charger les inscriptions confirmées au démarrage
  useEffect(() => {
    async function fetchInscriptions() {
      try {
        const response = await fetch("/api/inscriptions");
        if (response.ok) {
          const data = await response.json();
          setInscriptions(data.inscriptions || []);

          // Mettre à jour le compteur des stands
          const inscriptionsList = data.inscriptions || [];

          // Compter les inscriptions par stand et créneau
          const counts: Record<string, { creneau0: number; creneau1: number; creneau2: number }> = {};
          inscriptionsList.forEach((insc: Inscription) => {
            if (!counts[insc.standId]) {
              counts[insc.standId] = { creneau0: 0, creneau1: 0, creneau2: 0 };
            }
            counts[insc.standId][insc.creneau as "creneau0" | "creneau1" | "creneau2"]++;
          });

          // Mettre à jour les stands
          setStands((prev) =>
            prev.map((s) => ({
              ...s,
              slots: {
                ...(s.slots.creneau0 && {
                  creneau0: {
                    ...s.slots.creneau0,
                    registered: counts[s.id]?.creneau0 || 0,
                  },
                }),
                creneau1: {
                  ...s.slots.creneau1,
                  registered: counts[s.id]?.creneau1 || 0,
                },
                creneau2: {
                  ...s.slots.creneau2,
                  registered: counts[s.id]?.creneau2 || 0,
                },
              },
            }))
          );

          setStandsOrga((prev) =>
            prev.map((s) => ({
              ...s,
              slots: {
                ...(s.slots.creneau0 && {
                  creneau0: {
                    ...s.slots.creneau0,
                    registered: counts[s.id]?.creneau0 || 0,
                  },
                }),
                creneau1: {
                  ...s.slots.creneau1,
                  registered: counts[s.id]?.creneau1 || 0,
                },
                creneau2: {
                  ...s.slots.creneau2,
                  registered: counts[s.id]?.creneau2 || 0,
                },
              },
            }))
          );
        }
      } catch (error) {
        console.error("Erreur chargement inscriptions:", error);
      } finally {
        setIsLoadingInscriptions(false);
      }
    }

    fetchInscriptions();
  }, []);

  const handleRegister = (standId: string, creneau: "creneau0" | "creneau1" | "creneau2") => {
    const stand = allStands.find((s) => s.id === standId);
    if (stand) {
      setSelectedStand({ stand, creneau });
      setIsModalOpen(true);
    }
  };

  const handleViewInscrits = (standId: string, creneau: "creneau0" | "creneau1" | "creneau2") => {
    const stand = allStands.find((s) => s.id === standId);
    if (stand) {
      setViewingStand({ stand, creneau });
      setIsInscritsModalOpen(true);
    }
  };

  const updateStandList = (
    setter: React.Dispatch<React.SetStateAction<Stand[]>>,
    standId: string,
    creneau: "creneau0" | "creneau1" | "creneau2"
  ) => {
    setter((prev) =>
      prev.map((s) => {
        if (s.id === standId) {
          const currentSlot = s.slots[creneau];
          if (!currentSlot) return s;
          return {
            ...s,
            slots: {
              ...s.slots,
              [creneau]: {
                ...currentSlot,
                registered: currentSlot.registered + 1,
              },
            },
          };
        }
        return s;
      })
    );
  };

  const handleInscriptionSuccess = (standId: string, creneau: "creneau0" | "creneau1" | "creneau2", prenom: string, nom: string) => {
    // Ajoute l'inscription à la liste
    setInscriptions((prev) => [...prev, { nom, prenom, standId, creneau }]);

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
        (a.slots.creneau0 ? a.slots.creneau0.needed - a.slots.creneau0.registered : 0) +
        a.slots.creneau1.needed - a.slots.creneau1.registered +
        a.slots.creneau2.needed - a.slots.creneau2.registered;
      const needsB =
        (b.slots.creneau0 ? b.slots.creneau0.needed - b.slots.creneau0.registered : 0) +
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
      (s.slots.creneau0 ? s.slots.creneau0.needed - s.slots.creneau0.registered : 0) +
      (s.slots.creneau1.needed - s.slots.creneau1.registered) +
      (s.slots.creneau2.needed - s.slots.creneau2.registered),
    0
  );

  const totalRegistered = allStands.reduce(
    (acc, s) => acc + (s.slots.creneau0?.registered || 0) + s.slots.creneau1.registered + s.slots.creneau2.registered,
    0
  );

  const totalSlots = allStands.reduce(
    (acc, s) => acc + (s.slots.creneau0?.needed || 0) + s.slots.creneau1.needed + s.slots.creneau2.needed,
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
            <StandCard
              key={stand.id}
              stand={stand}
              inscriptions={inscriptions}
              onRegister={handleRegister}
              onViewInscrits={handleViewInscrits}
            />
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
            <StandCard
              key={stand.id}
              stand={stand}
              inscriptions={inscriptions}
              onRegister={handleRegister}
              onViewInscrits={handleViewInscrits}
            />
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

        {/* Modal des inscrits */}
        {isInscritsModalOpen && viewingStand && (
          <InscritsModal
            stand={viewingStand.stand}
            creneau={viewingStand.creneau}
            inscriptions={inscriptions}
            onClose={() => {
              setIsInscritsModalOpen(false);
              setViewingStand(null);
            }}
          />
        )}
      </div>
    </section>
  );
}
