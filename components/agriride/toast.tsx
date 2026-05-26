"use client"

import { createContext, useContext, useState, useCallback, ReactNode } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faMotorcycle } from "@fortawesome/free-solid-svg-icons"

interface ToastContextType {
  showToast: (message: string) => void
}

const ToastContext = createContext<ToastContextType | undefined>(undefined)

export function useToast() {
  const context = useContext(ToastContext)
  if (!context) {
    // Return a no-op function if used outside provider
    return { showToast: () => {} }
  }
  return context
}

export function ToastProvider({ children }: { children: ReactNode }) {
  const [message, setMessage] = useState("")
  const [isVisible, setIsVisible] = useState(false)

  const showToast = useCallback((msg: string) => {
    setMessage(msg)
    setIsVisible(true)
    setTimeout(() => setIsVisible(false), 3500)
  }, [])

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <Toast message={message} isVisible={isVisible} />
    </ToastContext.Provider>
  )
}

interface ToastProps {
  message: string
  isVisible: boolean
}

function ToastComponent({ message, isVisible }: ToastProps) {
  return (
    <div
      className={`fixed top-[90px] right-7 z-[3000] bg-[var(--green-dark)] text-white py-4 px-[22px] rounded-[var(--radius-md)] font-bold text-sm shadow-[var(--shadow-lg)] flex items-center gap-3 transition-transform duration-[400ms] ${
        isVisible ? "translate-x-0" : "translate-x-[120%]"
      }`}
      style={{ transitionTimingFunction: "cubic-bezier(0.34, 1.56, 0.64, 1)" }}
    >
      <FontAwesomeIcon icon={faMotorcycle} className="text-lg" />
      <span>{message}</span>
    </div>
  )
}

// Default export for standalone use
export default function Toast() {
  const [message, setMessage] = useState("Driver ditemukan! ETA 3 menit.")
  const [isVisible, setIsVisible] = useState(false)

  // Expose showToast globally for standalone use
  if (typeof window !== "undefined") {
    (window as Window & { showAgriRideToast?: (msg: string) => void }).showAgriRideToast = (msg: string) => {
      setMessage(msg)
      setIsVisible(true)
      setTimeout(() => setIsVisible(false), 3500)
    }
  }

  return <ToastComponent message={message} isVisible={isVisible} />
}

export { ToastComponent as Toast }
