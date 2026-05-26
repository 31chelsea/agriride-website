"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { 
  faEnvelope, 
  faLock, 
  faEye, 
  faEyeSlash, 
  faRightToBracket,
  faSpinner
} from "@fortawesome/free-solid-svg-icons"
import { faGoogle } from "@fortawesome/free-brands-svg-icons"
import { createClient } from "@/lib/supabase"

export default function LoginPage() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    remember: false,
  })
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({})

  const validateForm = () => {
    const newErrors: { email?: string; password?: string } = {}
    
    if (!formData.email) {
      newErrors.email = "Email wajib diisi"
    } else if (!formData.email.endsWith("@apps.ipb.ac.id") && !formData.email.endsWith("@ipb.ac.id")) {
      newErrors.email = "Gunakan email kampus IPB (@apps.ipb.ac.id)"
    }
    
    if (!formData.password) {
      newErrors.password = "Password wajib diisi"
    } else if (formData.password.length < 6) {
      newErrors.password = "Password minimal 6 karakter"
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault()
  if (!validateForm()) return

  setIsLoading(true)
  const supabase = createClient()

  const { error } = await supabase.auth.signInWithPassword({
    email: formData.email,
    password: formData.password,
  })

  if (error) {
    setErrors({ password: "Email atau password salah" })
  } else {
    router.push("/")
  }

  setIsLoading(false)
}

  return (
    <div>
      <h1 className="text-3xl font-black text-[var(--green-dark)] mb-2">
        Selamat Datang! 👋
      </h1>
      <p className="text-[var(--text-muted)] mb-8">
        Masuk ke akun AgriRide kamu untuk melanjutkan perjalanan
      </p>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Email Field */}
        <div>
          <label className="flex items-center gap-2 font-extrabold text-sm text-[var(--text-main)] mb-2">
            <FontAwesomeIcon icon={faEnvelope} className="text-[var(--green-primary)] w-4 h-4" />
            Email Kampus
          </label>
          <div className="relative">
            <input
              type="email"
              placeholder="nama@apps.ipb.ac.id"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className={`w-full px-4 py-3.5 rounded-xl border-2 bg-[#fafafa] text-[var(--text-main)] placeholder:text-[#aaa] focus:outline-none focus:bg-white transition-all ${
                errors.email 
                  ? "border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-500/10" 
                  : "border-[#e5e5e5] focus:border-[var(--green-primary)] focus:ring-2 focus:ring-[var(--green-primary)]/10"
              }`}
            />
          </div>
          {errors.email && (
            <p className="text-red-500 text-sm mt-1.5">{errors.email}</p>
          )}
        </div>

        {/* Password Field */}
        <div>
          <label className="flex items-center gap-2 font-extrabold text-sm text-[var(--text-main)] mb-2">
            <FontAwesomeIcon icon={faLock} className="text-[var(--green-primary)] w-4 h-4" />
            Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Masukkan password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className={`w-full px-4 py-3.5 pr-12 rounded-xl border-2 bg-[#fafafa] text-[var(--text-main)] placeholder:text-[#aaa] focus:outline-none focus:bg-white transition-all ${
                errors.password 
                  ? "border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-500/10" 
                  : "border-[#e5e5e5] focus:border-[var(--green-primary)] focus:ring-2 focus:ring-[var(--green-primary)]/10"
              }`}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-[var(--text-muted)] hover:text-[var(--green-primary)] transition-colors"
            >
              <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} className="w-5 h-5" />
            </button>
          </div>
          {errors.password && (
            <p className="text-red-500 text-sm mt-1.5">{errors.password}</p>
          )}
        </div>

        {/* Remember Me & Forgot Password */}
        <div className="flex items-center justify-between">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={formData.remember}
              onChange={(e) => setFormData({ ...formData, remember: e.target.checked })}
              className="w-4 h-4 rounded border-2 border-[#e5e5e5] text-[var(--green-primary)] focus:ring-[var(--green-primary)] focus:ring-offset-0"
            />
            <span className="text-sm text-[var(--text-muted)]">Ingat saya</span>
          </label>
          <Link 
            href="/forgot-password"
            className="text-sm font-semibold text-[var(--green-primary)] hover:text-[var(--green-dark)] transition-colors"
          >
            Lupa Password?
          </Link>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-4 px-6 rounded-full bg-[var(--green-primary)] text-white font-extrabold text-base flex items-center justify-center gap-2.5 shadow-[0_12px_28px_rgba(29,140,60,0.28)] hover:bg-[var(--green-dark)] hover:shadow-[0_18px_36px_rgba(11,48,24,0.3)] hover:-translate-y-0.5 transition-all disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:transform-none"
        >
          {isLoading ? (
            <>
              <FontAwesomeIcon icon={faSpinner} className="w-5 h-5 animate-spin" />
              Memproses...
            </>
          ) : (
            <>
              <FontAwesomeIcon icon={faRightToBracket} className="w-5 h-5" />
              Masuk
            </>
          )}
        </button>
      </form>

      {/* Divider */}
      <div className="relative my-8">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-[#e5e5e5]" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-4 bg-[var(--cream)] text-[var(--text-muted)]">atau</span>
        </div>
      </div>

      {/* Google Sign In */}
      <button
        type="button"
        className="w-full py-3.5 px-6 rounded-full border-2 border-[#e5e5e5] bg-white text-[var(--text-main)] font-bold text-sm flex items-center justify-center gap-2.5 hover:bg-[#f8f8f8] hover:border-[#d5d5d5] transition-all"
      >
        <FontAwesomeIcon icon={faGoogle} className="w-5 h-5 text-[#4285f4]" />
        Masuk dengan Google
      </button>

      {/* Register Link */}
      <p className="text-center mt-8 text-[var(--text-muted)]">
        Belum punya akun?{" "}
        <Link 
          href="/register"
          className="font-bold text-[var(--green-primary)] hover:text-[var(--green-dark)] transition-colors"
        >
          Daftar Sekarang
        </Link>
      </p>
    </div>
  )
}
