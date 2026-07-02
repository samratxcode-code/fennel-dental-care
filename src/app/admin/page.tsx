"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

interface PatientDetails {
  name: string;
  phone: string;
  email: string;
  age: string;
  anxietyLevel: number;
  notes: string;
}

interface Appointment {
  id: string;
  service: string;
  date: string;
  timeSlot: string;
  patientDetails: PatientDetails;
  status: "Pending" | "Confirmed" | "Completed" | "Cancelled";
  createdAt: string;
}

const SEED_APPOINTMENTS: Appointment[] = [
  {
    id: "APT-1",
    service: "Orthodontics",
    date: new Date(Date.now() + 86400000).toISOString().split("T")[0], // Tomorrow
    timeSlot: "11:00 AM",
    patientDetails: {
      name: "Rohan Sharma",
      phone: "98101 23456",
      email: "rohan@gmail.com",
      age: "24",
      anxietyLevel: 2,
      notes: "First time seeking braces alignment. A bit nervous about visibility."
    },
    status: "Pending",
    createdAt: new Date().toISOString()
  },
  {
    id: "APT-2",
    service: "Root Canal Treatment",
    date: new Date(Date.now() + 172800000).toISOString().split("T")[0], // Day after tomorrow
    timeSlot: "03:00 PM",
    patientDetails: {
      name: "Savitri Devi",
      phone: "93123 45678",
      email: "savitri.devi@yahoo.com",
      age: "72",
      anxietyLevel: 5, // High anxiety
      notes: "Severe pain. Extremely scared of needles and dental drills. Prefers slow-paced explanation."
    },
    status: "Confirmed",
    createdAt: new Date().toISOString()
  },
  {
    id: "APT-3",
    service: "Dental Implants",
    date: new Date(Date.now() - 86400000).toISOString().split("T")[0], // Yesterday
    timeSlot: "04:00 PM",
    patientDetails: {
      name: "Vikram Malhotra",
      phone: "99100 88221",
      email: "vikram@malhotrainsurance.com",
      age: "51",
      anxietyLevel: 1,
      notes: "Consultation for lower molar replacement. Clean history."
    },
    status: "Completed",
    createdAt: new Date().toISOString()
  }
];

