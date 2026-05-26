import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faShieldHalved, faLocationDot, faQrcode, faHandshake } from "@fortawesome/free-solid-svg-icons"

const features = [
  {
    icon: faShieldHalved,
    gradient: "linear-gradient(135deg, #1d8c3c, #2ecc5e)",
    title: "Keamanan Terjamin",
    description: "Verifikasi KTM & email IPB wajib untuk semua driver dan penumpang. Perjalananmu aman terlindungi.",
  },
  {
    icon: faLocationDot,
    gradient: "linear-gradient(135deg, #ff7a2f, #ff5252)",
    title: "Real-Time Tracking",
    description: "Lacak posisi driver dan estimasi kedatangan langsung dari aplikasi, tanpa perlu telepon atau chat.",
  },
  {
    icon: faQrcode,
    gradient: "linear-gradient(135deg, #e91e63, #9c27b0)",
    title: "Pembayaran QRIS",
    description: "Cashless, scan & bayar — tidak perlu ribet siapkan uang receh. Langsung beres!",
  },
  {
    icon: faHandshake,
    gradient: "linear-gradient(135deg, #ffd23f, #ff9800)",
    textColor: "#0b3018",
    title: "Student Economy",
    description: "Memberdayakan mahasiswa driver untuk penghasilan tambahan tanpa mengorbankan waktu kuliah.",
  },
]

export default function Features() {
  return (
    <section id="fitur" className="py-[100px] bg-white">
      <div className="max-w-[1200px] mx-auto px-7">
        {/* Header */}
        <div className="text-center mb-16 fade-up">
          <span className="uppercase tracking-[3px] font-extrabold text-[var(--orange)] text-xs block mb-3">
            Fitur Unggulan
          </span>
          <h2 className="text-[clamp(28px,4vw,44px)] tracking-tight text-balance">
            Dibangun untuk mahasiswa,
            <br />
            oleh mahasiswa
          </h2>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[22px]">
          {features.map((feature, index) => (
            <div
              key={index}
              className="fade-up p-10 px-7 rounded-[var(--radius-lg)] border-[1.5px] border-transparent bg-[var(--cream)] relative overflow-hidden transition-all duration-[350ms] hover:-translate-y-2 hover:border-[rgba(29,140,60,0.15)] hover:shadow-[var(--shadow-lg)] hover:bg-white group"
            >
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/90 to-white/0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              
              {/* Content */}
              <div className="relative z-10">
                <div
                  className="w-[54px] h-[54px] rounded-2xl grid place-items-center text-[22px] text-white mb-6"
                  style={{ 
                    background: feature.gradient,
                    color: feature.textColor || "white"
                  }}
                >
                  <FontAwesomeIcon icon={feature.icon} />
                </div>
                <h3 className="font-serif text-lg font-black mb-2.5 text-[var(--green-dark)]">{feature.title}</h3>
                <p className="text-[var(--text-muted)] text-sm leading-[1.7]">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
