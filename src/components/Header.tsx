"use client";

import { useState, useEffect } from "react";
import { Menu, X, Calendar, MapPin } from "lucide-react";

const navItems = [
  { href: "#accueil", label: "Accueil" },
  { href: "#stands", label: "Stands" },
  { href: "#inscription", label: "Inscription" },
  { href: "#programme", label: "Programme" },
  { href: "#restauration", label: "Restauration" },
  { href: "#plan", label: "Plan" },
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-md shadow-lg"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <a href="#accueil" className="flex items-center gap-2">
            <span className="text-3xl animate-bounce-slow">🎪</span>
            <div className="hidden sm:block">
              <span className="font-bold text-lg text-gray-800">Kermesse 2026</span>
              <span className="block text-xs text-gray-500">École Jean Rostand</span>
            </div>
          </a>

          {/* Info date - Desktop */}
          <div className="hidden md:flex items-center gap-6 text-sm">
            <div className="flex items-center gap-2 text-gray-600">
              <Calendar className="w-4 h-4 text-[#ff6b6b]" />
              <span>12 Juin 2026</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <MapPin className="w-4 h-4 text-[#4ecdc4]" />
              <span>Messein</span>
            </div>
          </div>

          {/* Navigation Desktop */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-[#ff6b6b] hover:bg-pink-50 rounded-full transition-all"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* CTA Button */}
          <a
            href="#inscription"
            className="hidden md:inline-flex items-center px-5 py-2.5 bg-gradient-to-r from-[#ff6b6b] to-[#ee5a5a] text-white font-semibold rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all"
          >
            Je m&apos;inscris !
          </a>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 text-gray-700 hover:text-[#ff6b6b] transition-colors"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 right-0 bg-white shadow-xl border-t">
            <nav className="flex flex-col p-4 gap-2">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="px-4 py-3 text-gray-700 hover:text-[#ff6b6b] hover:bg-pink-50 rounded-lg transition-all"
                >
                  {item.label}
                </a>
              ))}
              <a
                href="#inscription"
                onClick={() => setIsMenuOpen(false)}
                className="mt-2 px-4 py-3 bg-gradient-to-r from-[#ff6b6b] to-[#ee5a5a] text-white font-semibold rounded-lg text-center"
              >
                Je m&apos;inscris !
              </a>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
