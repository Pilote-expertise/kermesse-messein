"use client";

import { X, Users } from "lucide-react";
import { Stand, creneaux } from "@/data/stands";

export interface Inscription {
  nom: string;
  prenom: string;
  standId: string;
  creneau: "creneau1" | "creneau2";
}

interface InscritsModalProps {
  stand: Stand;
  creneau: "creneau1" | "creneau2";
  inscriptions: Inscription[];
  onClose: () => void;
}

export default function InscritsModal({
  stand,
  creneau,
  inscriptions,
  onClose,
}: InscritsModalProps) {
  const creneauInfo = creneaux[creneau];

  // Filtrer les inscriptions pour ce stand et ce créneau
  const inscritsStand = inscriptions.filter(
    (i) => i.standId === stand.id && i.creneau === creneau
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden animate-[scale-in_0.2s_ease-out]">
        {/* Header */}
        <div
          className={`p-6 bg-gradient-to-br ${stand.bgGradient} text-white`}
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1 hover:bg-white/20 rounded-full transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
          <span className="text-4xl block mb-2">{stand.icon}</span>
          <h3 className="text-xl font-bold">{stand.name}</h3>
          <p className="text-white/80 text-sm mt-1">
            {creneauInfo.label} - {creneauInfo.horaire}
          </p>
        </div>

        {/* Contenu */}
        <div className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <Users className="w-5 h-5 text-gray-600" />
            <h4 className="font-semibold text-gray-800">
              Bénévoles inscrits ({inscritsStand.length})
            </h4>
          </div>

          {inscritsStand.length === 0 ? (
            <p className="text-gray-500 text-center py-8">
              Aucun bénévole inscrit pour ce créneau.
            </p>
          ) : (
            <ul className="space-y-2">
              {inscritsStand.map((inscrit, index) => (
                <li
                  key={index}
                  className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg"
                >
                  <span className="w-8 h-8 bg-gradient-to-br from-[#ff6b6b] to-[#ee5a5a] rounded-full flex items-center justify-center text-white font-bold text-sm">
                    {inscrit.prenom.charAt(0).toUpperCase()}{inscrit.nom.charAt(0).toUpperCase()}
                  </span>
                  <span className="font-medium text-gray-800">
                    {inscrit.prenom} {inscrit.nom}
                  </span>
                </li>
              ))}
            </ul>
          )}

          <button
            onClick={onClose}
            className="w-full mt-6 px-6 py-3 bg-gray-100 text-gray-700 font-semibold rounded-lg hover:bg-gray-200 transition-colors"
          >
            Fermer
          </button>
        </div>
      </div>
    </div>
  );
}