export default function AdminPage() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [filter, setFilter] = useState<string>("All");
  const [searchTerm, setSearchTerm] = useState("");

  // Sync from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("fennel_appointments");
    if (saved) {
      setAppointments(JSON.parse(saved));
    } else {
      // Seed with some sample appointments so the dashboard isn't blank
      localStorage.setItem("fennel_appointments", JSON.stringify(SEED_APPOINTMENTS));
      setAppointments(SEED_APPOINTMENTS);
    }
  }, []);

  const updateStatus = (id: string, newStatus: Appointment["status"]) => {
    const updated = appointments.map((apt) => {
      if (apt.id === id) {
        return { ...apt, status: newStatus };
      }
      return apt;
    });
    setAppointments(updated);
    localStorage.setItem("fennel_appointments", JSON.stringify(updated));
  };

  const deleteAppointment = (id: string) => {
    if (confirm("Are you sure you want to delete this appointment record?")) {
      const updated = appointments.filter((apt) => apt.id !== id);
      setAppointments(updated);
      localStorage.setItem("fennel_appointments", JSON.stringify(updated));
    }
  };

  // Filter and search appointments
  const filteredAppointments = appointments.filter((apt) => {
    const matchesFilter = filter === "All" || apt.status === filter;
    const matchesSearch =
      apt.patientDetails.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      apt.patientDetails.phone.includes(searchTerm) ||
      apt.service.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  // Stats calculation
  const totalBookings = appointments.length;
  const pendingCount = appointments.filter((a) => a.status === "Pending").length;
  const confirmedCount = appointments.filter((a) => a.status === "Confirmed").length;
  const highAnxietyCount = appointments.filter((a) => a.patientDetails.anxietyLevel >= 4).length;

  return (
    <div className="min-h-screen bg-surface-container-low font-body pb-12">
      {/* Top Banner */}
      <header className="bg-surface border-b border-outline-variant/30 py-6 px-6 md:px-16">
        <div className="max-w-[1280px] mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <div className="flex items-center gap-2">
              <Link href="/" className="text-primary hover:underline text-xs uppercase tracking-wider font-semibold">
                ← Back to Main Website
              </Link>
            </div>
            <h1 className="font-display text-2xl md:text-3xl text-secondary font-bold italic mt-2">
              Clinic Management Dashboard
            </h1>
            <p className="text-xs text-on-surface-variant mt-0.5">
              Welcome, Dr. Rajat Singh & Sakshi. Monitor scheduled patient slots.
            </p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => {
                if (confirm("Reset to default sample appointments?")) {
                  localStorage.setItem("fennel_appointments", JSON.stringify(SEED_APPOINTMENTS));
                  setAppointments(SEED_APPOINTMENTS);
                }
              }}
              className="text-xs font-semibold text-secondary hover:text-primary transition-colors border border-outline-variant/40 px-3 py-1.5 bg-surface cursor-pointer"
            >
              Reset Data
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-[1280px] mx-auto px-6 md:px-16 mt-8 space-y-8">
        {/* Quick Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-surface p-6 border border-outline-variant/20 rounded shadow-sm flex flex-col">
            <span className="text-xs text-on-surface-variant font-semibold uppercase tracking-wider">Total Booked</span>
            <span className="font-display text-3xl font-bold text-primary mt-2">{totalBookings}</span>
          </div>
          <div className="bg-surface p-6 border border-outline-variant/20 rounded shadow-sm flex flex-col">
            <span className="text-xs text-on-surface-variant font-semibold uppercase tracking-wider">Pending Review</span>
            <span className="font-display text-3xl font-bold text-secondary mt-2">{pendingCount}</span>
          </div>
          <div className="bg-surface p-6 border border-outline-variant/20 rounded shadow-sm flex flex-col">
            <span className="text-xs text-on-surface-variant font-semibold uppercase tracking-wider">Confirmed slots</span>
            <span className="font-display text-3xl font-bold text-primary mt-2">{confirmedCount}</span>
          </div>
          <div className="bg-surface p-6 border border-error/20 bg-error-container/20 rounded shadow-sm flex flex-col">
            <span className="text-xs text-error font-semibold uppercase tracking-wider">High Anxiety Patients</span>
            <span className="font-display text-3xl font-bold text-error mt-2">{highAnxietyCount}</span>
          </div>
        </div>

        {/* Filters & Actions Panel */}
        <div className="bg-surface p-6 border border-outline-variant/20 rounded shadow-sm space-y-4">
          <div className="flex flex-col md:flex-row justify-between gap-4">
            <div className="flex flex-wrap gap-2">
              {["All", "Pending", "Confirmed", "Completed", "Cancelled"].map((status) => (
                <button
                  key={status}
                  onClick={() => setFilter(status)}
                  className={`px-4 py-2 text-xs font-semibold uppercase tracking-wider rounded transition-all cursor-pointer ${
                    filter === status
                      ? "bg-secondary text-on-secondary"
                      : "bg-surface-container hover:bg-surface-container-high text-on-surface-variant"
                  }`}
                >
                  {status}
                </button>
              ))}
            </div>
            <div className="relative w-full md:max-w-xs">
              <input
                type="text"
                placeholder="Search patient, phone, service..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-3 pr-10 py-2 bg-surface-container border border-outline-variant/40 text-sm outline-none focus:border-secondary transition-colors"
              />
              <span className="material-symbols-outlined absolute right-3 top-2 text-on-surface-variant text-base select-none">
                search
              </span>
            </div>
          </div>

          {/* Appointments list */}
          <div className="overflow-x-auto">
            {filteredAppointments.length === 0 ? (
              <div className="py-12 text-center text-on-surface-variant text-sm">
                No appointments found matching this status or search criteria.
              </div>
            ) : (
              <table className="w-full text-left text-sm border-collapse min-w-[700px]">
                <thead>
                  <tr className="border-b border-outline-variant/30 text-xs font-semibold text-primary uppercase tracking-wider">
                    <th className="py-4">Patient Info</th>
                    <th className="py-4">Service</th>
                    <th className="py-4">Schedule</th>
                    <th className="py-4 text-center">Anxiety Level</th>
                    <th className="py-4">Status</th>
                    <th className="py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline-variant/20">
                  {filteredAppointments.map((apt) => (
                    <tr key={apt.id} className="hover:bg-surface-container-low transition-colors">
                      <td className="py-4 pr-4">
                        <div className="font-semibold text-secondary">{apt.patientDetails.name}</div>
                        <div className="text-xs text-on-surface-variant">{apt.patientDetails.phone} | Age: {apt.patientDetails.age}</div>
                        <div className="text-[11px] text-on-surface-variant/75">{apt.patientDetails.email}</div>
                        {apt.patientDetails.notes && (
                          <div className="mt-1 text-xs italic text-on-surface-variant max-w-xs bg-surface-container p-2 border-l-2 border-primary/40">
                            "{apt.patientDetails.notes}"
                          </div>
                        )}
                      </td>
                      <td className="py-4 pr-4 font-medium text-secondary">
                        {apt.service}
                      </td>
                      <td className="py-4 pr-4">
                        <div className="font-medium text-on-surface">{apt.date}</div>
                        <div className="text-xs text-on-surface-variant font-semibold">{apt.timeSlot}</div>
                      </td>
                      <td className="py-4 pr-4 text-center">
                        <span
                          className={`inline-block px-2.5 py-1 text-xs rounded-full font-bold ${
                            apt.patientDetails.anxietyLevel >= 4
                              ? "bg-error-container text-error animate-pulse"
                              : "bg-surface-container-highest text-on-surface-variant"
                          }`}
                        >
                          {apt.patientDetails.anxietyLevel} / 5
                          {apt.patientDetails.anxietyLevel >= 4 && " ⚠️"}
                        </span>
                      </td>
                      <td className="py-4 pr-4">
                        <span
                          className={`inline-block px-2.5 py-1 text-xs font-semibold uppercase tracking-wider rounded ${
                            apt.status === "Pending"
                              ? "bg-[#fff7ed] text-[#c2410c] border border-[#ffedd5]"
                              : apt.status === "Confirmed"
                              ? "bg-[#f0fdf4] text-[#15803d] border border-[#dcfce7]"
                              : apt.status === "Completed"
                              ? "bg-[#f0f9ff] text-[#0369a1] border border-[#e0f2fe]"
                              : "bg-[#fef2f2] text-[#b91c1c] border border-[#fee2e2]"
                          }`}
                        >
                          {apt.status}
                        </span>
                      </td>
                      <td className="py-4 text-right space-x-1.5 whitespace-nowrap">
                        {apt.status === "Pending" && (
                          <button
                            onClick={() => updateStatus(apt.id, "Confirmed")}
                            className="bg-secondary text-on-secondary text-[11px] font-semibold uppercase tracking-wider px-2.5 py-1 hover:opacity-90 transition-all cursor-pointer"
                          >
                            Confirm
                          </button>
                        )}
                        {apt.status === "Confirmed" && (
                          <button
                            onClick={() => updateStatus(apt.id, "Completed")}
                            className="bg-primary text-on-primary text-[11px] font-semibold uppercase tracking-wider px-2.5 py-1 hover:opacity-90 transition-all cursor-pointer"
                          >
                            Complete
                          </button>
                        )}
                        {apt.status !== "Cancelled" && apt.status !== "Completed" && (
                          <button
                            onClick={() => updateStatus(apt.id, "Cancelled")}
                            className="border border-error text-error text-[11px] font-semibold uppercase tracking-wider px-2.5 py-1 hover:bg-error hover:text-on-error transition-all cursor-pointer"
                          >
                            Cancel
                          </button>
                        )}
                        <button
                          onClick={() => deleteAppointment(apt.id)}
                          className="text-on-surface-variant hover:text-error transition-colors p-1"
                        >
                          <span className="material-symbols-outlined text-sm align-middle select-none">delete</span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
