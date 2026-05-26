"use client"

import { useState, useRef, useEffect, KeyboardEvent } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCommentDots, faXmark, faPaperPlane } from "@fortawesome/free-solid-svg-icons"

interface Message {
  text: string
  role: "bot" | "user"
  time: string
}

const quickReplies = [
  { emoji: "💰", text: "Berapa tarif ojeknya?" },
  { emoji: "📱", text: "Bagaimana cara memesan?" },
  { emoji: "🛡️", text: "Apakah AgriRide aman?" },
  { emoji: "🏍️", text: "Cara jadi driver AgriRide?" },
]

function getLocalFallback(text: string): string {
  const t = text.toLowerCase()
  if (t.includes("harga") || t.includes("tarif") || t.includes("biaya") || t.includes("bayar")) {
    return "Tarif AgriRide flat Rp 5.000 untuk rute standar di dalam kampus IPB! 🤑 Untuk rute yang lebih jauh bisa Rp 7.500. Bayar via QRIS, cashless banget!"
  } else if (t.includes("driver") && (t.includes("jadi") || t.includes("daftar") || t.includes("gabung"))) {
    return "Mau jadi driver AgriRide? Keren! 🏍️ Caranya: daftar akun, upload KTM, verifikasi email kampus, ikuti orientasi singkat, lalu langsung bisa terima order. Penghasilan fleksibel sesuai jadwal kuliah!"
  } else if (t.includes("driver")) {
    return "Semua driver AgriRide adalah mahasiswa aktif IPB yang sudah diverifikasi KTM-nya 🎓 Jadi aman dan terpercaya! Saat ini ada 15+ driver aktif."
  } else if (t.includes("aman") || t.includes("keamanan") || t.includes("verifikasi")) {
    return "AgriRide sangat aman! 🛡️ Semua pengguna wajib verifikasi KTM + email kampus IPB. Perjalanan dipantau GPS real-time, dan driver-nya sesama mahasiswa IPB. Aman, deh!"
  } else if (t.includes("cara") || t.includes("pesan") || t.includes("order") || t.includes("booking")) {
    return "Cara pesan gampang banget! 📱 (1) Daftar pakai email kampus, (2) Pilih titik jemput & tujuan, (3) Tunggu driver terdekat datang, (4) Sampai tujuan, bayar QRIS. Selesai! ✅"
  } else if (t.includes("jam") || t.includes("buka") || t.includes("operasi") || t.includes("waktu")) {
    return "AgriRide beroperasi Senin–Sabtu jam 06.00–21.00, dan Minggu 08.00–18.00 ⏰ Cukup panjang buat nutupin semua jadwal kuliahmu!"
  } else if (t.includes("qris") || t.includes("bayar") || t.includes("pembayaran")) {
    return "Pembayaran 100% via QRIS — scan & bayar, cashless dan praktis! 💳 Nggak perlu ribet nyari kembalian. Langsung beres setelah sampai tujuan!"
  } else if (t.includes("kontak") || t.includes("hubungi") || t.includes("bantuan") || t.includes("help")) {
    return "Bisa hubungi kami via 📧 hello@agriride.id, WhatsApp, atau Instagram @agriride.ipb. Tim kami siap bantu kamu! 😊"
  } else if (t.includes("halo") || t.includes("hi") || t.includes("hey") || t.includes("hai")) {
    return "Halo! Saya AgriBot, asisten AI AgriRide 🛵 Mau tanya soal tarif, cara pesan, keamanan, atau cara jadi driver? Tanyain aja!"
  } else {
    return "Hmm, aku belum bisa jawab pertanyaan itu secara spesifik 😅 Tapi kamu bisa tanya soal tarif, cara pesan, keamanan, atau cara jadi driver. Atau hubungi kami di hello@agriride.id ya!"
  }
}

