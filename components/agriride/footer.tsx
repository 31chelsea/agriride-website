import Link from "next/link"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faMotorcycle, faEnvelope } from "@fortawesome/free-solid-svg-icons"
import { faInstagram, faWhatsapp, faTiktok } from "@fortawesome/free-brands-svg-icons"

const footerLinks = {
  produk: [
    { label: "Fitur", href: "#fitur" },
    { label: "Cara Kerja", href: "#cara" },
    { label: "Pesan", href: "#pesan" },
  ],
  komunitas: [
    { label: "Jadi Driver", href: "/register" },
    { label: "FAQ", href: "#" },
    { label: "Bantuan", href: "#" },
  ],
  kontak: [
    { label: "hello@agriride.id", href: "mailto:hello@agriride.id" },
    { label: "@agriride.ipb", href: "#" },
    { label: "WhatsApp Us", href: "#" },
  ],
}

const socials = [
  { icon: faInstagram, href: "#", label: "Instagram" },
  { icon: faWhatsapp, href: "#", label: "WhatsApp" },
  { icon: faTiktok, href: "#", label: "TikTok" },
  { icon: faEnvelope, href: "mailto:hello@agriride.id", label: "Email" },
]

export default function Footer() {
  return (
    <footer className="bg-[var(--green-dark)] py-20 pb-8 text-[#8cb09a]">
      <div className="max-w-[1200px] mx-auto px-7">
        {/* Footer Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1fr] gap-12 mb-16">
          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center gap-2.5 font-extrabold text-[21px] text-white mb-4">
              <div className="bg-[var(--green-primary)] p-2 px-2.5 rounded-xl text-white text-base leading-none">
                <FontAwesomeIcon icon={faMotorcycle} />
              </div>
              AgriRide
            </Link>
            <p className="text-sm leading-[1.8] max-w-[280px]">
              Platform ojek mahasiswa IPB berbasis aplikasi. Aman, transparan, dan memberdayakan komunitas kampus.
            </p>
            <div className="flex gap-3 mt-6">
              {socials.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  aria-label={social.label}
                  className="w-9 h-9 rounded-full border border-white/15 grid place-items-center text-sm text-[#8cb09a] hover:bg-white/10 hover:text-white hover:border-white/30 transition-all"
                >
                  <FontAwesomeIcon icon={social.icon} />
                </a>
              ))}
            </div>
          </div>

          {/* Produk Links */}
          <div>
            <h4 className="text-white mb-5 text-[15px] font-bold">Produk</h4>
            <ul className="space-y-3">
              {footerLinks.produk.map((link, index) => (
                <li key={index}>
                  <Link 
                    href={link.href} 
                    className="text-sm hover:text-[var(--yellow)] hover:pl-1 transition-all"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Komunitas Links */}
          <div>
            <h4 className="text-white mb-5 text-[15px] font-bold">Komunitas</h4>
            <ul className="space-y-3">
              {footerLinks.komunitas.map((link, index) => (
                <li key={index}>
                  <Link 
                    href={link.href} 
                    className="text-sm hover:text-[var(--yellow)] hover:pl-1 transition-all"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Kontak Links */}
          <div>
            <h4 className="text-white mb-5 text-[15px] font-bold">Kontak</h4>
            <ul className="space-y-3">
              {footerLinks.kontak.map((link, index) => (
                <li key={index}>
                  <Link 
                    href={link.href} 
                    className="text-sm hover:text-[var(--yellow)] hover:pl-1 transition-all"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Divider */}
        <hr className="border-white/[0.06] mb-[30px]" />

        {/* Copyright */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-[13px]">
          <span>© 2026 AgriRide — Tech21 · Technopreneurship for AI</span>
          <span className="flex items-center gap-1.5 text-[#6b9078]">
            Dibuat dengan <span className="text-[var(--green-light)]">💚</span> untuk civitas IPB
          </span>
        </div>
      </div>
    </footer>
  )
}
