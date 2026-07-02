export default function Footer() {
  return (
    <footer className="bg-surface-container/50 border-t border-outline-variant/10 relative overflow-hidden">
      {/* Gold line at top */}
      <div className="gold-line"></div>

      <div className="py-20 px-6 md:px-12 max-w-[1440px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          {/* Brand */}
          <div className="md:col-span-5">
            <div className="flex items-center gap-3 mb-6">
              <span className="material-symbols-outlined text-2xl text-secondary/50" style={{ fontVariationSettings: '"FILL" 1' }}>eco</span>
              <span className="font-display text-2xl text-primary font-bold italic">Fennel Dental Care</span>
            </div>
            <p className="text-on-surface-variant max-w-sm mb-8 font-body text-sm leading-[1.8]">
              Redefining modern dentistry through a lens of calm, expertise, and personalized attention. Every visit is a moment of care.
            </p>
            <div className="gold-line w-16 mb-6"></div>
            <p className="font-body text-xs text-on-surface-variant/60">
              © {new Date().getFullYear()} Fennel Dental Care. Sector 92, Noida.
            </p>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3 md:col-start-7">
            <p className="font-body text-[10px] font-bold tracking-[0.25em] uppercase text-primary mb-8">
              Quick Links
            </p>
            <ul className="space-y-4 font-body text-sm">
              {[
                { href: "#services", label: "Services" },
                { href: "#meet-the-doctor", label: "Meet the Doctor" },
                { href: "#why-fennel", label: "Why Fennel" },
                { href: "#voices", label: "Patient Voices" },
              ].map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="text-on-surface-variant hover:text-primary transition-colors duration-300 group flex items-center gap-2">
                    <span className="w-0 h-[1px] bg-primary group-hover:w-3 transition-all duration-300"></span>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="md:col-span-3">
            <p className="font-body text-[10px] font-bold tracking-[0.25em] uppercase text-primary mb-8">
              Reach Us
            </p>
            <ul className="space-y-4 font-body text-sm">
              <li>
                <a href="tel:09667071984" className="text-on-surface-variant hover:text-primary transition-colors duration-300 flex items-center gap-3">
                  <span className="material-symbols-outlined text-base text-primary/50">call</span>
                  096670 71984
                </a>
              </li>
              <li>
                <a href="https://maps.app.goo.gl/Lwr8unc5usQHiNRS8" target="_blank" rel="noopener noreferrer" className="text-on-surface-variant hover:text-primary transition-colors duration-300 flex items-center gap-3">
                  <span className="material-symbols-outlined text-base text-primary/50">location_on</span>
                  Sector 92, Noida
                </a>
              </li>
              <li className="text-on-surface-variant flex items-center gap-3">
                <span className="material-symbols-outlined text-base text-primary/50">schedule</span>
                Open Daily until 8:30 PM
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
