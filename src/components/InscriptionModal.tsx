"use client";

import { useState } from "react";
import { X, Send, CheckCircle, Loader2, Mail } from "lucide-react";
import { Stand, creneaux } from "@/data/stands";

interface InscriptionModalProps {
  stand: Stand;
  creneau: "creneau1" | "creneau2";
  onClose: () => void;
  onSuccess: (standId: string, creneau: "creneau1" | "creneau2", prenom: string) => void;
}

const classes = [
  "Petite Section",
  "Moyenne Section",
  "Grande Section",
  "CP",
  "CE1",
  "CE2",
  "CM1",
  "CM2",
];

export default function InscriptionModal({
  stand,
  creneau,
  onClose,
  onSuccess,
}: InscriptionModalProps) {
  const [formData, setFormData] = useState({
    prenom: "",
    email: "",
    role: "maman",
    prenomEnfant: "",
    classeEnfant: "",
    commentaire: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const creneauInfo = creneaux[creneau];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    // Validation
    if (!formData.prenom || !formData.email || !formData.prenomEnfant || !formData.classeEnfant) {
      setError("Veuillez remplir tous les champs obligatoires.");
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch("/api/inscriptions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          standId: stand.id,
          standName: stand.name,
          creneau: creneau,
          creneauLabel: creneauInfo.label,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Une erreur est survenue");
      }

      setIsSuccess(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Une erreur est survenue. Veuillez réessayer.");
    } finally {
      setIsSubmitting(false);
    }
  };

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
          {isSuccess ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="w-8 h-8 text-blue-500" />
              </div>
              <h4 className="text-xl font-bold text-gray-800 mb-2">Vérifiez votre email !</h4>
              <p className="text-gray-600 mb-4">
                Merci {formData.prenom} ! Un email de confirmation vous a été envoyé à <strong>{formData.email}</strong>.
              </p>
              <p className="text-sm text-gray-500">
                Cliquez sur le lien dans l'email pour finaliser votre inscription.
              </p>
              <button
                onClick={onClose}
                className="mt-6 px-6 py-2 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 transition-colors"
              >
                Fermer
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Prénom */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Votre prénom *
                </label>
                <input
                  type="text"
                  value={formData.prenom}
                  onChange={(e) => setFormData({ ...formData, prenom: e.target.value })}
                  className="form-input w-full px-4 py-2 rounded-lg"
                  placeholder="Ex: Marie"
                  required
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Votre email *
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="form-input w-full px-4 py-2 rounded-lg"
                  placeholder="Ex: marie@email.com"
                  required
                />
              </div>

              {/* Rôle */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Vous êtes *
                </label>
                <div className="flex gap-4">
                  {["maman", "papa", "autre"].map((role) => (
                    <label key={role} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="role"
                        value={role}
                        checked={formData.role === role}
                        onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                        className="text-[#ff6b6b] focus:ring-[#ff6b6b]"
                      />
                      <span className="capitalize">{role}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Prénom enfant */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Prénom de votre enfant *
                </label>
                <input
                  type="text"
                  value={formData.prenomEnfant}
                  onChange={(e) => setFormData({ ...formData, prenomEnfant: e.target.value })}
                  className="form-input w-full px-4 py-2 rounded-lg"
                  placeholder="Ex: Lucas"
                  required
                />
              </div>

              {/* Classe enfant */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Classe de votre enfant *
                </label>
                <select
                  value={formData.classeEnfant}
                  onChange={(e) => setFormData({ ...formData, classeEnfant: e.target.value })}
                  className="form-input w-full px-4 py-2 rounded-lg"
                  required
                >
                  <option value="">Sélectionner une classe</option>
                  {classes.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>

              {/* Commentaire */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Commentaire (optionnel)
                </label>
                <textarea
                  value={formData.commentaire}
                  onChange={(e) => setFormData({ ...formData, commentaire: e.target.value })}
                  className="form-input w-full px-4 py-2 rounded-lg resize-none"
                  rows={2}
                  placeholder="Une information à nous transmettre ?"
                />
              </div>

              {/* Erreur */}
              {error && (
                <div className="p-3 bg-red-50 border border-red-200 text-red-600 text-sm rounded-lg">
                  {error}
                </div>
              )}

              {/* Bouton submit */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-[#ff6b6b] to-[#ee5a5a] text-white font-bold rounded-lg shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Inscription en cours...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    Confirmer mon inscription
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
