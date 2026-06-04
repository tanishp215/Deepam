"use client";
import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { MoveRight, ArrowRight } from "lucide-react";
import Link from "next/link";

function Hero() {
  const [titleNumber, setTitleNumber] = useState(0);
  const titles = useMemo(
    () => ["mapped", "monitored", "supported", "visible", "sustained"],
    []
  );

  useEffect(() => {
    const id = setTimeout(() => {
      setTitleNumber((n) => (n === titles.length - 1 ? 0 : n + 1));
    }, 2000);
    return () => clearTimeout(id);
  }, [titleNumber, titles]);

  return (
    <div className="w-full min-h-[100dvh] bg-[#0D0A07] flex items-center relative overflow-hidden">
      {/* Mid-field ambient warmth */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] pointer-events-none"
        style={{
          background: "radial-gradient(ellipse, rgba(249,115,22,0.045) 0%, transparent 68%)",
          filter: "blur(90px)",
        }}
      />
      {/* Diya flame reference — warm column rising from the base */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 pointer-events-none"
        style={{
          width: "320px",
          height: "280px",
          background: "radial-gradient(ellipse at bottom, rgba(249,115,22,0.14) 0%, rgba(245,158,11,0.07) 45%, transparent 72%)",
          filter: "blur(28px)",
        }}
      />
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 pointer-events-none"
        style={{
          width: "2px",
          height: "160px",
          background: "linear-gradient(to top, rgba(249,115,22,0.5), transparent)",
          filter: "blur(1px)",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
        <div className="flex flex-col items-center justify-center gap-8 py-32">

          {/* Badge */}
          <Link href="/about" className="btn-ghost gap-3" style={{ fontSize: "14px", padding: "10px 20px" }}>
            A probabilistic framework for diaspora temples
            <MoveRight size={14} strokeWidth={1.75} />
          </Link>

          {/* Headline */}
          <div className="flex flex-col gap-6 items-center">
            <h1
              className="font-display text-center font-bold text-[#FAFAF9]"
              style={{
                fontSize: "clamp(2.75rem, 6.5vw, 60px)",
                lineHeight: 1.0,
                letterSpacing: "-0.025em",
              }}
            >
              NC&apos;s diaspora temples,
              <span className="relative flex w-full justify-center overflow-hidden text-center mt-3 pb-3">
                &nbsp;
                {titles.map((title, index) => (
                  <motion.span
                    key={index}
                    className="absolute font-bold"
                    style={{ color: "#F59E0B" }}
                    initial={{ opacity: 0, y: "-100%" }}
                    transition={{ type: "spring", stiffness: 50 }}
                    animate={
                      titleNumber === index
                        ? { y: 0, opacity: 1 }
                        : { y: titleNumber > index ? -150 : 150, opacity: 0 }
                    }
                  >
                    {title}.
                  </motion.span>
                ))}
              </span>
            </h1>

            <p
              className="max-w-lg text-center text-[#78716C]"
              style={{ fontSize: "16px", lineHeight: 1.7 }}
            >
              Public signals and a hidden Markov model, identifying Hindu diaspora
              temples in North Carolina that may benefit from community support
              before ritual concessions begin.
            </p>
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Link href="/about" className="btn-ghost">
              How it works <ArrowRight size={14} strokeWidth={1.75} />
            </Link>
            <Link href="/temples" className="btn-primary">
              Explore temples <MoveRight size={14} strokeWidth={1.75} />
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
}

export { Hero };
