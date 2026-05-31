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
      {/* Subtle ambient glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] pointer-events-none"
        style={{
          background: "radial-gradient(ellipse, rgba(249,115,22,0.07) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
        <div className="flex flex-col items-center justify-center gap-[23px] py-[119px]">

          {/* Badge */}
          <div>
            <Link href="/about" className="btn-ghost gap-3" style={{ fontSize: "15px" }}>
              A probabilistic framework for diaspora temples
              <MoveRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Headline */}
          <div className="flex flex-col gap-[23px] items-center">
            <h1
              className="font-display text-center font-bold text-[#FAFAF9]"
              style={{
                fontSize: "clamp(3rem, 7vw, 63px)",
                lineHeight: 0.91,
                letterSpacing: "-0.63px",
              }}
            >
              NC&apos;s diaspora temples,
              <span className="relative flex w-full justify-center overflow-hidden text-center mt-3 pb-2">
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
              className="max-w-2xl text-center text-[#A8A29E]"
              style={{ fontSize: "17px", lineHeight: 1.61 }}
            >
              Deepam uses public signals and a hidden Markov model to identify
              Hindu diaspora temples in North Carolina that may benefit from
              increased community support, before they are forced into ritual
              concessions.
            </p>
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Link href="/about" className="btn-ghost">
              How it works <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/temples" className="btn-primary">
              Explore temples <MoveRight className="w-4 h-4" />
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
}

export { Hero };
