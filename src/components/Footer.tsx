"use client";

import { Heart, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      {/* Section principale */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Info école */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-3xl">🎪</span>
              <div>
                <h3 className="font-bold text-lg">Kermesse 2026</h3>
                <p className="text-gray-400 text-sm">École Jean Rostand</p>
              </div>
            </div>
            <p className="text-gray-400 text-sm">
              Une journée festive organisée par l&apos;association des parents d&apos;élèves
              pour le bonheur des enfants !
            </p>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold mb-4 text-[#4ecdc4]">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-gray-400 text-sm">
                <MapPin className="w-4 h-4 text-[#ff6b6b]" />
                École Jean Rostand, Messein
              </li>
            </ul>
          </div>

          {/* Liens rapides */}
          <div>
            <h4 className="font-bold mb-4 text-[#4ecdc4]">Liens rapides</h4>
            <ul className="space-y-2">
              {[
                { href: "#stands", label: "Les stands" },
                { href: "#inscription", label: "S'inscrire" },
                { href: "#programme", label: "Programme" },
                { href: "#restauration", label: "Restauration" },
                { href: "#plan", label: "Plan" },
              ].map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-gray-400 text-sm hover:text-white transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Barre de bas de page */}
      <div className="border-t border-gray-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-gray-500 text-sm text-center sm:text-left">
              © 2026 Kermesse École Jean Rostand Messein. Tous droits réservés.
            </p>
            <p className="text-gray-500 text-sm flex items-center gap-1">
              Fait avec <Heart className="w-4 h-4 text-[#ff6b6b] fill-current" /> pour les enfants
            </p>
          </div>
          <p className="text-gray-600 text-xs text-center mt-4">
            Site créé par <a href="https://pilote-expertise.fr" target="_blank" rel="noopener noreferrer" className="hover:text-gray-400 transition-colors">Pilote Expertise</a>
          </p>
        </div>
      </div>
    </footer>
  );
}
