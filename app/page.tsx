"use client"

import { useEffect } from "react"
import Navbar from "@/components/agriride/navbar"
import Hero from "@/components/agriride/hero"
import Features from "@/components/agriride/features"
import HowItWorks from "@/components/agriride/how-it-works"
import BookingSection from "@/components/agriride/booking-section"
import Testimonials from "@/components/agriride/testimonials"
import Footer from "@/components/agriride/footer"
import ChatWidget from "@/components/agriride/chat-widget"
import Toast from "@/components/agriride/toast"

export default function HomePage() {
  useEffect(() => {
    // Intersection Observer for fade-up animations
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, i) => {
          if (entry.isIntersecting) {
            setTimeout(() => entry.target.classList.add("visible"), i * 80)
          }
        })
      },
      { threshold: 0.1 }
    )

    document.querySelectorAll(".fade-up").forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Features />
        <HowItWorks />
        <BookingSection />
        <Testimonials />
      </main>
      <Footer />
      <ChatWidget />
      <Toast />
    </>
  )
}
