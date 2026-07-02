"use client";

import { useState } from "react";
import { useDevice } from "@/hooks/useDevice";
import Link from "next/link";

interface NavbarProps {
  onBookClick: () => void;
}

export default function Navbar({ onBookClick }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { isMobile } = useDevice();

  return (
    <nav className="fixed top-0 w-full z-50 bg-surface/80 backdrop-blur-md border-b border-outline-variant/20">
      <div className="flex justify-between items-center px-6 md:px-12 py-4 max-w-[1440px] mx-auto">
        <a href="#" className="font-display text-2xl font-bold text-primary italic">
          Fennel Dental Care
        </a>

        {/* Adaptive Layout Rendering */}
        {!isMobile ? (
          /* Desktop Layout */
          <div className="flex gap-10 items-center">
            <a
              href="#services"
              className="font-body text-sm uppercase tracking-wider text-on-surface-variant hover:text-primary transition-colors duration-300"
            >
              Services
            </a>
            <a
              href="#meet-the-doctor"
              className="font-body text-sm uppercase tracking-wider text-on-surface-variant hover:text-primary transition-colors duration-300"
            >
              Meet the Doctor
            </a>
            <a
              href="#why-fennel"
              className="font-body text-sm uppercase tracking-wider text-on-surface-variant hover:text-primary transition-colors duration-300"
            >
              Why Fennel
            </a>
            <a
              href="#voices"
              className="font-body text-sm uppercase tracking-wider text-on-surface-variant hover:text-primary transition-colors duration-300"
            >
              Patient Voices
            </a>
            <a
              href="#location"
              className="font-body text-sm uppercase tracking-wider text-on-surface-variant hover:text-primary transition-colors duration-300"
            >
              Contact
            </a>
            <button
              onClick={onBookClick}
              className="bg-primary text-on-primary px-6 py-2.5 text-xs font-semibold tracking-widest uppercase hover:bg-primary/95 transition-all active:scale-95 cursor-pointer"
            >
              Book an Appointment
            </button>
          </div>
        ) : (
          /* Mobile Toggle Button */
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-primary p-2 focus:outline-none"
          >
            <span className="material-symbols-outlined">{isOpen ? "close" : "menu"}</span>
          </button>
        )}
      </div>

      {/* Mobile Drawer (Only rendered on mobile when open) */}
      {isMobile && isOpen && (
        <div className="absolute top-full left-0 w-full bg-surface border-b border-outline-variant/30 px-6 py-8 flex flex-col gap-6 shadow-xl animate-fade-in">
          <a
            href="#services"
            onClick={() => setIsOpen(false)}
            className="font-body text-lg uppercase tracking-wider text-on-surface-variant hover:text-primary transition-colors"
          >
            Services
          </a>
          <a
            href="#meet-the-doctor"
            onClick={() => setIsOpen(false)}
            className="font-body text-lg uppercase tracking-wider text-on-surface-variant hover:text-primary transition-colors"
          >
            Meet the Doctor
          </a>
          <a
            href="#why-fennel"
            onClick={() => setIsOpen(false)}
            className="font-body text-lg uppercase tracking-wider text-on-surface-variant hover:text-primary transition-colors"
          >
            Why Fennel
          </a>
          <a
            href="#voices"
            onClick={() => setIsOpen(false)}
            className="font-body text-lg uppercase tracking-wider text-on-surface-variant hover:text-primary transition-colors"
          >
            Patient Voices
          </a>
          <a
            href="#location"
            onClick={() => setIsOpen(false)}
            className="font-body text-lg uppercase tracking-wider text-on-surface-variant hover:text-primary transition-colors"
          >
            Contact
          </a>
          <button
            onClick={() => {
              setIsOpen(false);
              onBookClick();
            }}
            className="bg-primary text-on-primary w-full py-4 text-sm font-semibold tracking-widest uppercase hover:bg-primary/95 transition-all active:scale-95"
          >
            Book an Appointment
          </button>
        </div>
      )}
    </nav>
  );
}
