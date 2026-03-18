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
  src = "/images/profile.png", // Local image from public folder
  alt = "Ankit Yadav",
  size = "md",
  className = "",
  showGlow = false,
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
      {/* Photo frame with simple border */}
      <div className="relative w-full h-full rounded-full overflow-hidden border border-gray-600">
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
      </div>

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
