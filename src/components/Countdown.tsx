"use client";

import { useState, useEffect } from "react";
import { eventConfig, programme } from "@/data/stands";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export default function Countdown() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null);
  const [isEventStarted, setIsEventStarted] = useState(false);

  useEffect(() => {
    // Récupère l'heure du premier événement du programme
    const firstEventTime = programme[0]?.time || "17h15";
    // Convertit "17h15" en "17:15"
    const timeFormatted = firstEventTime.replace("h", ":");

    // Construit la date cible
    const targetDate = new Date(`${eventConfig.date}T${timeFormatted}:00`);

    const calculateTimeLeft = () => {
      const now = new Date();
      const difference = targetDate.getTime() - now.getTime();

      if (difference <= 0) {
        setIsEventStarted(true);
        return null;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      return { days, hours, minutes, seconds };
    };

    // Calcul initial
    setTimeLeft(calculateTimeLeft());

    // Mise à jour chaque seconde
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  if (isEventStarted) {
    return (
      <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-400 to-emerald-500 text-white rounded-2xl shadow-lg">
        <span className="text-2xl animate-bounce">🎉</span>
        <span className="font-bold text-lg">La kermesse a commencé !</span>
        <span className="text-2xl animate-bounce">🎉</span>
      </div>
    );
  }

  if (!timeLeft) {
    return (
      <div className="flex justify-center gap-3">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="bg-white/80 backdrop-blur rounded-xl p-3 w-16 h-20 animate-pulse" />
        ))}
      </div>
    );
  }

  const timeUnits = [
    { value: timeLeft.days, label: "Jours" },
    { value: timeLeft.hours, label: "Heures" },
    { value: timeLeft.minutes, label: "Minutes" },
    { value: timeLeft.seconds, label: "Secondes" },
  ];

  return (
    <div className="flex flex-col items-center gap-3">
      <p className="text-gray-600 font-medium text-sm">Rendez-vous dans</p>
      <div className="flex justify-center gap-2 sm:gap-3">
        {timeUnits.map((unit, index) => (
          <div key={unit.label} className="flex items-center gap-2 sm:gap-3">
            <div className="bg-gradient-to-br from-white to-gray-50 backdrop-blur-sm rounded-xl p-2 sm:p-3 shadow-lg border border-white/50 min-w-[60px] sm:min-w-[70px]">
              <div className="text-2xl sm:text-3xl font-extrabold bg-gradient-to-r from-[#ff6b6b] to-[#ee5a5a] bg-clip-text text-transparent">
                {String(unit.value).padStart(2, "0")}
              </div>
              <div className="text-[10px] sm:text-xs text-gray-500 font-medium uppercase tracking-wide">
                {unit.label}
              </div>
            </div>
            {index < timeUnits.length - 1 && (
              <span className="text-2xl font-bold text-[#ff6b6b] animate-pulse hidden sm:block">:</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
