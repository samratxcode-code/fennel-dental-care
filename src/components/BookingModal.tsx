"use client";

import { useState } from "react";

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedServicePreset?: string;
}

const SERVICES = [
  "General Consultation",
  "Orthodontics",
  "Root Canal Treatment",
  "Dental Implants",
  "Painless Extractions",
  "Crowns & Capping"
];

const TIME_SLOTS = [
  "10:00 AM",
  "11:00 AM",
  "12:00 PM",
  "02:00 PM",
  "03:00 PM",
  "04:00 PM",
  "05:00 PM",
  "06:30 PM",
  "07:30 PM"
];

export default function BookingModal({ isOpen, onClose, selectedServicePreset }: BookingModalProps) {
  const [step, setStep] = useState(1);
  const [service, setService] = useState(selectedServicePreset || SERVICES[0]);
  const [date, setDate] = useState("");
  const [timeSlot, setTimeSlot] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [anxietyLevel, setAnxietyLevel] = useState(1); // 1-5 scale for personalized calm care
  const [notes, setNotes] = useState("");

  if (!isOpen) return null;

  const handleNextStep = () => {
    if (step === 1 && !date) {
      alert("Please select a preferred date.");
      return;
    }
    if (step === 1 && !timeSlot) {
      alert("Please select a time slot.");
      return;
    }
    setStep(step + 1);
  };

  const handlePrevStep = () => {
    setStep(step - 1);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !phone || !email || !age) {
      alert("Please fill in all required fields.");
      return;
    }

    const appointment = {
      id: "APT-" + Date.now(),
      service,
      date,
      timeSlot,
      patientDetails: {
        name,
        phone,
        email,
        age,
        anxietyLevel,
        notes
      },
      status: "Pending", // Pending, Confirmed, Completed, Cancelled
      createdAt: new Date().toISOString()
    };

    // Load current appointments
    const existing = localStorage.getItem("fennel_appointments");
    const list = existing ? JSON.parse(existing) : [];
    list.push(appointment);
    localStorage.setItem("fennel_appointments", JSON.stringify(list));

    setStep(3); // Success step
  };

  const resetForm = () => {
    setStep(1);
    setService(SERVICES[0]);
    setDate("");
    setTimeSlot("");
    setName("");
    setPhone("");
    setEmail("");
    setAge("");
    setAnxietyLevel(1);
    setNotes("");
    onClose();
  };

  // Get tomorrow's date formatted as YYYY-MM-DD for min date selector
  const getTomorrowString = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split("T")[0];
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-inverse-surface/40 backdrop-blur-sm animate-fade-in">
      <div className="bg-surface w-full max-w-xl border border-outline-variant/30 rounded shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="px-6 py-4 bg-surface-container border-b border-outline-variant/20 flex justify-between items-center">
          <div className="flex flex-col">
            <h3 className="font-display text-xl text-secondary font-semibold italic">
              Book Your Calm Visit
            </h3>
            <p className="text-xs text-on-surface-variant font-body mt-0.5">
              Step {step} of 3
            </p>
          </div>
          <button
            onClick={resetForm}
            className="text-on-surface-variant hover:text-primary transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto flex-1 font-body">
          {step === 1 && (
            <div className="space-y-6">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-primary mb-2">
                  Select Specialty Service
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {SERVICES.map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setService(s)}
                      className={`p-3 text-sm text-left border transition-all ${
                        service === s
                          ? "bg-secondary text-on-secondary border-secondary font-medium"
                          : "border-outline-variant/40 hover:bg-surface-container-low text-on-surface"
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-primary mb-2">
                    Choose Date
                  </label>
                  <input
                    type="date"
                    min={getTomorrowString()}
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full p-3 bg-surface border border-outline-variant/40 outline-none focus:border-secondary transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-primary mb-2">
                    Available Time Slots
                  </label>
                  <select
                    value={timeSlot}
                    onChange={(e) => setTimeSlot(e.target.value)}
                    className="w-full p-3 bg-surface border border-outline-variant/40 outline-none focus:border-secondary transition-colors"
                  >
                    <option value="">-- Choose a Slot --</option>
                    {TIME_SLOTS.map((slot) => (
                      <option key={slot} value={slot}>
                        {slot}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="pt-4">
                <button
                  type="button"
                  onClick={handleNextStep}
                  className="w-full bg-primary text-on-primary py-4 text-xs font-semibold tracking-widest uppercase hover:bg-primary/95 transition-all cursor-pointer"
                >
                  Continue to Personal Details
                </button>
              </div>
            </div>
          )}

          {step === 2 && (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-primary mb-1">
                  Full Name <span className="text-error">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Aman Verma"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full p-3 bg-surface border border-outline-variant/40 outline-none focus:border-secondary transition-colors"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-primary mb-1">
                    Phone Number <span className="text-error">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="e.g. 0987654321"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full p-3 bg-surface border border-outline-variant/40 outline-none focus:border-secondary transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-primary mb-1">
                    Age <span className="text-error">*</span>
                  </label>
                  <input
                    type="number"
                    required
                    min="1"
                    max="120"
                    placeholder="e.g. 35"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    className="w-full p-3 bg-surface border border-outline-variant/40 outline-none focus:border-secondary transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-primary mb-1">
                  Email Address <span className="text-error">*</span>
                </label>
                <input
                  type="email"
                  required
                  placeholder="e.g. name@domain.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-3 bg-surface border border-outline-variant/40 outline-none focus:border-secondary transition-colors"
                />
              </div>

              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="block text-xs font-semibold uppercase tracking-wider text-primary">
                    Anxiety or Nervousness Level
                  </label>
                  <span className="text-xs text-secondary font-medium">Level {anxietyLevel} / 5</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="5"
                  value={anxietyLevel}
                  onChange={(e) => setAnxietyLevel(parseInt(e.target.value))}
                  className="w-full accent-primary bg-outline-variant/30 h-1.5 rounded-lg appearance-none cursor-pointer"
                />
                <p className="text-[11px] text-on-surface-variant italic mt-1">
                  {anxietyLevel >= 4 
                    ? "✨ We will prepare extra soothing steps, warm lavender packs, and gentle slow-paced care."
                    : "✨ Our signatures are painless numbing gels and a calming, slow-paced approach."}
                </p>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-primary mb-1">
                  Special Notes / Concerns
                </label>
                <textarea
                  rows={2}
                  placeholder="Tell us about any specific preferences, pain, or fear of dentist..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full p-3 bg-surface border border-outline-variant/40 outline-none focus:border-secondary transition-colors resize-none"
                />
              </div>

              <div className="pt-4 flex gap-3">
                <button
                  type="button"
                  onClick={handlePrevStep}
                  className="w-1/3 border border-secondary text-secondary py-4 text-xs font-semibold tracking-widest uppercase hover:bg-secondary hover:text-on-secondary transition-all cursor-pointer"
                >
                  Back
                </button>
                <button
                  type="submit"
                  className="w-2/3 bg-primary text-on-primary py-4 text-xs font-semibold tracking-widest uppercase hover:bg-primary/95 transition-all cursor-pointer"
                >
                  Book My Appointment
                </button>
              </div>
            </form>
          )}

          {step === 3 && (
            <div className="py-8 text-center space-y-6 animate-fade-in">
              <div className="w-16 h-16 bg-secondary/10 text-secondary rounded-full flex items-center justify-center mx-auto">
                <span className="material-symbols-outlined text-4xl">check_circle</span>
              </div>
              <div className="space-y-2">
                <h4 className="font-display text-2xl text-secondary font-semibold italic">
                  Appointment Confirmed!
                </h4>
                <p className="text-on-surface-variant max-w-sm mx-auto text-sm">
                  Thank you, <strong>{name}</strong>. Sakshi, our patient advocate, has reserved your peaceful slot on <strong>{date}</strong> at <strong>{timeSlot}</strong>.
                </p>
              </div>

              <div className="bg-surface-container p-4 border border-outline-variant/20 max-w-sm mx-auto text-left text-xs space-y-1.5">
                <p><span className="text-primary font-medium">Service:</span> {service}</p>
                <p><span className="text-primary font-medium">Date & Time:</span> {date} @ {timeSlot}</p>
                <p><span className="text-primary font-medium">Phone:</span> {phone}</p>
                {notes && <p><span className="text-primary font-medium">Custom request:</span> "{notes}"</p>}
              </div>

              <p className="text-xs text-on-surface-variant">
                An email confirmation has been sent to {email}. We look forward to welcoming you to Sector 92.
              </p>

              <button
                onClick={resetForm}
                className="bg-secondary text-on-secondary px-8 py-3 text-xs font-semibold tracking-widest uppercase hover:bg-secondary/95 transition-all cursor-pointer"
              >
                Close & Finish
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