function getTimeStr(): string {
  return new Date().toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" })
}

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      text: "Halo! Saya AgriBot 🛵 Asisten AI AgriRide yang siap bantu kamu. Mau tanya soal harga, cara pesan, keamanan, atau hal lain?",
      role: "bot",
      time: "Sekarang",
    },
  ])
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [showQuickReplies, setShowQuickReplies] = useState(true)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages, isTyping])

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isOpen])

  const sendMessage = async (text: string) => {
    if (!text.trim()) return

    setShowQuickReplies(false)

    // Add user message
    const userMessage: Message = {
      text,
      role: "user",
      time: getTimeStr(),
    }
    setMessages((prev) => [...prev, userMessage])
    setInputValue("")

    // Show typing indicator
    setIsTyping(true)

    // Simulate delay
    await new Promise((resolve) => setTimeout(resolve, 1000 + Math.random() * 500))

    // Get bot response
    const botReply = getLocalFallback(text)

    setIsTyping(false)

    // Add bot message
    const botMessage: Message = {
      text: botReply,
      role: "bot",
      time: getTimeStr(),
    }
    setMessages((prev) => [...prev, botMessage])
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      sendMessage(inputValue)
    }
  }

  return (
    <div className="fixed bottom-7 right-7 z-[2000]">
      {/* Chat Window */}
      {isOpen && (
        <div 
          className="absolute bottom-[78px] right-0 w-[360px] max-w-[calc(100vw-56px)] h-[520px] bg-white rounded-[var(--radius-lg)] shadow-[0_25px_70px_rgba(0,0,0,0.22)] flex flex-col overflow-hidden border-[1.5px] border-black/[0.07] animate-chat-open"
        >
          {/* Header */}
          <div className="bg-[var(--green-dark)] text-white py-[18px] px-5 flex items-center gap-3.5 shrink-0">
            <div className="w-10 h-10 rounded-full bg-white/15 grid place-items-center text-lg shrink-0">
              🤖
            </div>
            <div className="flex-1">
              <div className="font-extrabold text-[15px]">AgriBot AI</div>
              <div className="text-xs text-[var(--green-light)] flex items-center gap-[5px]">
                <span className="w-1.5 h-1.5 bg-[var(--green-light)] rounded-full" />
                Online — siap membantu
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="bg-transparent border-none text-white/70 hover:text-white cursor-pointer text-lg p-1 transition-colors"
            >
              <FontAwesomeIcon icon={faXmark} />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 p-[18px] overflow-y-auto flex flex-col gap-3 bg-[#f8fafb]">
            {messages.map((msg, index) => (
              <div key={index} className={`flex flex-col ${msg.role === "user" ? "items-end" : "items-start"}`}>
                <div
                  className={`py-[11px] px-4 rounded-[18px] max-w-[82%] leading-[1.55] text-sm break-words ${
                    msg.role === "user"
                      ? "bg-[var(--green-primary)] text-white rounded-br-[4px]"
                      : "bg-white text-[var(--text-main)] rounded-bl-[4px] shadow-[0_2px_8px_rgba(0,0,0,0.07)]"
                  }`}
                >
                  {msg.text}
                </div>
                <div className={`text-[11px] text-[#aaa] mt-0.5 ${msg.role === "user" ? "text-right" : ""}`}>
                  {msg.time}
                </div>
              </div>
            ))}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex items-start">
                <div className="bg-white py-3 px-4 rounded-[18px] rounded-bl-[4px] shadow-[0_2px_8px_rgba(0,0,0,0.07)] flex gap-[5px] items-center">
                  <div className="w-2 h-2 rounded-full bg-[#bbb] animate-typing" />
                  <div className="w-2 h-2 rounded-full bg-[#bbb] animate-typing" style={{ animationDelay: "0.2s" }} />
                  <div className="w-2 h-2 rounded-full bg-[#bbb] animate-typing" style={{ animationDelay: "0.4s" }} />
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Replies */}
          {showQuickReplies && (
            <div className="flex flex-wrap gap-2 px-[18px] pb-3 shrink-0">
              {quickReplies.map((reply, index) => (
                <button
                  key={index}
                  onClick={() => sendMessage(reply.text)}
                  className="py-2 px-3.5 rounded-full border-[1.5px] border-[#e0e0e0] bg-white text-xs font-semibold text-[var(--green-primary)] hover:bg-[var(--green-primary)] hover:text-white hover:border-[var(--green-primary)] transition-all cursor-pointer"
                >
                  {reply.emoji} {reply.text.split(" ")[0]}
                </button>
              ))}
            </div>
          )}

          {/* Input Area */}
          <div className="py-3.5 px-4 border-t border-[#f0f0f0] flex items-center gap-2.5 bg-white shrink-0">
            <input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Tanya apa saja tentang AgriRide..."
              className="flex-1 border-[1.5px] border-[#e8e8e8] py-[11px] px-4 outline-none text-sm rounded-full bg-[#f8fafb] text-[var(--text-main)] focus:border-[var(--green-primary)] focus:bg-white transition-all placeholder:text-[#aaa]"
            />
            <button
              onClick={() => sendMessage(inputValue)}
              disabled={!inputValue.trim()}
              className="w-[42px] h-[42px] rounded-full bg-[var(--green-primary)] border-none cursor-pointer text-white grid place-items-center hover:bg-[var(--green-dark)] hover:scale-[1.08] active:scale-95 transition-all shrink-0 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              <FontAwesomeIcon icon={faPaperPlane} />
            </button>
          </div>
        </div>
      )}

      {/* Chat Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-[62px] h-[62px] bg-[var(--green-dark)] text-white rounded-full grid place-items-center text-[26px] cursor-pointer shadow-[0_8px_28px_rgba(11,48,24,0.4)] border-[3px] border-white/15 transition-all hover:scale-110 hover:rotate-[-5deg] ${
          isOpen ? "" : "animate-chat-pulse"
        }`}
        title="Chat dengan AgriBot AI"
      >
        <FontAwesomeIcon icon={isOpen ? faXmark : faCommentDots} />
      </button>
    </div>
  )
}
