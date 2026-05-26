"use client"

import { useState, useCallback } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faMotorcycle, faLocationDot, faBullseye, faCircleInfo } from "@fortawesome/free-solid-svg-icons"

const pickupLocations = [
  "Gerbang Utama IPB",
  "Asrama TPB",
  "Perpustakaan LSI",
  "Gymnasium",
  "Masjid Al-Hurriyyah",
  "Rusunawa Mahasiswa",
]

const destinations = [
  "Fakultas MIPA (FMIPA)",
  "FATETA",
  "FEM",
  "Gedung Rektorat",
  "FAPERTA",
  "Fakultas Kedokteran Hewan",
  "FAPET",
  "FPIK",
  "FKH",
]

const farRoutes = ["Rusunawa Mahasiswa", "Gerbang Utama IPB", "Fakultas Kedokteran Hewan"]

export default function BookingSection() {
  const [pickup, setPickup] = useState("")
  const [dest, setDest] = useState("")

  const calculateFare = useCallback(() => {
    if (!pickup || !dest || pickup === dest) return "Rp 5.000"
    const hasFarRoute = farRoutes.some((r) => pickup.includes(r) || dest.includes(r))
    return hasFarRoute ? "Rp 7.500" : "Rp 5.000"
  }, [pickup, dest])

  const handleBook = () => {
    const showToast = (window as Window & { showAgriRideToast?: (msg: string) => void }).showAgriRideToast
    if (!pickup || !dest) {
      showToast?.("⚠️ Pilih lokasi jemput dan tujuan dulu ya!")
      return
    }
    showToast?.(`🛵 Driver ditemukan! Menuju ${pickup}...`)
  }

  return (
    <section id="pesan" className="max-w-[1200px] mx-auto px-7 py-20">
      <div className="fade-up bg-[var(--green-dark)] rounded-[var(--radius-xl)] p-16 lg:p-16 p-10 text-white grid grid-cols-1 lg:grid-cols-[1.3fr_1fr] gap-12 relative overflow-hidden">
        {/* Decorative Circles */}
        <div className="absolute top-[-80px] right-[-80px] w-[300px] h-[300px] rounded-full bg-white/[0.02] pointer-events-none" />
        <div className="absolute bottom-[-100px] left-[100px] w-[400px] h-[400px] rounded-full bg-[var(--green-light)]/5 pointer-events-none" />

        {/* Map Area */}
        <div className="relative z-10">
          {/* Live Badge */}
          <div className="inline-flex items-center gap-2 bg-[rgba(255,210,63,0.15)] border border-[rgba(255,210,63,0.4)] text-[var(--yellow)] px-4 py-[7px] rounded-full text-[13px] font-bold mb-5">
            <span className="w-[7px] h-[7px] bg-[var(--yellow)] rounded-full animate-pulse-dot" />
            Live Tracking
          </div>

          <h2 className="text-[34px] leading-[1.2] mb-5 !text-white">
            Pantau rute kamu secara <span className="text-[var(--yellow)]">Real-Time</span>
          </h2>

          {/* Map Container */}
          <div className="w-full h-[380px] rounded-[var(--radius-lg)] overflow-hidden border-[3px] border-white/10">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3963.7023772274945!2d106.72146317415175!3d-6.559218693433989!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69c4ace7016591%3A0xc39f9b5a864d4b8f!2sIPB%20University!5e0!3m2!1sen!2sid!4v1715000000000!5m2!1sen!2sid"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Peta IPB University"
            />
          </div>

          <p className="mt-3.5 text-[13px] text-[#8fccaa] flex items-center gap-2">
            <FontAwesomeIcon icon={faCircleInfo} />
            Menampilkan peta kampus IPB Dramaga dan sekitarnya.
          </p>
        </div>

        {/* Booking Card */}
        <div className="bg-white p-9 rounded-[var(--radius-lg)] text-[var(--text-main)] shadow-[0_30px_70px_rgba(0,0,0,0.4)] relative z-10">
          <h3 className="font-serif text-[22px] font-black mb-1 text-[var(--green-dark)]">Pesan Ojek</h3>
          <p className="text-sm text-[var(--text-muted)] mb-7">Halo, mahasiswa IPB! 👋</p>

          {/* Pickup Location */}
          <div className="mb-[18px]">
            <label className="flex items-center gap-2 font-extrabold text-[13px] mb-[9px]">
              <FontAwesomeIcon icon={faLocationDot} className="text-[var(--green-primary)]" />
              Lokasi Jemput
            </label>
            <select
              value={pickup}
              onChange={(e) => setPickup(e.target.value)}
              className="w-full p-[14px] px-4 rounded-[var(--radius-sm)] border-[1.5px] border-[#e5e5e5] bg-[#fafafa] text-sm text-[var(--text-main)] appearance-none focus:outline-none focus:border-[var(--green-primary)] focus:ring-2 focus:ring-[var(--green-primary)]/10 transition-all"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%235a6b60' stroke-width='2'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E")`,
                backgroundRepeat: "no-repeat",
                backgroundPosition: "right 14px center",
              }}
            >
              <option value="">Pilih titik jemput...</option>
              {pickupLocations.map((loc) => (
                <option key={loc} value={loc}>
                  {loc}
                </option>
              ))}
            </select>
          </div>

          {/* Destination */}
          <div className="mb-[18px]">
            <label className="flex items-center gap-2 font-extrabold text-[13px] mb-[9px]">
              <FontAwesomeIcon icon={faBullseye} className="text-[var(--orange)]" />
              Lokasi Tujuan
            </label>
            <select
              value={dest}
              onChange={(e) => setDest(e.target.value)}
              className="w-full p-[14px] px-4 rounded-[var(--radius-sm)] border-[1.5px] border-[#e5e5e5] bg-[#fafafa] text-sm text-[var(--text-main)] appearance-none focus:outline-none focus:border-[var(--green-primary)] focus:ring-2 focus:ring-[var(--green-primary)]/10 transition-all"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%235a6b60' stroke-width='2'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E")`,
                backgroundRepeat: "no-repeat",
                backgroundPosition: "right 14px center",
              }}
            >
              <option value="">Pilih tujuan...</option>
              {destinations.map((loc) => (
                <option key={loc} value={loc}>
                  {loc}
                </option>
              ))}
            </select>
          </div>

          {/* Fare Box */}
          <div className="bg-[var(--green-pale)] border-[1.5px] border-[#c3e8ce] p-[18px] px-5 rounded-[var(--radius-sm)] flex justify-between items-center mb-[22px]">
            <span className="font-bold text-[var(--text-muted)] text-[13px]">Estimasi Tarif</span>
            <span className="font-serif text-[26px] font-black text-[var(--green-primary)]">{calculateFare()}</span>
          </div>

          {/* Book Button */}
          <button
            onClick={handleBook}
            className="w-full py-4 rounded-full bg-[var(--green-primary)] text-white font-extrabold text-base flex items-center justify-center gap-2.5 shadow-[0_10px_28px_rgba(29,140,60,0.3)] hover:bg-[var(--green-dark)] hover:-translate-y-0.5 hover:shadow-[0_15px_35px_rgba(11,48,24,0.35)] transition-all"
          >
            <FontAwesomeIcon icon={faMotorcycle} />
            Pesan Sekarang →
          </button>
        </div>
      </div>
    </section>
  )
}
