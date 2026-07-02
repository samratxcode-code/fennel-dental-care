"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BookingModal from "@/components/BookingModal";
import AnimatedCounter from "@/components/AnimatedCounter";
import { useDevice } from "@/hooks/useDevice";
import { useScrollReveal } from "@/hooks/useScrollReveal";

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
    comment: "I've always been terrified of root canals. At Fennel, I literally felt nothing. The behavior of the staff is so gentle and reassuring.",
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

const SERVICES = [
  { icon: "orthopedics", title: "Orthodontics", desc: "Expert alignment by our Gold Medalist specialist to restore both function and aesthetics to your smile.", preset: "Orthodontics" },
  { icon: "healing", title: "Root Canal Treatment", desc: "Advanced endodontic care focused on saving your natural teeth with minimal discomfort and precision.", preset: "Root Canal Treatment" },
  { icon: "dentistry", title: "Dental Implants", desc: "Permanent solutions for missing teeth using the highest grade materials for a natural look and feel.", preset: "Dental Implants" },
  { icon: "masks", title: "Painless Extractions", desc: "Gentle wisdom tooth removal and extractions performed with topical numbing and meticulous technique.", preset: "Painless Extractions" },
  { icon: "verified", title: "Crowns & Capping", desc: "Custom-milled porcelain crowns that protect your teeth while matching the exact shade of your smile.", preset: "Crowns & Capping" },
];

