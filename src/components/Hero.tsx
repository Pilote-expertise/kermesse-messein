"use client";

import Image from "next/image";
import { Calendar, MapPin, Clock, Heart } from "lucide-react";
import Countdown from "./Countdown";

export default function Hero() {
  return (
    <section
      id="accueil"
      className="relative min-h-screen flex items-center justify-center overflow-hidden banner-pattern"
    >
      {/* Confettis décoratifs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-3 h-3 rounded-full opacity-60"
            style={{
              backgroundColor: ["#ff6b6b", "#4ecdc4", "#ffe66d", "#a855f7", "#f97316"][i % 5],
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              transform: `scale(${0.5 + Math.random()})`,
            }}
          />
        ))}
      </div>

      {/* Image illustration - pleine largeur */}
      <div className="absolute top-0 left-0 right-0 z-10 pt-20 md:pt-24 px-4">
        <div className="relative w-full h-48 sm:h-64 md:h-80 lg:h-96 bg-white rounded-2xl overflow-hidden shadow-2xl border-4 border-white">
          <Image
            src="/Fête école Messein.png"
            alt="Fête de l'école de Messein"
            fill
            sizes="100vw"
            className="object-contain"
            priority
          />
        </div>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 pt-56 sm:pt-72 md:pt-96 pb-20 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full shadow-lg mb-8">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
          </span>
          <span className="text-sm font-medium text-gray-700">Inscriptions ouvertes !</span>
        </div>

        {/* Titre principal */}
        <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold mb-6">
          <span className="bg-gradient-to-r from-[#ff6b6b] via-[#f97316] to-[#eab308] bg-clip-text text-transparent">
            Kermesse
          </span>
          <br />
          <span className="text-gray-800">2026</span>
        </h1>

        {/* Sous-titre */}
        <p className="text-xl sm:text-2xl text-gray-600 mb-4 font-medium">
          École Jean Rostand de Messein
        </p>

        {/* Compteur */}
        <div className="mb-8">
          <Countdown />
        </div>

        {/* Emojis animés */}
        <div className="flex justify-center gap-4 text-4xl mb-8">
          <span className="animate-bounce-slow" style={{ animationDelay: "0s" }}>🎪</span>
          <span className="animate-bounce-slow" style={{ animationDelay: "0.2s" }}>🎠</span>
          <span className="animate-bounce-slow" style={{ animationDelay: "0.4s" }}>🎯</span>
          <span className="animate-bounce-slow" style={{ animationDelay: "0.6s" }}>🍭</span>
          <span className="animate-bounce-slow" style={{ animationDelay: "0.8s" }}>🎟️</span>
        </div>

        {/* Informations clés */}
        <div className="flex flex-wrap justify-center gap-4 mb-10">
          <div className="flex items-center gap-2 px-5 py-3 bg-white rounded-xl shadow-md">
            <Calendar className="w-5 h-5 text-[#ff6b6b]" />
            <span className="font-semibold">Vendredi 12 Juin 2026</span>
          </div>
          <div className="flex items-center gap-2 px-5 py-3 bg-white rounded-xl shadow-md">
            <MapPin className="w-5 h-5 text-[#4ecdc4]" />
            <span className="font-semibold">École de Messein</span>
          </div>
          <div className="flex items-center gap-2 px-5 py-3 bg-white rounded-xl shadow-md">
            <Clock className="w-5 h-5 text-[#a855f7]" />
            <span className="font-semibold">Après-midi &amp; soirée</span>
          </div>
        </div>

        {/* Boutons CTA */}
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <a
            href="#inscription"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-[#ff6b6b] to-[#ee5a5a] text-white font-bold text-lg rounded-full shadow-xl hover:shadow-2xl hover:scale-105 transition-all animate-pulse-glow"
          >
            <Heart className="w-5 h-5" />
            Devenir bénévole
          </a>
          <a
            href="#stands"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-gray-800 font-bold text-lg rounded-full shadow-xl hover:shadow-2xl hover:scale-105 transition-all border-2 border-gray-200"
          >
            Découvrir les stands
          </a>
        </div>

        {/* Message important */}
        <div className="mt-12 max-w-2xl mx-auto p-6 bg-gradient-to-r from-[#4ecdc4]/10 to-[#ff6b6b]/10 rounded-2xl border border-white/50">
          <p className="text-gray-700">
            <span className="font-bold text-[#ff6b6b]">Tous les bénéfices</span> de cette journée permettront
            de financer les <span className="font-bold text-[#4ecdc4]">sorties scolaires</span> et{" "}
            <span className="font-bold text-[#a855f7]">activités</span> pour les enfants de l&apos;école !
          </p>
        </div>
      </div>

      {/* Vague décorative */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M0 120L48 110C96 100 192 80 288 70C384 60 480 60 576 65C672 70 768 80 864 85C960 90 1056 90 1152 85C1248 80 1344 70 1392 65L1440 60V120H1392C1344 120 1248 120 1152 120C1056 120 960 120 864 120C768 120 672 120 576 120C480 120 384 120 288 120C192 120 96 120 48 120H0Z"
            fill="white"
          />
        </svg>
      </div>
    </section>
  );
}
