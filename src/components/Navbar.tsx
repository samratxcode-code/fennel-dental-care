"use client";

import { useState, useEffect } from "react";
import { useDevice } from "@/hooks/useDevice";

interface NavbarProps {
  onBookClick: () => void;
}

export default function Navbar({ onBookClick }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { isMobile } = useDevice();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "glass shadow-md py-2"
          : "bg-surface/90 md:bg-transparent py-4 border-b border-outline-variant/10 md:border-b-0"
      }`}
    >
      <div className="flex justify-between items-center px-6 md:px-12 max-w-[1440px] mx-auto">
        <a href="#" className="font-display text-2xl font-bold text-primary italic group flex items-center gap-3">
          <span className="material-symbols-outlined text-2xl text-secondary opacity-60 group-hover:opacity-100 transition-opacity duration-500 group-hover:rotate-12" style={{ fontVariationSettings: '"FILL" 1' }}>
            dentistry
          </span>
          <span className="group-hover:text-secondary transition-colors duration-500">Fennel Dental Care</span>
        </a>

        {!isMobile ? (
          <div className="flex gap-8 items-center">
            {[
              { href: "#services", label: "Services" },
              { href: "#meet-the-doctor", label: "Meet the Doctor" },
              { href: "#why-fennel", label: "Why Fennel" },
              { href: "#voices", label: "Patient Voices" },
              { href: "#location", label: "Contact" },
            ].map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="relative font-body text-[13px] font-semibold uppercase tracking-[0.12em] text-on-surface hover:text-primary transition-colors duration-300 group py-1"
              >
                {link.label}
                <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-primary transition-all duration-500 group-hover:w-full"></span>
              </a>
            ))}
            <button
              onClick={onBookClick}
              className="btn-premium bg-primary text-on-primary px-7 py-3 text-[11px] font-semibold tracking-[0.2em] uppercase rounded-sm cursor-pointer"
            >
              Book Appointment
            </button>
          </div>
        ) : (
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-primary p-2 focus:outline-none"
          >
            <span className="material-symbols-outlined text-3xl">{isOpen ? "close" : "menu"}</span>
          </button>
        )}
      </div>

      {isMobile && isOpen && (
        <div className="absolute top-full left-0 w-full bg-surface border-t border-outline-variant/20 px-6 py-8 flex flex-col gap-4 shadow-2xl animate-slide-up z-50">
          {[
            { href: "#services", label: "Services" },
            { href: "#meet-the-doctor", label: "Meet the Doctor" },
            { href: "#why-fennel", label: "Why Fennel" },
            { href: "#voices", label: "Patient Voices" },
            { href: "#location", label: "Contact" },
          ].map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="font-body text-sm font-semibold uppercase tracking-wider text-on-surface hover:text-primary transition-colors border-b border-outline-variant/10 pb-3"
            >
              {link.label}
            </a>
          ))}
          <button
            onClick={() => {
              setIsOpen(false);
              onBookClick();
            }}
            className="btn-premium bg-primary text-on-primary w-full py-3.5 text-xs font-semibold tracking-widest uppercase mt-2 cursor-pointer"
          >
            Book an Appointment
          </button>
        </div>
      )}
    </nav>
  );
}
