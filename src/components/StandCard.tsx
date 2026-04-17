"use client";

import { Users, CheckCircle, Eye } from "lucide-react";
import { Stand, creneaux } from "@/data/stands";
import { Inscription } from "./InscritsModal";

interface StandCardProps {
  stand: Stand;
  inscriptions: Inscription[];
  onRegister: (standId: string, creneau: "creneau0" | "creneau1" | "creneau2") => void;
  onViewInscrits: (standId: string, creneau: "creneau0" | "creneau1" | "creneau2") => void;
}

export default function StandCard({ stand, inscriptions, onRegister, onViewInscrits }: StandCardProps) {
  const getTotalNeeded = () => {
    let total = stand.slots.creneau1.needed - stand.slots.creneau1.registered +
      stand.slots.creneau2.needed - stand.slots.creneau2.registered;
    if (stand.slots.creneau0) {
      total += stand.slots.creneau0.needed - stand.slots.creneau0.registered;
    }
    return total;
  };

  const totalNeeded = getTotalNeeded();

  const getInscritsCount = (creneauKey: "creneau0" | "creneau1" | "creneau2") => {
    return inscriptions.filter(
      (i) => i.standId === stand.id && i.creneau === creneauKey
    ).length;
  };

  return (
    <div className="stand-card relative group">

      {/* Header avec icône */}
      <div
        className={`h-32 flex items-center justify-center bg-gradient-to-br ${stand.bgGradient}`}
      >
        <span className="text-6xl group-hover:scale-125 transition-transform duration-300">
          {stand.icon}
        </span>
      </div>

      {/* Contenu */}
      <div className="p-5">
        <h3 className="text-xl font-bold text-gray-800 mb-2">{stand.name}</h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{stand.description}</p>

        {/* Créneaux */}
        <div className="space-y-3">
          {(stand.slots.creneau0
            ? (["creneau0", "creneau1", "creneau2"] as const)
            : (["creneau1", "creneau2"] as const)
          ).map((creneauKey) => {
            const slot = stand.slots[creneauKey]!;
            const creneau = creneaux[creneauKey];
            const remaining = slot.needed - slot.registered;
            const isFull = remaining <= 0;
            const inscritsCount = getInscritsCount(creneauKey);

            return (
              <div
                key={creneauKey}
                className={`p-3 rounded-lg border-2 transition-all ${
                  isFull
                    ? "bg-green-50 border-green-200"
                    : "bg-gray-50 border-gray-200 hover:border-[#ff6b6b]"
                }`}
              >
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <div className="flex items-center gap-2">
                    <div>
                      <span className="font-semibold text-sm">{creneau.label}</span>
                      <span className="text-xs text-gray-500 ml-2">({creneau.horaire})</span>
                    </div>
                    {inscritsCount > 0 && (
                      <button
                        onClick={() => onViewInscrits(stand.id, creneauKey)}
                        className="flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-full hover:bg-blue-200 transition-colors"
                      >
                        <Eye className="w-3 h-3" />
                        {inscritsCount}
                      </button>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    {isFull ? (
                      <span className="flex items-center gap-1 text-green-600 text-sm font-medium">
                        <CheckCircle className="w-4 h-4" />
                        Complet
                      </span>
                    ) : (
                      <>
                        <span className="flex items-center gap-1 text-gray-600 text-sm">
                          <Users className="w-4 h-4" />
                          {remaining} place{remaining > 1 ? "s" : ""}
                        </span>
                        <button
                          onClick={() => onRegister(stand.id, creneauKey)}
                          className="px-3 py-1 bg-gradient-to-r from-[#ff6b6b] to-[#ee5a5a] text-white text-xs font-bold rounded-full hover:scale-105 transition-transform"
                        >
                          S&apos;inscrire
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Indicateur total */}
        <div className="mt-4 pt-4 border-t">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-500">Bénévoles encore recherchés :</span>
            <span
              className={`font-bold ${
                totalNeeded === 0
                  ? "text-green-600"
                  : totalNeeded > 2
                  ? "text-red-500"
                  : "text-orange-500"
              }`}
            >
              {totalNeeded === 0 ? "Équipe complète !" : `${totalNeeded} personne${totalNeeded > 1 ? "s" : ""}`}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
