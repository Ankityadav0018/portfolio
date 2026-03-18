"use client";
import { motion } from "framer-motion";
import Image from "next/image";

interface PhotoProps {
  src?: string;
  alt?: string;
  size?: "sm" | "md" | "lg";
  className?: string;
  showGlow?: boolean;
}

export default function Photo({
  src = "/Users/ankityadav/Downloads/portfolio/public/images/profile.JPG", // Default path - place your photo in public/images folder
  alt = "Ankit Yadav",
  size = "md",
  className = "",
  showGlow = true,
}: PhotoProps) {
  const sizeClasses = {
    sm: "w-32 h-32",
    md: "w-48 h-48",
    lg: "w-64 h-64",
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, delay: 0.15 }}
      className={`relative ${sizeClasses[size]} mx-auto mb-8 ${className}`}
    >
      {/* Animated glow background */}
      {showGlow && (
        <>
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500 rounded-full blur-2xl opacity-40"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.4, 0.6, 0.4],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full blur-3xl opacity-20"
            animate={{
              scale: [1.2, 1, 1.2],
              opacity: [0.2, 0.3, 0.2],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.5,
            }}
          />
        </>
      )}

      {/* Photo frame with border */}
      <motion.div
        className="relative w-full h-full rounded-full border-2 border-purple-500/30 overflow-hidden bg-gray-900/50 backdrop-blur-sm"
        whileHover={{
          borderColor: "rgba(168, 85, 247, 0.6)",
          boxShadow: "0 0 30px rgba(168,85,247,0.3)",
        }}
        transition={{ duration: 0.3 }}
      >
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover"
          priority
          onError={(e) => {
            // Fallback if image fails to load
            const target = e.target as HTMLImageElement;
            target.style.display = "none";
          }}
        />

        {/* Fallback avatar if image doesn't load */}
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-purple-900/50 to-cyan-900/50 text-4xl">
          
        </div>
      </motion.div>

      {/* Optional: Badge or status indicator */}
      <motion.div
        className="absolute -bottom-2 -right-2 px-4 py-2 bg-gradient-to-r from-purple-500 to-cyan-500 text-white text-xs font-bold rounded-full shadow-lg"
        whileHover={{ scale: 1.1 }}
        transition={{ duration: 0.2 }}
      >
        Available
      </motion.div>
    </motion.div>
  );
}
