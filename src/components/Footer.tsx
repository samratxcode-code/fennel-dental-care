export default function Footer() {
  return (
    <footer className="bg-surface-container py-16 border-t border-outline-variant/20">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-12 px-6 md:px-16 max-w-[1280px] mx-auto">
        <div className="md:col-span-2">
          <div className="font-display text-2xl text-primary font-bold mb-6 italic">
            Fennel Dental Care
          </div>
          <p className="text-on-surface-variant max-w-sm mb-8 font-body">
            Redefining modern dentistry through a lens of calm, expertise, and personalized attention.
          </p>
          <p className="font-body text-sm text-secondary">
            © {new Date().getFullYear()} Fennel Dental Care. Sector 92, Noida. Closes 8:30 PM.
          </p>
        </div>
        <div>
          <p className="font-body text-xs font-semibold tracking-wider uppercase text-primary mb-6">
            Quick Links
          </p>
          <ul className="space-y-4 font-body">
            <li>
              <a href="#services" className="text-on-surface-variant hover:text-primary transition-colors">
                Services
              </a>
            </li>
            <li>
              <a href="#meet-the-doctor" className="text-on-surface-variant hover:text-primary transition-colors">
                Meet the Doctor
              </a>
            </li>
            <li>
              <a href="#why-fennel" className="text-on-surface-variant hover:text-primary transition-colors">
                Why Fennel
              </a>
            </li>
            <li>
              <a href="#voices" className="text-on-surface-variant hover:text-primary transition-colors">
                Patient Voices
              </a>
            </li>
          </ul>
        </div>
        <div>
          <p className="font-body text-xs font-semibold tracking-wider uppercase text-primary mb-6">
            Reach Us
          </p>
          <ul className="space-y-4 font-body">
            <li>
              <a href="tel:09667071984" className="text-on-surface-variant hover:text-primary transition-colors">
                096670 71984
              </a>
            </li>
            <li>
              <span className="text-on-surface-variant block">
                House No. A-5, Block A,<br />Sector 92, Noida, UP
              </span>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
