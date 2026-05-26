const testimonials = [
  {
    quote:
      "Nggak perlu nunggu lama lagi buat ke FATETA dari TPB. Drivernya juga senior fakultas sendiri, jadi udah kenal!",
    name: "Rifqa N.",
    role: "Mahasiswi FEM",
    initials: "RN",
    color: "var(--green-primary)",
  },
  {
    quote:
      "Lumayan banget jadi driver di sela kuliah. Dapet uang jajan tambahan tanpa ganggu jadwal. Recommend!",
    name: "Chelsea M.",
    role: "Driver Mahasiswi",
    initials: "CM",
    color: "var(--orange)",
  },
  {
    quote:
      "Bayar QRIS-nya bener-bener praktis, nggak perlu cari kembalian. Aman karena verified KTM dari awal.",
    name: "Aura A.",
    role: "Mahasiswi FMIPA",
    initials: "AA",
    color: "var(--yellow)",
    textColor: "var(--green-dark)",
  },
]

export default function Testimonials() {
  return (
    <section id="testi" className="py-[100px] bg-white">
      <div className="max-w-[1200px] mx-auto px-7">
        {/* Header */}
        <div className="text-center mb-16 fade-up">
          <span className="uppercase tracking-[3px] font-extrabold text-[var(--orange)] text-xs block mb-3">
            Apa Kata Mereka
          </span>
          <h2 className="text-[clamp(28px,4vw,44px)] tracking-tight text-balance">
            Mahasiswa IPB sudah coba duluan
          </h2>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testi, index) => (
            <div
              key={index}
              className="fade-up bg-white p-[34px] rounded-[var(--radius-lg)] border-[1.5px] border-[#f0f0f0] relative transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[var(--shadow-lg)] hover:border-transparent"
            >
              {/* Stars */}
              <div className="text-[var(--yellow)] text-[13px] mb-1">★★★★★</div>

              {/* Quote Mark */}
              <span className="text-[var(--orange)] text-[56px] font-serif leading-[0.8] mb-4 block">
                &ldquo;
              </span>

              {/* Quote Text */}
              <p className="text-[15px] text-[var(--text-muted)] leading-[1.75]">{testi.quote}</p>

              {/* User Info */}
              <div className="flex items-center gap-3.5 mt-6 pt-5 border-t border-[#f5f5f5]">
                <div
                  className="w-[46px] h-[46px] rounded-full grid place-items-center font-extrabold text-sm shrink-0"
                  style={{ 
                    backgroundColor: testi.color, 
                    color: testi.textColor || "white" 
                  }}
                >
                  {testi.initials}
                </div>
                <div>
                  <b className="text-sm block">{testi.name}</b>
                  <span className="text-xs text-[var(--text-muted)]">{testi.role}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
