"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faMotorcycle, faBars, faXmark } from "@fortawesome/free-solid-svg-icons"

const navLinks = [
  { href: "#fitur", label: "Fitur" },
  { href: "#cara", label: "Cara Kerja" },
  { href: "#pesan", label: "Pesan" },
  { href: "#testi", label: "Testimoni" },
]

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <nav
      className={`sticky top-0 z-[1000] bg-[rgba(253,248,239,0.88)] backdrop-blur-[18px] py-4 border-b border-[rgba(15,61,31,0.07)] transition-shadow duration-300 ${
        isScrolled ? "shadow-[var(--shadow-md)]" : ""
      }`}
    >
      <div className="max-w-[1200px] mx-auto px-7 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 font-extrabold text-[21px] tracking-tight group">
          <div className="bg-[var(--green-primary)] p-2 px-2.5 rounded-xl text-white text-base leading-none transition-transform duration-300 group-hover:rotate-[-8deg] group-hover:scale-110">
            <FontAwesomeIcon icon={faMotorcycle} />
          </div>
          <span className="text-[var(--green-dark)]">AgriRide</span>
        </Link>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex gap-8 font-semibold text-[15px]">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="relative pb-[3px] text-[var(--text-muted)] hover:text-[var(--green-dark)] transition-colors after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-[var(--green-primary)] after:rounded-sm after:transition-all after:duration-300 hover:after:w-full"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Desktop Auth Buttons */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            href="/login"
            className="px-5 py-2.5 rounded-full font-bold text-sm text-[var(--green-dark)] hover:bg-[var(--green-pale)] transition-colors"
          >
            Masuk
          </Link>
          <Link
            href="#pesan"
            className="bg-[var(--green-primary)] text-white px-5 py-2.5 rounded-full font-bold text-sm shadow-[0_4px_14px_rgba(29,140,60,0.25)] hover:bg-[var(--green-dark)] hover:-translate-y-0.5 hover:shadow-[0_8px_20px_rgba(29,140,60,0.3)] transition-all"
          >
            Pesan Sekarang
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden p-2 text-[var(--green-dark)]"
        >
          <FontAwesomeIcon icon={isMobileMenuOpen ? faXmark : faBars} className="w-6 h-6" />
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-[var(--cream)] border-b border-[rgba(15,61,31,0.07)] shadow-[var(--shadow-md)] py-4 px-7">
          <div className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="font-semibold text-[var(--text-muted)] hover:text-[var(--green-dark)] transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <hr className="border-[rgba(15,61,31,0.1)]" />
            <Link
              href="/login"
              onClick={() => setIsMobileMenuOpen(false)}
              className="font-bold text-[var(--green-dark)]"
            >
              Masuk
            </Link>
            <Link
              href="#pesan"
              onClick={() => setIsMobileMenuOpen(false)}
              className="bg-[var(--green-primary)] text-white px-5 py-3 rounded-full font-bold text-center shadow-[0_4px_14px_rgba(29,140,60,0.25)]"
            >
              Pesan Sekarang
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}