export default function Home() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [bookingPreset, setBookingPreset] = useState("");
  const [reviews, setReviews] = useState<Review[]>(PRESET_REVIEWS);
  const { isMobile, isDesktop } = useDevice();
  useScrollReveal();

  const [newReviewName, setNewReviewName] = useState("");
  const [newReviewTreatment, setNewReviewTreatment] = useState("");
  const [newReviewComment, setNewReviewComment] = useState("");
  const [newReviewRating, setNewReviewRating] = useState(5);
  const [showReviewForm, setShowReviewForm] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("fennel_reviews");
    if (saved) setReviews(JSON.parse(saved));
  }, []);

  const openBooking = (presetService = "") => {
    setBookingPreset(presetService);
    setIsBookingOpen(true);
  };

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReviewName || !newReviewComment || !newReviewTreatment) return;
    const reviewItem: Review = { name: newReviewName, treatment: newReviewTreatment, comment: newReviewComment, rating: newReviewRating, date: "Just now" };
    const updated = [reviewItem, ...reviews];
    setReviews(updated);
    localStorage.setItem("fennel_reviews", JSON.stringify(updated));
    setNewReviewName(""); setNewReviewTreatment(""); setNewReviewComment(""); setNewReviewRating(5); setShowReviewForm(false);
  };

  return (
    <>
      <Navbar onBookClick={() => openBooking("")} />

      {/* ═══════════ HERO SECTION ═══════════ */}
      <section className="relative min-h-screen flex items-center pt-24 overflow-hidden fennel-frond-bg">
        {/* Floating decorative orbs */}
        <div className="floating-orb absolute top-20 right-[10%] w-[400px] h-[400px] bg-secondary/15 -z-10"></div>
        <div className="floating-orb absolute bottom-10 left-[5%] w-[300px] h-[300px] bg-primary/10 -z-10" style={{ animationDelay: "3s" }}></div>

        <div className="max-w-[1440px] mx-auto px-6 md:px-12 grid md:grid-cols-12 gap-8 items-center w-full">
          <div className="md:col-span-6 z-20 py-12 md:py-0">
            {/* Rating badge */}
            <div className="reveal flex items-center gap-3 mb-8">
              <div className="flex items-center gap-1 bg-surface-container-lowest/80 glass px-4 py-2 rounded-full shadow-sm">
                <div className="flex text-[#FFD700]">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="material-symbols-outlined text-base select-none" style={{ fontVariationSettings: '"FILL" 1' }}>star</span>
                  ))}
                </div>
                <span className="font-body text-[11px] font-bold uppercase tracking-[0.15em] text-on-surface-variant ml-2">
                  4.9 / 288+ Reviews
                </span>
              </div>
            </div>

            {/* Hero heading */}
            <h1 className="reveal stagger-1 font-display text-4xl md:text-[72px] text-secondary mb-8 leading-[1.05] italic font-semibold tracking-tight">
              Painless<br />
              <span className="text-shimmer">dentistry,</span><br />
              <span className="text-on-surface-variant font-normal text-3xl md:text-5xl">personally delivered.</span>
            </h1>

            <div className="reveal stagger-2 gold-line w-24 mb-8"></div>

            <p className="reveal stagger-3 font-body text-base md:text-lg text-on-surface-variant max-w-lg mb-12 leading-[1.8]">
              Experience boutique dental care where your comfort is our priority. We blend expert precision with a warm, editorial aesthetic to make every visit a moment of calm.
            </p>

            <div className="reveal stagger-4 flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => openBooking("")}
                className="btn-premium bg-primary text-on-primary px-10 py-4.5 font-body text-[11px] font-semibold tracking-[0.2em] uppercase shadow-lg shadow-primary/20 cursor-pointer"
              >
                Book an Appointment
              </button>
              <a
                href="tel:09667071984"
                className="group border-2 border-secondary/30 text-secondary px-10 py-4 font-body text-[11px] font-semibold tracking-[0.2em] uppercase hover:bg-secondary hover:text-on-secondary hover:border-secondary transition-all duration-500 text-center"
              >
                <span className="group-hover:tracking-[0.3em] transition-all duration-500">Call 096670 71984</span>
              </a>
            </div>
          </div>

          {/* Hero Image */}
          <div className="md:col-span-6 relative mt-8 md:mt-0">
            {!isMobile && (
              <div className="absolute -right-16 -top-16 opacity-10 w-72 h-72 pointer-events-none text-secondary animate-float" style={{ animationDuration: "10s" }}>
                <span className="material-symbols-outlined text-[280px]">eco</span>
              </div>
            )}
            <div className="reveal-right rounded-2xl overflow-hidden aspect-[4/5] bg-surface-container shadow-2xl relative z-10 border border-outline-variant/15 img-reveal">
              <img
                className="w-full h-full object-cover object-left"
                alt="Dr. Rajat Singh inside Fennel Dental Care clinic"
                src="/hero-dentist.jpg"
              />
              {/* Premium gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-secondary/20 via-transparent to-transparent pointer-events-none"></div>
            </div>
            {isDesktop && (
              <div className="absolute -bottom-8 -left-8 glass-dark p-8 z-30 max-w-xs animate-slide-up rounded-lg" style={{ animationDelay: "0.8s" }}>
                <p className="font-display text-lg italic text-surface/90 font-medium leading-relaxed">
                  &ldquo;A sensory retreat from traditional clinics.&rdquo;
                </p>
                <div className="gold-line w-12 mt-4"></div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ═══════════ GOLD LINE DIVIDER ═══════════ */}
      <div className="gold-line mx-auto max-w-[1440px]"></div>

      {/* ═══════════ TRUST BAR ═══════════ */}
      <section className="bg-surface-container/60 glass py-16 border-y border-outline-variant/10">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-0">
          {/* Google Rating */}
          <div className="reveal stagger-1 flex flex-col items-center text-center group md:border-r md:border-outline-variant/20">
            <span
              className="material-symbols-outlined text-3xl text-primary/60 mb-3 group-hover:text-primary group-hover:scale-110 transition-all duration-500"
              style={{ fontVariationSettings: '"FILL" 1' }}
            >
              star
            </span>
            <span className="font-body text-[10px] font-bold uppercase tracking-[0.2em] text-on-surface-variant/50 mb-2">
              Google Rating
            </span>
            <span className="font-display text-2xl md:text-3xl text-primary font-bold italic counter-num">
              <AnimatedCounter end={4.9} decimals={1} duration={2200} />
              <span className="text-secondary text-lg md:text-xl font-normal"> Stars</span>
            </span>
          </div>

          {/* Community Trust */}
          <div className="reveal stagger-2 flex flex-col items-center text-center group md:border-r md:border-outline-variant/20">
            <span
              className="material-symbols-outlined text-3xl text-primary/60 mb-3 group-hover:text-primary group-hover:scale-110 transition-all duration-500"
              style={{ fontVariationSettings: '"FILL" 1' }}
            >
              groups
            </span>
            <span className="font-body text-[10px] font-bold uppercase tracking-[0.2em] text-on-surface-variant/50 mb-2">
              Community Trust
            </span>
            <span className="font-display text-2xl md:text-3xl text-primary font-bold italic counter-num">
              <AnimatedCounter end={288} suffix="+" duration={2500} />
              <span className="text-secondary text-lg md:text-xl font-normal"> Happy Patients</span>
            </span>
          </div>

          {/* Expertise */}
          <div className="reveal stagger-3 flex flex-col items-center text-center group">
            <span
              className="material-symbols-outlined text-3xl text-primary/60 mb-3 group-hover:text-primary group-hover:scale-110 transition-all duration-500"
              style={{ fontVariationSettings: '"FILL" 1' }}
            >
              workspace_premium
            </span>
            <span className="font-body text-[10px] font-bold uppercase tracking-[0.2em] text-on-surface-variant/50 mb-2">
              Expertise
            </span>
            <span className="font-display text-2xl md:text-3xl text-primary font-bold italic counter-num">
              Gold Medalist<span className="text-secondary text-lg md:text-xl font-normal"> Orthodontist</span>
            </span>
          </div>
        </div>
      </section>

      {/* ═══════════ MEET THE DOCTOR ═══════════ */}
      <section id="meet-the-doctor" className="py-28 md:py-36 overflow-hidden">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12">
          <div className="grid md:grid-cols-12 gap-16 items-center">
            <div className="md:col-span-5 order-2 md:order-1 reveal-left">
              <div className="relative img-reveal rounded-xl overflow-hidden shadow-2xl">
                <div className="absolute -left-4 -bottom-4 w-full h-full border-2 border-secondary/20 rounded-xl -z-10"></div>
                <img
                  className="w-full grayscale hover:grayscale-0 transition-all duration-1000"
                  alt="Dr. Rajat Singh and Sakshi smiling inside the clinic"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuByZciNLTgB55IKl9LGKWlf0rnZrgUF-XPBJS8v8sIUNnAIfE-jrOgiCgcEnTd8azsOVDun6yjXku2mJ-MZRFyZWUDNczL4zgwtRqcxBU-Q1Uf9b4ZVgWe5cf-sd0vATsEkp3ICb6_aZY6kFeFCHKQdhqcaVDORH1Vm-boW0VE585kP_KvaSwWKRXFPUucATStzJ0kanKbGKeE1oTorzo67egh7xq8ES8OhDe-wYJUctcsfa-U_GPFsEg"
                />
              </div>
            </div>
            <div className="md:col-span-6 md:col-start-7 order-1 md:order-2 mb-12 md:mb-0">
              <span className="reveal font-body text-[10px] font-bold uppercase tracking-[0.25em] text-primary mb-6 block">
                ✦ Our Heart & Soul
              </span>
              <h2 className="reveal stagger-1 font-display text-3xl md:text-5xl text-secondary mb-8 italic font-semibold leading-[1.1]">
                Expert Hands,<br />Empathetic Hearts.
              </h2>
              <div className="reveal stagger-2 gold-line w-16 mb-8"></div>
              <p className="reveal stagger-2 font-body text-base md:text-lg text-on-surface-variant mb-6 leading-[1.8]">
                Led by <strong className="text-secondary font-semibold">Dr. Rajat Singh (BDS, MDS)</strong>, a Gold Medalist Orthodontist, our clinic is built on the philosophy that dental care should be as gentle as it is professional.
              </p>
              <p className="reveal stagger-3 font-body text-sm text-on-surface/70 mb-10 leading-[1.8]">
                Accompanied by Sakshi, our patient advocate, we ensure every visitor feels heard, respected, and relaxed. We don&apos;t just treat teeth; we care for the person behind the smile.
              </p>
              <div className="reveal stagger-4 flex gap-10 border-t border-outline-variant/15 pt-8">
                <div className="group cursor-default">
                  <p className="font-body text-[10px] font-bold uppercase tracking-[0.2em] text-primary group-hover:tracking-[0.3em] transition-all duration-500">
                    Dr. Rajat Singh
                  </p>
                  <p className="text-on-surface-variant italic text-sm mt-1">Lead Orthodontist</p>
                </div>
                <div className="group cursor-default">
                  <p className="font-body text-[10px] font-bold tracking-[0.2em] uppercase text-primary group-hover:tracking-[0.3em] transition-all duration-500">
                    Sakshi
                  </p>
                  <p className="text-on-surface-variant italic text-sm mt-1">Patient Experience</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════ SERVICES ═══════════ */}
      <section id="services" className="py-28 md:py-36 bg-surface-container-low/50 relative overflow-hidden">
        <div className="floating-orb absolute -top-20 -right-20 w-[500px] h-[500px] bg-secondary/5 -z-10"></div>
        <div className="max-w-[1440px] mx-auto px-6 md:px-12">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-20 gap-6">
            <div className="max-w-xl">
              <span className="reveal font-body text-[10px] font-bold uppercase tracking-[0.25em] text-primary mb-6 block">
                ✦ Our Specialties
              </span>
              <h2 className="reveal stagger-1 font-display text-3xl md:text-5xl text-secondary italic font-semibold leading-[1.1]">
                Care tailored for<br />every lifecycle.
              </h2>
              <div className="reveal stagger-2 gold-line w-16 mt-6"></div>
            </div>
            <button
              onClick={() => openBooking("")}
              className="reveal stagger-3 group font-body text-[11px] font-semibold uppercase tracking-[0.2em] text-primary cursor-pointer flex items-center gap-2"
            >
              Request Consultation
              <span className="material-symbols-outlined text-base group-hover:translate-x-1 transition-transform duration-300">arrow_forward</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {SERVICES.map((s, i) => (
              <div
                key={s.title}
                onClick={() => openBooking(s.preset)}
                className={`reveal stagger-${i + 1} card-hover p-8 md:p-10 border border-outline-variant/15 bg-surface-container-lowest/50 hover:bg-surface-container-lowest transition-all duration-500 group cursor-pointer relative overflow-hidden`}
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/[0.03] rounded-full -translate-y-1/2 translate-x-1/2 group-hover:bg-primary/[0.06] transition-colors duration-700"></div>
                <span className="material-symbols-outlined text-4xl text-secondary/70 mb-6 group-hover:text-secondary group-hover:scale-110 transition-all duration-500 block relative z-10">
                  {s.icon}
                </span>
                <h3 className="font-display text-xl text-secondary mb-3 italic font-semibold relative z-10">{s.title}</h3>
                <p className="font-body text-[13px] text-on-surface-variant mb-6 leading-[1.8] relative z-10">{s.desc}</p>
                <span className="material-symbols-outlined text-primary opacity-0 group-hover:opacity-100 group-hover:translate-x-2 transition-all duration-500 relative z-10">
                  arrow_forward
                </span>
              </div>
            ))}

            {/* Painless Approach - Special card */}
            <div
              onClick={() => openBooking("General Consultation")}
              className="reveal stagger-6 card-hover p-8 md:p-10 bg-secondary text-surface border border-secondary hover:shadow-2xl hover:shadow-secondary/20 transition-all duration-500 group cursor-pointer relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-40 h-40 bg-surface/[0.05] rounded-full -translate-y-1/2 translate-x-1/2"></div>
              <span className="material-symbols-outlined text-4xl text-surface/80 mb-6 block animate-float" style={{ animationDuration: "4s" }}>spa</span>
              <h3 className="font-display text-xl text-surface mb-3 italic font-semibold">Painless Approach</h3>
              <p className="font-body text-[13px] text-surface/70 mb-6 leading-[1.8]">
                Our signature philosophy: every procedure is designed to maximize comfort and eliminate dental anxiety.
              </p>
              <div className="flex items-center gap-2 text-surface/90 text-[11px] font-semibold tracking-[0.15em] uppercase">
                <span>Book Now</span>
                <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: '"FILL" 1' }}>check_circle</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════ WHY FENNEL ═══════════ */}
      <section id="why-fennel" className="py-28 md:py-36">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 grid md:grid-cols-2 gap-20 items-center">
          <div className="relative reveal-left">
            <div className="img-reveal rounded-xl overflow-hidden shadow-2xl">
              <img
                className="w-full"
                alt="Artistic view of dental instruments"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBezzkvxf5npvzk6SDfDt3ofT852oN5aLXqn_tq5jJZdubv6upOikzBugM7KpBxWYFBKBrXxXNlTmeUq-Flbj9eHMK110ViR97-KOhD-9Zb688fiaA0eEZ3x_7dRgrPLxUQcPkBXYUEnkxsMOVdrRgQVyzan4XoxQowNm2lb_mnlEMq2RUSz7g-6s7vuj6u1VPROSsXTcLdw9x0n8P_4ICh_jqQlGG8Pbxst2WXbL4Cu3OBlJ8W7FsDFg"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 w-full h-full border-2 border-primary/10 rounded-xl -z-10"></div>
          </div>
          <div>
            <span className="reveal font-body text-[10px] font-bold uppercase tracking-[0.25em] text-primary mb-6 block">
              ✦ Our Promise
            </span>
            <h2 className="reveal stagger-1 font-display text-3xl md:text-5xl text-secondary mb-6 italic font-semibold leading-[1.1]">
              Why patients<br />trust Fennel.
            </h2>
            <div className="reveal stagger-2 gold-line w-16 mb-12"></div>
            <ul className="space-y-10">
              {[
                { icon: "eco", title: "Uncompromising Hygiene", desc: "We follow gold-standard sterilization protocols that exceed industry requirements, ensuring your safety at every step." },
                { icon: "psychology", title: "Clear Explanations", desc: "We use visual aids and clear language so you understand your treatment plan before we ever begin." },
                { icon: "family_restroom", title: "Care for All Generations", desc: "From playful visits for children to dedicated, slow-paced care for elderly patients, our doors are open to all." },
              ].map((item, i) => (
                <li key={item.title} className={`reveal stagger-${i + 3} flex gap-6 group`}>
                  <div className="w-12 h-12 rounded-full bg-primary/[0.08] flex items-center justify-center flex-shrink-0 group-hover:bg-primary/[0.15] transition-colors duration-500">
                    <span className="material-symbols-outlined text-primary text-xl" style={{ fontVariationSettings: '"FILL" 1' }}>
                      {item.icon}
                    </span>
                  </div>
                  <div>
                    <h4 className="font-display text-lg text-on-surface mb-2 font-semibold italic">{item.title}</h4>
                    <p className="font-body text-[13px] text-on-surface-variant leading-[1.8]">{item.desc}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ═══════════ PATIENT VOICES ═══════════ */}
      <section id="voices" className="py-28 md:py-36 bg-surface-container/40 overflow-hidden relative">
        <div className="floating-orb absolute top-0 left-[20%] w-[350px] h-[350px] bg-primary/5 -z-10"></div>
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 text-center mb-16">
          <span className="reveal font-body text-[10px] font-bold tracking-[0.25em] uppercase text-primary mb-6 block">
            ✦ Kind Words
          </span>
          <h2 className="reveal stagger-1 font-display text-3xl md:text-5xl text-secondary italic font-semibold">
            Voices of our community
          </h2>
          <div className="reveal stagger-2 gold-line w-16 mx-auto mt-6"></div>
        </div>

        <div className="flex gap-6 px-6 md:px-12 overflow-x-auto pb-8 snap-x no-scrollbar max-w-[1440px] mx-auto">
          {reviews.map((r, i) => (
            <div
              key={i}
              className="reveal-scale min-w-[320px] md:min-w-[420px] glass p-8 md:p-10 snap-center shadow-lg hover:shadow-xl transition-shadow duration-500 rounded-lg"
            >
              <div className="flex justify-between items-start mb-6">
                <span className="material-symbols-outlined text-primary/40 text-5xl select-none">format_quote</span>
                <div className="flex text-[#FFD700]">
                  {[...Array(r.rating)].map((_, index) => (
                    <span key={index} className="material-symbols-outlined text-sm" style={{ fontVariationSettings: '"FILL" 1' }}>star</span>
                  ))}
                </div>
              </div>
              <p className="font-body text-[15px] text-on-surface italic mb-8 leading-[1.8]">
                &ldquo;{r.comment}&rdquo;
              </p>
              <div className="gold-line mb-4"></div>
              <div>
                <p className="font-body text-[11px] font-bold uppercase tracking-[0.2em] text-secondary">{r.name}</p>
                <p className="text-on-surface-variant text-xs italic mt-1">{r.treatment}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="max-w-md mx-auto px-6 mt-10 text-center">
          {!showReviewForm ? (
            <button onClick={() => setShowReviewForm(true)} className="btn-premium border-2 border-primary/30 text-primary px-8 py-3 text-[11px] font-semibold tracking-[0.2em] uppercase cursor-pointer hover:bg-primary hover:text-on-primary hover:border-primary">
              Write a Review
            </button>
          ) : (
            <form onSubmit={handleAddReview} className="glass p-8 rounded-lg shadow-xl text-left space-y-4 font-body animate-scale-in">
              <h4 className="font-display text-lg text-secondary font-semibold italic">Share Your Experience</h4>
              <div className="gold-line w-12"></div>
              <div>
                <label className="block text-[10px] font-bold text-primary uppercase tracking-[0.2em] mb-1">Your Name</label>
                <input type="text" required placeholder="e.g. Priyanjali S." value={newReviewName} onChange={(e) => setNewReviewName(e.target.value)} className="w-full p-3 bg-surface-container-lowest border border-outline-variant/20 text-sm outline-none focus:border-primary transition-colors rounded-sm" />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-primary uppercase tracking-[0.2em] mb-1">Treatment Received</label>
                <input type="text" required placeholder="e.g. Teeth Whitening" value={newReviewTreatment} onChange={(e) => setNewReviewTreatment(e.target.value)} className="w-full p-3 bg-surface-container-lowest border border-outline-variant/20 text-sm outline-none focus:border-primary transition-colors rounded-sm" />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-primary uppercase tracking-[0.2em] mb-1">Rating</label>
                <select value={newReviewRating} onChange={(e) => setNewReviewRating(parseInt(e.target.value))} className="w-full p-3 bg-surface-container-lowest border border-outline-variant/20 text-sm outline-none focus:border-primary transition-colors rounded-sm">
                  <option value={5}>5 Stars - Painless & Peaceful</option>
                  <option value={4}>4 Stars - Very Good</option>
                  <option value={3}>3 Stars - Good</option>
                </select>
              </div>
              <div>
                <label className="block text-[10px] font-bold text-primary uppercase tracking-[0.2em] mb-1">Your Feedback</label>
                <textarea rows={3} required placeholder="How did you feel?" value={newReviewComment} onChange={(e) => setNewReviewComment(e.target.value)} className="w-full p-3 bg-surface-container-lowest border border-outline-variant/20 text-sm outline-none focus:border-primary transition-colors resize-none rounded-sm" />
              </div>
              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setShowReviewForm(false)} className="w-1/3 border border-secondary text-secondary py-3 text-xs uppercase font-semibold cursor-pointer hover:bg-secondary hover:text-on-secondary transition-all duration-300">Cancel</button>
                <button type="submit" className="btn-premium w-2/3 bg-primary text-on-primary py-3 text-xs uppercase font-semibold cursor-pointer">Submit Review</button>
              </div>
            </form>
          )}
        </div>
      </section>

      {/* ═══════════ LOCATION & HOURS ═══════════ */}
      <section id="location" className="py-28 md:py-36">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 grid md:grid-cols-12 gap-12">
          <div className="md:col-span-4 mb-8 md:mb-0">
            <span className="reveal font-body text-[10px] font-bold uppercase tracking-[0.25em] text-primary mb-6 block">
              ✦ Find Us
            </span>
            <h2 className="reveal stagger-1 font-display text-3xl md:text-4xl text-secondary mb-4 font-semibold italic leading-[1.1]">
              Visit us in<br />Sector 92.
            </h2>
            <div className="reveal stagger-2 gold-line w-16 mb-10"></div>
            <div className="space-y-8 font-body text-sm">
              <div className="reveal stagger-3">
                <p className="font-bold uppercase tracking-[0.2em] text-primary mb-2 text-[10px]">Location</p>
                <p className="text-on-surface-variant leading-relaxed">House No. A-5, Block A,<br />Sector 92, Noida, UP</p>
              </div>
              <div className="reveal stagger-4">
                <p className="font-bold uppercase tracking-[0.2em] text-primary mb-2 text-[10px]">Daily Hours</p>
                <p className="text-on-surface-variant">Open Daily until 8:30 PM</p>
              </div>
              <div className="reveal stagger-5 pt-4 flex flex-col gap-4">
                <a href="https://maps.app.goo.gl/Lwr8unc5usQHiNRS8" target="_blank" rel="noopener noreferrer" className="btn-premium bg-primary text-on-primary px-6 py-3.5 font-semibold text-[11px] tracking-[0.15em] uppercase inline-flex items-center justify-center gap-2 cursor-pointer">
                  <span className="material-symbols-outlined text-base">near_me</span>
                  Get Directions
                </a>
                <a href="tel:09667071984" className="text-secondary font-bold hover:text-primary transition-colors text-center text-lg">096670 71984</a>
              </div>
            </div>
          </div>
          <div className="md:col-span-8 h-[500px] relative overflow-hidden rounded-xl shadow-2xl reveal-right border border-outline-variant/20">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3505.7483756857416!2d77.39955767576507!3d28.517228075729737!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce93108c909e7%3A0x7d022b79a528cc2b!2sBlock%20A%2C%20Sector%2092%2C%20Noida%2C%20Uttar%20Pradesh!5e0!3m2!1sen!2sin!4v1719924000000!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="grayscale hover:grayscale-0 transition-all duration-1000 w-full h-full"
            ></iframe>
          </div>
        </div>
      </section>

      {/* ═══════════ CLOSING CTA ═══════════ */}
      <section className="py-28 md:py-36 text-center relative overflow-hidden">
        <div className="floating-orb absolute top-[30%] left-[10%] w-[300px] h-[300px] bg-primary/8 -z-10"></div>
        <div className="floating-orb absolute bottom-[20%] right-[15%] w-[200px] h-[200px] bg-secondary/8 -z-10" style={{ animationDelay: "4s" }}></div>
        <div className="max-w-3xl mx-auto px-6">
          <div className="reveal flex justify-center mb-8">
            <div className="rounded-full w-24 h-24 bg-primary/5 flex items-center justify-center border border-primary/10 shadow-md animate-glow-pulse">
              <span className="material-symbols-outlined text-6xl text-primary/60 select-none leading-none flex items-center justify-center w-full h-full" style={{ fontVariationSettings: '"FILL" 0' }}>
                calendar_month
              </span>
            </div>
          </div>
          <h2 className="reveal stagger-1 font-display text-3xl md:text-5xl text-secondary mb-8 italic font-semibold leading-tight">
            Ready for a different kind of dental experience?
          </h2>
          <div className="reveal stagger-2 gold-line w-16 mx-auto mb-8"></div>
          <p className="reveal stagger-3 font-body text-base md:text-lg text-on-surface-variant mb-12 leading-[1.8] max-w-xl mx-auto">
            Join hundreds of Noida patients who have discovered the Fennel way. Book your consultation today.
          </p>
          <button
            onClick={() => openBooking("")}
            className="reveal stagger-4 btn-premium bg-primary text-on-primary px-14 py-5 font-body text-[11px] font-semibold tracking-[0.25em] uppercase shadow-2xl shadow-primary/20 cursor-pointer animate-glow-pulse"
          >
            Secure Your Appointment
          </button>
        </div>
      </section>

      <Footer />

      <BookingModal isOpen={isBookingOpen} onClose={() => setIsBookingOpen(false)} selectedServicePreset={bookingPreset} />
    </>
  );
}
