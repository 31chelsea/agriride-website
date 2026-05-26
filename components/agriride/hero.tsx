import Link from "next/link"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faMotorcycle, faRocket, faLocationDot, faQrcode } from "@fortawesome/free-solid-svg-icons"
import { faCirclePlay } from "@fortawesome/free-regular-svg-icons"

export default function Hero() {
  return (
    <section className="py-[90px] pb-20">
      <div className="max-w-[1200px] mx-auto px-7">
        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-[50px] items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-white px-[18px] py-2 rounded-full font-bold text-[13px] text-[var(--green-primary)] border-[1.5px] border-[#d4eddb] shadow-[0_2px_10px_rgba(29,140,60,0.08)] mb-[22px]">
              <span className="w-2 h-2 bg-[var(--green-light)] rounded-full animate-pulse-dot" />
              Sahabat Mobilitas Kampus IPB
            </div>

            {/* Title */}
            <h1 className="text-[clamp(38px,5.5vw,70px)] leading-[1.08] mb-[22px] tracking-tight text-balance">
              Anjem cepat,{" "}
              <span className="text-[var(--orange)] italic">aman &amp; seru</span>{" "}
              di seluruh kampus IPB
            </h1>

            {/* Description */}
            <p className="text-[var(--text-muted)] text-[17px] mb-[38px] max-w-[480px] leading-[1.75] mx-auto lg:mx-0">
              Platform ojek mahasiswa berbasis aplikasi. Verifikasi KTM, pelacakan
              real-time, dan pembayaran QRIS — semua dalam satu klik.
            </p>

            {/* Buttons */}
            <div className="flex gap-3.5 mb-12 flex-wrap justify-center lg:justify-start">
              <Link
                href="#pesan"
                className="bg-[var(--green-primary)] text-white px-[30px] py-[15px] rounded-full font-extrabold text-[15px] inline-flex items-center gap-2.5 shadow-[0_12px_28px_rgba(29,140,60,0.28)] hover:bg-[var(--green-dark)] hover:-translate-y-[3px] hover:shadow-[0_18px_36px_rgba(11,48,24,0.3)] transition-all"
              >
                <FontAwesomeIcon icon={faRocket} />
                Mulai Sekarang
              </Link>
              <Link
                href="#cara"
                className="border-[2.5px] border-[var(--green-dark)] text-[var(--green-dark)] px-[30px] py-[15px] rounded-full font-extrabold text-[15px] inline-flex items-center gap-2.5 hover:bg-[var(--green-dark)] hover:text-white hover:-translate-y-[3px] transition-all"
              >
                <FontAwesomeIcon icon={faCirclePlay} />
                Lihat Cara Kerja
              </Link>
            </div>

            {/* Stats */}
            <div className="flex gap-11 pt-7 border-t border-black/[0.07] justify-center lg:justify-start">
              <div>
                <b className="font-serif text-[30px] block text-[var(--green-dark)] tracking-tight">15+</b>
                <span className="text-[var(--text-muted)] text-[13px] font-semibold">Driver Mahasiswa</span>
              </div>
              <div>
                <b className="font-serif text-[30px] block text-[var(--green-dark)] tracking-tight">100%</b>
                <span className="text-[var(--text-muted)] text-[13px] font-semibold">Civitas IPB</span>
              </div>
              <div>
                <b className="font-serif text-[30px] block text-[var(--green-dark)] tracking-tight">QRIS</b>
                <span className="text-[var(--text-muted)] text-[13px] font-semibold">Cashless Ready</span>
              </div>
            </div>
          </div>

          {/* Right Visual */}
          <div className="relative flex items-center justify-center fade-up">
            {/* Animated Blob */}
            <div
              className="w-[320px] h-[320px] lg:w-[440px] lg:h-[440px] flex items-center justify-center animate-blob-morph"
              style={{
                background: "linear-gradient(135deg, var(--yellow) 0%, var(--orange) 60%, #ff5252 100%)",
                boxShadow: "0 30px 80px rgba(255,122,47,0.28)",
              }}
            >
              <div className="text-center text-white">
                <FontAwesomeIcon
                  icon={faMotorcycle}
                  className="text-[70px] lg:text-[90px] mb-3"
                  style={{ filter: "drop-shadow(0 8px 20px rgba(0,0,0,0.25))" }}
                />
                <span className="font-extrabold text-[18px] tracking-wider block">AgriRide Here</span>
              </div>
            </div>

            {/* Floating Badge 1 */}
            <div className="hidden md:flex absolute top-10 right-[-20px] bg-white rounded-[var(--radius-md)] px-[18px] py-3 shadow-[var(--shadow-lg)] items-center gap-2.5 font-bold text-[13px] animate-float">
              <FontAwesomeIcon icon={faLocationDot} className="text-xl text-[var(--orange)]" />
              Live Tracking ON
            </div>

            {/* Floating Badge 2 */}
            <div className="hidden md:flex absolute bottom-[60px] left-[-30px] bg-white rounded-[var(--radius-md)] px-[18px] py-3 shadow-[var(--shadow-lg)] items-center gap-2.5 font-bold text-[13px] animate-float" style={{ animationDelay: "1.5s" }}>
              <FontAwesomeIcon icon={faQrcode} className="text-xl text-[var(--green-primary)]" />
              QRIS Verified
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
