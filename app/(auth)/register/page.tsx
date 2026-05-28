"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { createClient } from "@/lib/supabase"
import { 
  faEnvelope, 
  faLock, 
  faEye, 
  faEyeSlash, 
  faUserPlus,
  faSpinner,
  faUser,
  faPhone,
  faIdCard,
  faCheck
} from "@fortawesome/free-solid-svg-icons"
import { faGoogle } from "@fortawesome/free-brands-svg-icons"

type UserRole = "penumpang" | "driver"

export default function RegisterPage() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [userRole, setUserRole] = useState<UserRole>("penumpang")
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    nim: "",
    password: "",
    confirmPassword: "",
    agreeTerms: false,
  })
  const [errors, setErrors] = useState<Record<string, string>>({})

  const validateForm = () => {
    const newErrors: Record<string, string> = {}
    
    if (!formData.fullName.trim()) {
      newErrors.fullName = "Nama lengkap wajib diisi"
    }
    
    if (!formData.email) {
      newErrors.email = "Email wajib diisi"
    } else if (!formData.email.endsWith("@apps.ipb.ac.id") && !formData.email.endsWith("@ipb.ac.id")) {
      newErrors.email = "Gunakan email kampus IPB (@apps.ipb.ac.id)"
    }
    
    if (!formData.phone) {
      newErrors.phone = "Nomor HP wajib diisi"
    } else if (!/^08[0-9]{9,11}$/.test(formData.phone)) {
      newErrors.phone = "Format nomor HP tidak valid"
    }
    
    if (!formData.nim) {
      newErrors.nim = "NIM wajib diisi"
    } else if (!/^[A-Z][0-9]{10}$/.test(formData.nim)) {
      newErrors.nim = "Format NIM tidak valid (contoh: G1234567890)"
    }
    
    if (!formData.password) {
      newErrors.password = "Password wajib diisi"
    } else if (formData.password.length < 8) {
      newErrors.password = "Password minimal 8 karakter"
    }
    
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Konfirmasi password wajib diisi"
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Password tidak sama"
    }
    
    if (!formData.agreeTerms) {
      newErrors.agreeTerms = "Kamu harus menyetujui syarat dan ketentuan"
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault()
  if (!validateForm()) return
  setIsLoading(true)

  const supabase = createClient()
  const { data, error } = await supabase.auth.signUp({
    email: formData.email,
    password: formData.password,
    options: {
      data: {
        full_name: formData.fullName,
        phone: formData.phone,
        nim: formData.nim,
        role: userRole,
      },
    },
  })

  if (error) {
    setErrors({ email: error.message })
  } else if (data.user) {
    await supabase.from('users').insert({
      id: data.user.id,
      full_name: formData.fullName,
      email: formData.email,
      phone: formData.phone,
      nim: formData.nim,
      role: userRole,
      is_verified: false,
    })
    router.push("/login?registered=true")
  }

  setIsLoading(false)
}

  const inputClasses = (fieldName: string) => 
    `w-full px-4 py-3.5 rounded-xl border-2 bg-[#fafafa] text-[var(--text-main)] placeholder:text-[#aaa] focus:outline-none focus:bg-white transition-all ${
      errors[fieldName] 
        ? "border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-500/10" 
        : "border-[#e5e5e5] focus:border-[var(--green-primary)] focus:ring-2 focus:ring-[var(--green-primary)]/10"
    }`

  return (
    <div>
      <h1 className="text-3xl font-black text-[var(--green-dark)] mb-2">
        Buat Akun Baru 🚀
      </h1>
      <p className="text-[var(--text-muted)] mb-6">
        Daftar sekarang dan mulai perjalananmu bersama AgriRide
      </p>

      {/* Role Selection */}
      <div className="flex gap-3 mb-6">
        <button
          type="button"
          onClick={() => setUserRole("penumpang")}
          className={`flex-1 py-3 px-4 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 ${
            userRole === "penumpang"
              ? "bg-[var(--green-primary)] text-white shadow-[0_8px_20px_rgba(29,140,60,0.25)]"
              : "bg-white border-2 border-[#e5e5e5] text-[var(--text-muted)] hover:border-[var(--green-primary)] hover:text-[var(--green-primary)]"
          }`}
        >
          <FontAwesomeIcon icon={faUser} className="w-4 h-4" />
          Penumpang
        </button>
        <button
          type="button"
          onClick={() => setUserRole("driver")}
          className={`flex-1 py-3 px-4 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 ${
            userRole === "driver"
              ? "bg-[var(--orange)] text-white shadow-[0_8px_20px_rgba(255,122,47,0.25)]"
              : "bg-white border-2 border-[#e5e5e5] text-[var(--text-muted)] hover:border-[var(--orange)] hover:text-[var(--orange)]"
          }`}
        >
          <FontAwesomeIcon icon={faIdCard} className="w-4 h-4" />
          Driver
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Full Name Field */}
        <div>
          <label className="flex items-center gap-2 font-extrabold text-sm text-[var(--text-main)] mb-2">
            <FontAwesomeIcon icon={faUser} className="text-[var(--green-primary)] w-4 h-4" />
            Nama Lengkap
          </label>
          <input
            type="text"
            placeholder="Masukkan nama lengkap"
            value={formData.fullName}
            onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
            className={inputClasses("fullName")}
          />
          {errors.fullName && (
            <p className="text-red-500 text-sm mt-1.5">{errors.fullName}</p>
          )}
        </div>

        {/* Email Field */}
        <div>
          <label className="flex items-center gap-2 font-extrabold text-sm text-[var(--text-main)] mb-2">
            <FontAwesomeIcon icon={faEnvelope} className="text-[var(--green-primary)] w-4 h-4" />
            Email Kampus
          </label>
          <input
            type="email"
            placeholder="nama@apps.ipb.ac.id"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className={inputClasses("email")}
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1.5">{errors.email}</p>
          )}
        </div>

        {/* Phone & NIM Row */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="flex items-center gap-2 font-extrabold text-sm text-[var(--text-main)] mb-2">
              <FontAwesomeIcon icon={faPhone} className="text-[var(--green-primary)] w-4 h-4" />
              No. HP
            </label>
            <input
              type="tel"
              placeholder="08xxxxxxxxxx"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className={inputClasses("phone")}
            />
            {errors.phone && (
              <p className="text-red-500 text-sm mt-1.5">{errors.phone}</p>
            )}
          </div>
          <div>
            <label className="flex items-center gap-2 font-extrabold text-sm text-[var(--text-main)] mb-2">
              <FontAwesomeIcon icon={faIdCard} className="text-[var(--green-primary)] w-4 h-4" />
              NIM
            </label>
            <input
              type="text"
              placeholder="G1234567890"
              value={formData.nim}
              onChange={(e) => setFormData({ ...formData, nim: e.target.value.toUpperCase() })}
              className={inputClasses("nim")}
            />
            {errors.nim && (
              <p className="text-red-500 text-sm mt-1.5">{errors.nim}</p>
            )}
          </div>
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
              placeholder="Minimal 8 karakter"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className={`${inputClasses("password")} pr-12`}
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

        {/* Confirm Password Field */}
        <div>
          <label className="flex items-center gap-2 font-extrabold text-sm text-[var(--text-main)] mb-2">
            <FontAwesomeIcon icon={faCheck} className="text-[var(--green-primary)] w-4 h-4" />
            Konfirmasi Password
          </label>
          <div className="relative">
            <input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Ulangi password"
              value={formData.confirmPassword}
              onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
              className={`${inputClasses("confirmPassword")} pr-12`}
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-[var(--text-muted)] hover:text-[var(--green-primary)] transition-colors"
            >
              <FontAwesomeIcon icon={showConfirmPassword ? faEyeSlash : faEye} className="w-5 h-5" />
            </button>
          </div>
          {errors.confirmPassword && (
            <p className="text-red-500 text-sm mt-1.5">{errors.confirmPassword}</p>
          )}
        </div>

        {/* Terms Checkbox */}
        <div>
          <label className="flex items-start gap-2.5 cursor-pointer">
            <input
              type="checkbox"
              checked={formData.agreeTerms}
              onChange={(e) => setFormData({ ...formData, agreeTerms: e.target.checked })}
              className="w-4 h-4 mt-0.5 rounded border-2 border-[#e5e5e5] text-[var(--green-primary)] focus:ring-[var(--green-primary)] focus:ring-offset-0"
            />
            <span className="text-sm text-[var(--text-muted)]">
              Saya menyetujui{" "}
              <Link href="/terms" className="text-[var(--green-primary)] font-semibold hover:underline">
                Syarat & Ketentuan
              </Link>{" "}
              serta{" "}
              <Link href="/privacy" className="text-[var(--green-primary)] font-semibold hover:underline">
                Kebijakan Privasi
              </Link>{" "}
              AgriRide
            </span>
          </label>
          {errors.agreeTerms && (
            <p className="text-red-500 text-sm mt-1.5">{errors.agreeTerms}</p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading}
          className={`w-full py-4 px-6 rounded-full text-white font-extrabold text-base flex items-center justify-center gap-2.5 hover:-translate-y-0.5 transition-all disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:transform-none ${
            userRole === "driver"
              ? "bg-[var(--orange)] shadow-[0_12px_28px_rgba(255,122,47,0.28)] hover:bg-[#e56a1f] hover:shadow-[0_18px_36px_rgba(255,122,47,0.3)]"
              : "bg-[var(--green-primary)] shadow-[0_12px_28px_rgba(29,140,60,0.28)] hover:bg-[var(--green-dark)] hover:shadow-[0_18px_36px_rgba(11,48,24,0.3)]"
          }`}
        >
          {isLoading ? (
            <>
              <FontAwesomeIcon icon={faSpinner} className="w-5 h-5 animate-spin" />
              Mendaftar...
            </>
          ) : (
            <>
              <FontAwesomeIcon icon={faUserPlus} className="w-5 h-5" />
              {userRole === "driver" ? "Daftar Sebagai Driver" : "Daftar Sekarang"}
            </>
          )}
        </button>
      </form>

      {/* Divider */}
      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-[#e5e5e5]" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-4 bg-[var(--cream)] text-[var(--text-muted)]">atau</span>
        </div>
      </div>

      {/* Google Sign Up */}
      <button
        type="button"
        className="w-full py-3.5 px-6 rounded-full border-2 border-[#e5e5e5] bg-white text-[var(--text-main)] font-bold text-sm flex items-center justify-center gap-2.5 hover:bg-[#f8f8f8] hover:border-[#d5d5d5] transition-all"
      >
        <FontAwesomeIcon icon={faGoogle} className="w-5 h-5 text-[#4285f4]" />
        Daftar dengan Google
      </button>

      {/* Login Link */}
      <p className="text-center mt-6 text-[var(--text-muted)]">
        Sudah punya akun?{" "}
        <Link 
          href="/login"
          className="font-bold text-[var(--green-primary)] hover:text-[var(--green-dark)] transition-colors"
        >
          Masuk di sini
        </Link>
      </p>
    </div>
  )
}
