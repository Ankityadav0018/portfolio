"use client";
import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Mail, MapPin, Send, CheckCircle, MessageCircle, Coffee, AlertCircle, Loader2 } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import emailjs from "@emailjs/browser";

const EMAILJS_SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || "";
const EMAILJS_TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || "";
const EMAILJS_PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || "";

export default function Contact() {
  const ref = useRef(null);
  const formRef = useRef<HTMLFormElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    setErrorMsg("");

    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message,
          to_name: "Ankit Yadav",
        },
        EMAILJS_PUBLIC_KEY
      );
      setStatus("success");
      setFormData({ name: "", email: "", message: "" });
      setTimeout(() => setStatus("idle"), 4000);
    } catch (err) {
      setStatus("error");
      setErrorMsg(
        err instanceof Error ? err.message : "Failed to send message. Please try again."
      );
      setTimeout(() => setStatus("idle"), 5000);
    }
  };

  const connectLinks = [
    { icon: <FaGithub size={20} />, label: "GitHub", href: "https://github.com/Ankityadav0018", color: "hover:text-white" },
    { icon: <FaLinkedin size={20} />, label: "LinkedIn", href: "https://www.linkedin.com/in/ankit-yadav01/", color: "hover:text-blue-400" },
    { icon: <Mail size={20} />, label: "Email", href: "mailto:ankitrao0018@gmail.com", color: "hover:text-purple-400" },
  ];

  return (
    <section id="contact" className="relative py-24 bg-gray-950">
      <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl" />

      <div className="max-w-6xl mx-auto px-6" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-sm font-medium text-purple-400 uppercase tracking-widest">
            Contact
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mt-3 mb-6">
            Let&apos;s{" "}
            <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
              connect
            </span>{" "}
            💬
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto text-lg">
            Open to internships, collaborations, freelance work, or just a friendly chat about tech!
          </p>
        </motion.div>

        <div className="grid md:grid-cols-5 gap-10">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="md:col-span-2 space-y-6"
          >
            {/* Quick connect card */}
            <div className="p-6 rounded-2xl bg-gray-900/50 border border-gray-800">
              <h3 className="text-lg font-semibold text-white mb-2 flex items-center gap-2">
                <Coffee size={18} className="text-purple-400" />
                Let&apos;s grab a virtual coffee!
              </h3>
              <p className="text-sm text-gray-500 mb-6">
                I&apos;m always excited to meet new people, discuss ideas, or explore opportunities.
              </p>

              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center text-purple-400 shrink-0">
                    <Mail size={18} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Email</p>
                    <a href="mailto:ankitrao0018@gmail.com" className="text-gray-300 hover:text-purple-400 transition-colors text-sm">
                      ankitrao0018@gmail.com
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center text-purple-400 shrink-0">
                    <MapPin size={18} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Location</p>
                    <p className="text-gray-300 text-sm">India 🇮🇳</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Social connect buttons */}
            <div className="p-6 rounded-2xl bg-gray-900/50 border border-gray-800">
              <h3 className="text-sm font-semibold text-gray-400 mb-4 flex items-center gap-2">
                <MessageCircle size={14} />
                Find me on
              </h3>
              <div className="space-y-2">
                {connectLinks.map((link, i) => (
                  <motion.a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.4 + i * 0.1 }}
                    whileHover={{ x: 4, transition: { duration: 0.2 } }}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl bg-gray-800/30 border border-gray-800 text-gray-400 ${link.color} hover:border-purple-500/30 transition-all group`}
                  >
                    {link.icon}
                    <span className="text-sm font-medium">{link.label}</span>
                    <span className="ml-auto text-gray-600 group-hover:text-gray-400 transition-colors text-xs">→</span>
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="md:col-span-3"
          >
            <form
              ref={formRef}
              onSubmit={handleSubmit}
              className="p-8 rounded-2xl bg-gray-900/50 border border-gray-800 space-y-5 relative overflow-hidden"
            >
              {/* Success overlay */}
              <AnimatedSuccess show={status === "success"} />
              {/* Error overlay */}
              <AnimatedError show={status === "error"} message={errorMsg} />

              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-400 mb-2">
                  Name
                </label>
                <motion.input
                  id="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  onFocus={() => setFocusedField("name")}
                  onBlur={() => setFocusedField(null)}
                  animate={{ borderColor: focusedField === "name" ? "rgba(168,85,247,0.5)" : "rgba(55,65,81,1)" }}
                  className="w-full px-4 py-3 rounded-xl bg-gray-800/50 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-purple-500/25 transition-all"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-400 mb-2">
                  Email
                </label>
                <motion.input
                  id="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  onFocus={() => setFocusedField("email")}
                  onBlur={() => setFocusedField(null)}
                  animate={{ borderColor: focusedField === "email" ? "rgba(168,85,247,0.5)" : "rgba(55,65,81,1)" }}
                  className="w-full px-4 py-3 rounded-xl bg-gray-800/50 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-purple-500/25 transition-all"
                  placeholder="your@email.com"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-400 mb-2">
                  Message
                </label>
                <motion.textarea
                  id="message"
                  rows={5}
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  onFocus={() => setFocusedField("message")}
                  onBlur={() => setFocusedField(null)}
                  animate={{ borderColor: focusedField === "message" ? "rgba(168,85,247,0.5)" : "rgba(55,65,81,1)" }}
                  className="w-full px-4 py-3 rounded-xl bg-gray-800/50 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-purple-500/25 transition-all resize-none"
                  placeholder="Hey Ankit! I'd love to chat about..."
                />
              </div>
              <motion.button
                type="submit"
                disabled={status === "sending"}
                whileHover={status !== "sending" ? { scale: 1.02, boxShadow: "0 0 25px rgba(168,85,247,0.2)" } : {}}
                whileTap={status !== "sending" ? { scale: 0.98 } : {}}
                className="w-full py-3.5 bg-gradient-to-r from-purple-500 to-cyan-500 text-white font-semibold rounded-xl transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {status === "sending" ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send size={18} />
                    Send Message
                  </>
                )}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function AnimatedSuccess({ show }: { show: boolean }) {
  if (!show) return null;
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }}
      className="absolute inset-0 z-20 bg-gray-900/95 rounded-2xl flex flex-col items-center justify-center gap-4"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 200, delay: 0.1 }}
      >
        <CheckCircle size={48} className="text-emerald-400" />
      </motion.div>
      <p className="text-white font-semibold text-lg">Message sent! 🎉</p>
      <p className="text-gray-400 text-sm">I&apos;ll get back to you soon.</p>
    </motion.div>
  );
}

function AnimatedError({ show, message }: { show: boolean; message: string }) {
  if (!show) return null;
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }}
      className="absolute inset-0 z-20 bg-gray-900/95 rounded-2xl flex flex-col items-center justify-center gap-4"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 200, delay: 0.1 }}
      >
        <AlertCircle size={48} className="text-red-400" />
      </motion.div>
      <p className="text-white font-semibold text-lg">Oops! Something went wrong</p>
      <p className="text-gray-400 text-sm text-center px-6">{message}</p>
    </motion.div>
  );
}
