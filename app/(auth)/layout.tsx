import Link from "next/link"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faMotorcycle } from "@fortawesome/free-solid-svg-icons"

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-[var(--cream)] flex">
      {/* Left Side - Form */}
      <div className="flex-1 flex flex-col justify-center px-6 py-12 lg:px-20">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 font-extrabold text-xl mb-8">
            <div className="bg-[var(--green-primary)] p-2 rounded-xl text-white">
              <FontAwesomeIcon icon={faMotorcycle} className="w-5 h-5" />
            </div>
            <span className="text-[var(--green-dark)]">AgriRide</span>
          </Link>
          
          {children}
        </div>
      </div>
      
      {/* Right Side - Visual */}
      <div className="hidden lg:flex flex-1 bg-[var(--green-dark)] items-center justify-center p-12 relative overflow-hidden">
        {/* Decorative circles */}
        <div className="absolute top-[-80px] right-[-80px] w-[300px] h-[300px] rounded-full bg-white/[0.02]" />
        <div className="absolute bottom-[-100px] left-[100px] w-[400px] h-[400px] rounded-full bg-[var(--green-light)]/5" />
        
        <div className="relative z-10 text-center">
          {/* Animated Blob */}
          <div 
            className="w-[320px] h-[320px] mx-auto mb-8 flex items-center justify-center animate-blob-morph"
            style={{
              background: "linear-gradient(135deg, var(--yellow) 0%, var(--orange) 60%, #ff5252 100%)",
              boxShadow: "0 30px 80px rgba(255,122,47,0.28)",
            }}
          >
            <div className="text-center text-white">
              <FontAwesomeIcon icon={faMotorcycle} className="text-[70px] mb-3" style={{ filter: "drop-shadow(0 8px 20px rgba(0,0,0,0.25))" }} />
              <span className="block font-extrabold text-lg tracking-wide">AgriRide Here</span>
            </div>
          </div>
          
          <h2 className="text-white text-2xl font-serif font-black mb-4 !text-white">
            Sahabat Mobilitas Kampus IPB
          </h2>
          <p className="text-[#8cb09a] text-base max-w-sm mx-auto leading-relaxed">
            Platform ojek mahasiswa berbasis aplikasi. Aman, transparan, dan memberdayakan komunitas kampus.
          </p>
          
          {/* Stats */}
          <div className="flex justify-center gap-10 mt-10">
            <div className="text-center">
              <div className="font-serif text-3xl font-black text-[var(--yellow)]">15+</div>
              <div className="text-[#8cb09a] text-sm font-semibold">Driver Aktif</div>
            </div>
            <div className="text-center">
              <div className="font-serif text-3xl font-black text-[var(--yellow)]">100%</div>
              <div className="text-[#8cb09a] text-sm font-semibold">Civitas IPB</div>
            </div>
            <div className="text-center">
              <div className="font-serif text-3xl font-black text-[var(--yellow)]">QRIS</div>
              <div className="text-[#8cb09a] text-sm font-semibold">Cashless</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
