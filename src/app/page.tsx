"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BookingModal from "@/components/BookingModal";

interface Review {
  name: string;
  treatment: string;
  comment: string;
  rating: number;
  date: string;
}

const PRESET_REVIEWS: Review[] = [
  {
    name: "Preeti Malhotra",
    treatment: "Patient since 2023",
    comment: "I was amazed by how attentive Dr. Rajat was. The clinic is beautiful, and the service was incredibly affordable compared to others in Noida.",
    rating: 5,
    date: "2024"
  },
  {
    name: "Aman Verma",
    treatment: "Emergency RCT",
    comment: "I’ve always been terrified of root canals. At Fennel, I literally felt nothing. The behavior of the staff is so gentle and reassuring.",
    rating: 5,
    date: "2024"
  },
  {
    name: "Sarah Khan",
    treatment: "Orthodontic Treatment",
    comment: "Finally found an orthodontist I can trust. Dr. Rajat explained everything about my braces journey so clearly. Truly a Gold Medalist expert.",
    rating: 5,
    date: "2024"
  }
];

export default function Home() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [bookingPreset, setBookingPreset] = useState("");
  const [reviews, setReviews] = useState<Review[]>(PRESET_REVIEWS);

  // Review Form state
  const [newReviewName, setNewReviewName] = useState("");
  const [newReviewTreatment, setNewReviewTreatment] = useState("");
  const [newReviewComment, setNewReviewComment] = useState("");
  const [newReviewRating, setNewReviewRating] = useState(5);
  const [showReviewForm, setShowReviewForm] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("fennel_reviews");
    if (saved) {
      setReviews(JSON.parse(saved));
    }
  }, []);

  const openBooking = (presetService = "") => {
    setBookingPreset(presetService);
    setIsBookingOpen(true);
  };

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReviewName || !newReviewComment || !newReviewTreatment) {
      alert("Please fill all review fields.");
      return;
    }

    const reviewItem: Review = {
      name: newReviewName,
      treatment: newReviewTreatment,
      comment: newReviewComment,
      rating: newReviewRating,
      date: "Just now"
    };

    const updated = [reviewItem, ...reviews];
    setReviews(updated);
    localStorage.setItem("fennel_reviews", JSON.stringify(updated));

    // Reset Review fields
    setNewReviewName("");
    setNewReviewTreatment("");
    setNewReviewComment("");
    setNewReviewRating(5);
    setShowReviewForm(false);
  };

  return (
    <>
      <Navbar onBookClick={() => openBooking("")} />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center pt-28 overflow-hidden fennel-frond-bg pb-12 md:pb-0">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 grid md:grid-cols-12 gap-8 items-center">
          <div className="md:col-span-6 z-20">
            <div className="flex items-center gap-2 mb-6 animate-fade-in">
              <div className="flex text-[#FFD700]">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="material-symbols-outlined select-none" style={{ fontVariationSettings: '"FILL" 1' }}>
                    star
                  </span>
                ))}
              </div>
              <span className="font-body text-xs font-semibold uppercase tracking-wider text-on-surface-variant">
                4.9★ / 288+ Reviews
              </span>
            </div>
            <h1 className="font-display text-4xl md:text-6xl text-secondary mb-8 leading-tight italic font-medium">
              Painless dentistry,<br />personally delivered.
            </h1>
            <p className="font-body text-lg text-on-surface-variant max-w-md mb-10 leading-relaxed">
              Experience boutique dental care where your comfort is our priority. We blend expert precision with a warm, editorial aesthetic to make every visit a moment of calm.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => openBooking("")}
                className="bg-primary text-on-primary px-8 py-4 font-body text-xs font-semibold tracking-wider uppercase hover:bg-primary/95 transition-all shadow-md active:scale-98 cursor-pointer"
              >
                Book an Appointment
              </button>
              <a
                href="tel:09667071984"
                className="border border-secondary text-secondary px-8 py-4 font-body text-xs font-semibold tracking-wider uppercase hover:bg-secondary hover:text-on-secondary transition-colors text-center"
              >
                Call 096670 71984
              </a>
            </div>
          </div>

          <div className="md:col-span-6 relative mt-12 md:mt-0">
            <div className="absolute -right-20 -top-20 opacity-20 w-80 h-80 pointer-events-none text-secondary">
              <span className="material-symbols-outlined text-[300px]">eco</span>
            </div>
            <div className="rounded-3xl overflow-hidden aspect-[4/5] bg-surface-container shadow-2xl relative z-10 border border-outline-variant/20">
              <img
                className="w-full h-full object-cover object-left"
                alt="Dr. Rajat Singh inside Fennel Dental Care clinic"
                src="/hero-dentist.jpg"
              />
            </div>
            <div className="absolute -bottom-10 -left-10 bg-surface-container-high p-8 border border-outline-variant/30 hidden lg:block z-30 shadow-xl max-w-xs">
              <p className="font-display text-lg italic text-secondary font-medium">
                "A sensory retreat from traditional clinics."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Bar */}
      <section className="bg-surface-container py-12 border-y border-outline-variant/10">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 flex flex-wrap justify-between items-center gap-10">
          <div className="flex flex-col">
            <span className="font-body text-xs font-semibold uppercase tracking-wider text-on-surface-variant opacity-60 mb-2">
              Google Rating
            </span>
            <span className="font-display text-3xl text-primary font-bold italic">4.9 Stars</span>
          </div>
          <div className="h-10 w-[1px] bg-outline-variant hidden md:block"></div>
          <div className="flex flex-col">
            <span className="font-body text-xs font-semibold uppercase tracking-wider text-on-surface-variant opacity-60 mb-2">
              Community Trust
            </span>
            <span className="font-display text-3xl text-primary font-bold italic">288+ Happy Patients</span>
          </div>
          <div className="h-10 w-[1px] bg-outline-variant hidden md:block"></div>
          <div className="flex flex-col">
            <span className="font-body text-xs font-semibold uppercase tracking-wider text-on-surface-variant opacity-60 mb-2">
              Expertise
            </span>
            <span className="font-display text-3xl text-primary font-bold italic">Gold Medalist Orthodontist</span>
          </div>
        </div>
      </section>

      {/* Meet the Doctor */}
      <section id="meet-the-doctor" className="py-24 overflow-hidden">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12">
          <div className="grid md:grid-cols-12 gap-12 items-center">
            <div className="md:col-span-5 order-2 md:order-1">
              <div className="relative">
                <div className="absolute -left-6 bottom-0 bg-secondary w-full h-full -z-10 opacity-10 rounded"></div>
                <img
                  className="w-full grayscale hover:grayscale-0 transition-all duration-700 rounded shadow-md"
                  alt="Dr. Rajat Singh and Sakshi smiling inside the clinic"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuByZciNLTgB55IKl9LGKWlf0rnZrgUF-XPBJS8v8sIUNnAIfE-jrOgiCgcEnTd8azsOVDun6yjXku2mJ-MZRFyZWUDNczL4zgwtRqcxBU-Q1Uf9b4ZVgWe5cf-sd0vATsEkp3ICb6_aZY6kFeFCHKQdhqcaVDORH1Vm-boW0VE585kP_KvaSwWKRXFPUucATStzJ0kanKbGKeE1oTorzo67egh7xq8ES8OhDe-wYJUctcsfa-U_GPFsEg"
                />
              </div>
            </div>
            <div className="md:col-span-6 md:col-start-7 order-1 md:order-2 mb-12 md:mb-0">
              <span className="font-body text-xs font-semibold uppercase tracking-wider text-primary mb-4 block">
                Our Heart & Soul
              </span>
              <h2 className="font-display text-3xl md:text-4xl text-secondary mb-6 italic font-medium leading-tight">
                Expert Hands, Empathetic Hearts.
              </h2>
              <p className="font-body text-lg text-on-surface-variant mb-6 leading-relaxed">
                Led by <strong className="text-secondary font-semibold">Dr. Rajat Singh (BDS, MDS)</strong>, a Gold Medalist Orthodontist, our clinic is built on the philosophy that dental care should be as gentle as it is professional.
              </p>
              <p className="font-body text-md text-on-surface opacity-80 mb-8 leading-relaxed">
                Accompanied by Sakshi, our patient advocate, we ensure every visitor feels heard, respected, and relaxed. We don't just treat teeth; we care for the person behind the smile, especially prioritizing a calm experience for our elderly guests and nervous first-timers.
              </p>
              <div className="flex gap-8 border-t border-outline-variant/20 pt-6">
                <div>
                  <p className="font-body text-xs font-semibold uppercase tracking-wider text-primary">
                    Dr. Rajat Singh
                  </p>
                  <p className="text-on-surface-variant italic text-sm">Lead Orthodontist</p>
                </div>
                <div>
                  <p className="font-body text-xs font-semibold tracking-wider uppercase text-primary">
                    Sakshi
                  </p>
                  <p className="text-on-surface-variant italic text-sm">Patient Experience</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-24 bg-surface-container-low border-y border-outline-variant/15 relative">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16">
            <div className="max-w-xl">
              <span className="font-body text-xs font-semibold uppercase tracking-wider text-primary mb-4 block">
                Our Specialties
              </span>
              <h2 className="font-display text-3xl md:text-4xl text-secondary italic font-medium">
                Care tailored for every lifecycle.
              </h2>
            </div>
            <button
              onClick={() => openBooking("")}
              className="mt-4 md:mt-0 font-body text-xs font-semibold uppercase tracking-wider border-b border-primary text-primary pb-1 hover:opacity-85 cursor-pointer"
            >
              Request Custom Consultation
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Service 1 */}
            <div
              onClick={() => openBooking("Orthodontics")}
              className="p-8 md:p-10 border border-outline-variant/30 hover:bg-surface transition-all duration-300 group cursor-pointer"
            >
              <span className="material-symbols-outlined text-4xl text-secondary mb-6 group-hover:scale-110 transition-transform block">
                orthopedics
              </span>
              <h3 className="font-display text-xl text-secondary mb-4 italic font-semibold">Orthodontics</h3>
              <p className="font-body text-sm text-on-surface-variant mb-6 leading-relaxed">
                Expert alignment by our Gold Medalist specialist to restore both function and aesthetics to your smile.
              </p>
              <span className="material-symbols-outlined text-primary group-hover:translate-x-2 transition-transform">
                arrow_forward
              </span>
            </div>

            {/* Service 2 */}
            <div
              onClick={() => openBooking("Root Canal Treatment")}
              className="p-8 md:p-10 border border-outline-variant/30 hover:bg-surface transition-all duration-300 group cursor-pointer"
            >
              <span className="material-symbols-outlined text-4xl text-secondary mb-6 group-hover:scale-110 transition-transform block">
                healing
              </span>
              <h3 className="font-display text-xl text-secondary mb-4 italic font-semibold">Root Canal Treatment</h3>
              <p className="font-body text-sm text-on-surface-variant mb-6 leading-relaxed">
                Advanced endodontic care focused on saving your natural teeth with minimal discomfort and precision.
              </p>
              <span className="material-symbols-outlined text-primary group-hover:translate-x-2 transition-transform">
                arrow_forward
              </span>
            </div>

            {/* Service 3 */}
            <div
              onClick={() => openBooking("Dental Implants")}
              className="p-8 md:p-10 border border-outline-variant/30 hover:bg-surface transition-all duration-300 group cursor-pointer"
            >
              <span className="material-symbols-outlined text-4xl text-secondary mb-6 group-hover:scale-110 transition-transform block">
                dentistry
              </span>
              <h3 className="font-display text-xl text-secondary mb-4 italic font-semibold">Dental Implants</h3>
              <p className="font-body text-sm text-on-surface-variant mb-6 leading-relaxed">
                Permanent solutions for missing teeth using the highest grade materials for a natural look and feel.
              </p>
              <span className="material-symbols-outlined text-primary group-hover:translate-x-2 transition-transform">
                arrow_forward
              </span>
            </div>

            {/* Service 4 */}
            <div
              onClick={() => openBooking("Painless Extractions")}
              className="p-8 md:p-10 border border-outline-variant/30 hover:bg-surface transition-all duration-300 group cursor-pointer"
            >
              <span className="material-symbols-outlined text-4xl text-secondary mb-6 group-hover:scale-110 transition-transform block">
                masks
              </span>
              <h3 className="font-display text-xl text-secondary mb-4 italic font-semibold">Painless Extractions</h3>
              <p className="font-body text-sm text-on-surface-variant mb-6 leading-relaxed">
                Gentle wisdom tooth removal and extractions performed with topical numbing and meticulous technique.
              </p>
              <span className="material-symbols-outlined text-primary group-hover:translate-x-2 transition-transform">
                arrow_forward
              </span>
            </div>

            {/* Service 5 */}
            <div
              onClick={() => openBooking("Crowns & Capping")}
              className="p-8 md:p-10 border border-outline-variant/30 hover:bg-surface transition-all duration-300 group cursor-pointer"
            >
              <span className="material-symbols-outlined text-4xl text-secondary mb-6 group-hover:scale-110 transition-transform block">
                verified
              </span>
              <h3 className="font-display text-xl text-secondary mb-4 italic font-semibold">Crowns & Capping</h3>
              <p className="font-body text-sm text-on-surface-variant mb-6 leading-relaxed">
                Custom-milled porcelain crowns that protect your teeth while matching the exact shade of your smile.
              </p>
              <span className="material-symbols-outlined text-primary group-hover:translate-x-2 transition-transform">
                arrow_forward
              </span>
            </div>

            {/* Painless Approach */}
            <div
              onClick={() => openBooking("General Consultation")}
              className="p-8 md:p-10 bg-secondary border border-secondary text-surface hover:opacity-95 transition-all duration-300 group cursor-pointer"
            >
              <span className="material-symbols-outlined text-4xl text-surface mb-6 block">spa</span>
              <h3 className="font-display text-xl text-surface mb-4 italic font-semibold">Painless Approach</h3>
              <p className="font-body text-sm text-surface/80 mb-6 leading-relaxed">
                Our signature philosophy: every procedure is designed to maximize comfort and eliminate dental anxiety.
              </p>
              <div className="flex items-center gap-2 text-surface text-xs font-semibold tracking-wider uppercase">
                <span>Book Now</span>
                <span className="material-symbols-outlined text-sm">check_circle</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Fennel */}
      <section id="why-fennel" className="py-24">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 grid md:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <img
              className="w-full rounded shadow-xl"
              alt="Artistic view of dental instruments resting on a textured sage green background"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBezzkvxf5npvzk6SDfDt3ofT852oN5aLXqn_tq5jJZdubv6upOikzBugM7KpBxWYFBKBrXxXNlTmeUq-Flbj9eHMK110ViR97-KOhD-9Zb688fiaA0eEZ3x_7dRgrPLxUQcPkBXYUEnkxsMOVdrRgQVyzan4XoxQowNm2lb_mnlEMq2RUSz7g-6s7vuj6u1VPROSsXTcLdw9x0n8P_4ICh_jqQlGG8Pbxst2WXbL4Cu3OBlJ8W7FsDFg"
            />
            <div className="absolute inset-0 border-[20px] border-surface translate-x-6 translate-y-6 -z-10 rounded"></div>
          </div>
          <div>
            <h2 className="font-display text-3xl md:text-4xl text-secondary mb-10 italic font-semibold">
              Why patients trust Fennel.
            </h2>
            <ul className="space-y-8">
              <li className="flex gap-6">
                <span className="material-symbols-outlined text-primary text-3xl select-none" style={{ fontVariationSettings: '"FILL" 1' }}>
                  eco
                </span>
                <div>
                  <h4 className="font-display text-lg text-on-surface mb-2 font-semibold italic">Uncompromising Hygiene</h4>
                  <p className="font-body text-sm text-on-surface-variant leading-relaxed">
                    We follow gold-standard sterilization protocols that exceed industry requirements, ensuring your safety at every step.
                  </p>
                </div>
              </li>
              <li className="flex gap-6">
                <span className="material-symbols-outlined text-primary text-3xl select-none" style={{ fontVariationSettings: '"FILL" 1' }}>
                  psychology
                </span>
                <div>
                  <h4 className="font-display text-lg text-on-surface mb-2 font-semibold italic">Clear Explanations</h4>
                  <p className="font-body text-sm text-on-surface-variant leading-relaxed">
                    We use visual aids and clear language so you understand your treatment plan before we ever begin.
                  </p>
                </div>
              </li>
              <li className="flex gap-6">
                <span className="material-symbols-outlined text-primary text-3xl select-none" style={{ fontVariationSettings: '"FILL" 1' }}>
                  family_restroom
                </span>
                <div>
                  <h4 className="font-display text-lg text-on-surface mb-2 font-semibold italic">Care for All Generations</h4>
                  <p className="font-body text-sm text-on-surface-variant leading-relaxed">
                    From playful visits for children to dedicated, slow-paced care for elderly patients, our doors are open to all.
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Patient Voices (with dynamic local review additions) */}
      <section id="voices" className="py-24 bg-surface-container overflow-hidden">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 text-center mb-12">
          <span className="font-body text-xs font-semibold tracking-wider uppercase text-primary mb-4 block">
            Kind Words
          </span>
          <h2 className="font-display text-3xl md:text-4xl text-secondary italic font-semibold">
            Voices of our community
          </h2>
        </div>

        {/* Carousel / Reviews List */}
        <div className="flex gap-6 px-6 md:px-12 overflow-x-auto pb-8 snap-x no-scrollbar max-w-[1440px] mx-auto">
          {reviews.map((r, i) => (
            <div
              key={i}
              className="min-w-[300px] md:min-w-[400px] bg-surface p-8 md:p-12 snap-center border border-outline-variant/10 shadow-sm"
            >
              <span className="material-symbols-outlined text-primary text-4xl mb-4 select-none">
                format_quote
              </span>
              <p className="font-body text-base text-on-surface italic mb-6 leading-relaxed">
                "{r.comment}"
              </p>
              <div className="flex justify-between items-end border-t border-outline-variant/20 pt-4">
                <div>
                  <p className="font-body text-xs font-bold uppercase tracking-wider text-secondary">
                    {r.name}
                  </p>
                  <p className="text-on-surface-variant text-xs italic">{r.treatment}</p>
                </div>
                <div className="flex text-[#FFD700] text-xs">
                  {[...Array(r.rating)].map((_, index) => (
                    <span key={index} className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: '"FILL" 1' }}>
                      star
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Add Review section */}
        <div className="max-w-md mx-auto px-6 mt-8 text-center">
          {!showReviewForm ? (
            <button
              onClick={() => setShowReviewForm(true)}
              className="border border-primary text-primary px-6 py-2.5 text-xs font-semibold tracking-wider uppercase hover:bg-primary hover:text-on-primary transition-all cursor-pointer"
            >
              Write a Review
            </button>
          ) : (
            <form onSubmit={handleAddReview} className="bg-surface p-6 border border-outline-variant/20 rounded shadow-md text-left space-y-4 font-body">
              <h4 className="font-display text-base text-secondary font-semibold italic">Share Your Experience</h4>
              
              <div>
                <label className="block text-[11px] font-semibold text-primary uppercase">Your Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Priyanjali S."
                  value={newReviewName}
                  onChange={(e) => setNewReviewName(e.target.value)}
                  className="w-full p-2.5 bg-surface border border-outline-variant/30 text-sm outline-none focus:border-secondary transition-colors"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-primary uppercase">Treatment Received</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Teeth Whitening"
                  value={newReviewTreatment}
                  onChange={(e) => setNewReviewTreatment(e.target.value)}
                  className="w-full p-2.5 bg-surface border border-outline-variant/30 text-sm outline-none focus:border-secondary transition-colors"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-primary uppercase">Rating</label>
                <select
                  value={newReviewRating}
                  onChange={(e) => setNewReviewRating(parseInt(e.target.value))}
                  className="w-full p-2.5 bg-surface border border-outline-variant/30 text-sm outline-none focus:border-secondary transition-colors"
                >
                  <option value={5}>5 Stars - Painless & Peaceful</option>
                  <option value={4}>4 Stars - Very Good</option>
                  <option value={3}>3 Stars - Good</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-primary uppercase">Your Feedback</label>
                <textarea
                  rows={3}
                  required
                  placeholder="How did you feel? Was the procedure gentle?"
                  value={newReviewComment}
                  onChange={(e) => setNewReviewComment(e.target.value)}
                  className="w-full p-2.5 bg-surface border border-outline-variant/30 text-sm outline-none focus:border-secondary transition-colors resize-none"
                />
              </div>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setShowReviewForm(false)}
                  className="w-1/3 border border-secondary text-secondary py-2 text-xs uppercase font-semibold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="w-2/3 bg-primary text-on-primary py-2 text-xs uppercase font-semibold hover:bg-primary/95 transition-all cursor-pointer"
                >
                  Submit Review
                </button>
              </div>
            </form>
          )}
        </div>
      </section>

      {/* Location & Hours */}
      <section id="location" className="py-24">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 grid md:grid-cols-12 gap-12">
          <div className="md:col-span-4 mb-8 md:mb-0">
            <h2 className="font-display text-3xl text-secondary mb-8 font-semibold italic">
              Visit us in<br />Sector 92.
            </h2>
            <div className="space-y-6 font-body text-sm">
              <div>
                <p className="font-semibold uppercase tracking-wider text-primary mb-2 text-xs">
                  Location
                </p>
                <p className="text-on-surface-variant leading-relaxed">
                  House No. A-5, Block A,<br />Sector 92, Noida, UP
                </p>
              </div>
              <div>
                <p className="font-semibold uppercase tracking-wider text-primary mb-2 text-xs">
                  Daily Hours
                </p>
                <p className="text-on-surface-variant">Open Daily until 8:30 PM</p>
              </div>
              <div className="pt-4 flex flex-col gap-4">
                <a
                  href="https://maps.google.com/?q=Sector+92+Noida"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-primary text-on-primary px-6 py-3 font-semibold text-xs tracking-wider uppercase inline-flex items-center justify-center gap-2 hover:bg-primary/95 transition-colors shadow-sm"
                >
                  <span className="material-symbols-outlined text-base">near_me</span>
                  Get Directions
                </a>
                <a href="tel:09667071984" className="text-secondary font-bold hover:underline text-center">
                  096670 71984
                </a>
              </div>
            </div>
          </div>
          <div className="md:col-span-8 h-[450px] relative overflow-hidden grayscale contrast-125 rounded shadow-lg">
            <div className="absolute inset-0 bg-secondary/10 pointer-events-none z-10"></div>
            <img
              className="w-full h-full object-cover"
              alt="Sector 92 Noida local area view"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDh6lmb_T_dJbTza2TBFMEpQDc31-lGpXF7l6vAVrJHA3eMIn0plTlqkOc2ZLbp9tqNJTSTCRXEsQvYkIbDJCAxvVieYTWwO_D0o3OKmAh-ayltkBYKMx6l1RyLJJNhcZ6WdvNQCiQ3HIAhLZnwJeyxMrvYwCuHqrOdc8rWIyu2t2BvzS6liGOwXRE2GeSF_BqBOUbCBYI7dEJsIKAhRWyRe0FdhOKTF29bM7vBZiHYt_MCtpSC7yutow"
            />
          </div>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="py-24 text-center relative overflow-hidden bg-surface-container-highest/20 border-t border-outline-variant/10">
        <div className="max-w-3xl mx-auto px-6">
          <span className="material-symbols-outlined text-6xl text-primary mb-8 select-none">
            calendar_month
          </span>
          <h2 className="font-display text-3xl md:text-5xl text-secondary mb-8 italic font-semibold leading-tight">
            Ready for a different kind of dental experience?
          </h2>
          <p className="font-body text-base md:text-lg text-on-surface-variant mb-10 leading-relaxed max-w-xl mx-auto">
            Join hundreds of Noida patients who have discovered the Fennel way. Book your consultation today and take the first step towards a healthier, pain-free smile.
          </p>
          <button
            onClick={() => openBooking("")}
            className="bg-primary text-on-primary px-12 py-5 font-body text-xs font-semibold tracking-wider uppercase shadow-xl hover:scale-105 transition-transform active:scale-98 cursor-pointer"
          >
            Secure Your Appointment
          </button>
        </div>
      </section>

      <Footer />

      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        selectedServicePreset={bookingPreset}
      />
    </>
  );
}
