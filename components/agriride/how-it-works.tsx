const steps = [
  {
    number: "01",
    title: "Daftar Akun",
    description: "Login pakai email kampus & verifikasi KTM. Prosesnya cuma 2 menit!",
  },
  {
    number: "02",
    title: "Pesan Anjem",
    description: "Tentukan titik jemput dan tujuan di dalam kampus IPB Dramaga.",
  },
  {
    number: "03",
    title: "Dapat Driver",
    description: "Sistem mencocokkan kamu dengan driver mahasiswa IPB terdekat.",
  },
  {
    number: "04",
    title: "Bayar QRIS",
    description: "Selesai perjalanan, scan & bayar via QRIS. Cashless dan praktis!",
  },
]

export default function HowItWorks() {
  return (
    <section id="cara" className="py-[100px] bg-[var(--cream)]">
      <div className="max-w-[1200px] mx-auto px-7">
        {/* Header */}
        <div className="text-center mb-16 fade-up">
          <span className="uppercase tracking-[3px] font-extrabold text-[var(--orange)] text-xs block mb-3">
            Cara Kerja
          </span>
          <h2 className="text-[clamp(28px,4vw,44px)] tracking-tight text-balance">
            4 langkah mudah, 1 perjalanan nyaman
          </h2>
        </div>

        {/* Steps Grid */}
        <div className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Dashed Line (Desktop only) */}
          <div 
            className="hidden lg:block absolute top-[55px] left-[calc(12.5%+27px)] w-[calc(75%-54px)] h-0.5"
            style={{
              background: "repeating-linear-gradient(90deg, var(--green-light) 0, var(--green-light) 8px, transparent 8px, transparent 16px)",
            }}
          />

          {steps.map((step, index) => (
            <div
              key={index}
              className="fade-up bg-white p-9 px-6 pb-7 rounded-[var(--radius-lg)] text-center border-[1.5px] border-transparent relative z-10 transition-all duration-300 hover:-translate-y-2 hover:shadow-[var(--shadow-lg)] hover:border-[rgba(29,140,60,0.15)]"
            >
              {/* Step Number */}
              <div className="w-[54px] h-[54px] rounded-full bg-[var(--green-pale)] border-[2.5px] border-[var(--green-light)] grid place-items-center font-serif text-xl font-black text-[var(--green-primary)] mx-auto mb-5">
                {step.number}
              </div>
              <h3 className="font-serif text-[17px] font-black mb-2.5 text-[var(--green-dark)]">{step.title}</h3>
              <p className="text-[var(--text-muted)] text-[13px] leading-[1.7]">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
