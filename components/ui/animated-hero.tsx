"use client";
import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { MoveRight, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

function Hero() {
  const [titleNumber, setTitleNumber] = useState(0);
  const titles = useMemo(
    () => ["mapped", "monitored", "supported", "visible", "sustained"],
    []
  );

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (titleNumber === titles.length - 1) {
        setTitleNumber(0);
      } else {
        setTitleNumber(titleNumber + 1);
      }
    }, 2000);
    return () => clearTimeout(timeoutId);
  }, [titleNumber, titles]);

  return (
    <div className="w-full min-h-[100dvh] bg-[#0D0A07] flex items-center">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex gap-8 py-24 lg:py-40 items-center justify-center flex-col">

          {/* Badge */}
          <div>
            <Button variant="secondary" size="sm" className="gap-3 font-body">
              A probabilistic framework for diaspora temples
              <MoveRight className="w-4 h-4" />
            </Button>
          </div>

          {/* Headline + animated word */}
          <div className="flex gap-5 flex-col">
            <h1 className="font-display text-5xl md:text-7xl max-w-2xl tracking-tight text-center font-semibold leading-[1.05]">
              <span className="text-[#FAFAF9]">NC&apos;s diaspora temples,</span>
              <span className="relative flex w-full justify-center overflow-hidden text-center md:pb-4 md:pt-1">
                &nbsp;
                {titles.map((title, index) => (
                  <motion.span
                    key={index}
                    className="absolute font-semibold text-[#F59E0B]"
                    initial={{ opacity: 0, y: "-100%" }}
                    transition={{ type: "spring", stiffness: 50 }}
                    animate={
                      titleNumber === index
                        ? { y: 0, opacity: 1 }
                        : {
                            y: titleNumber > index ? -150 : 150,
                            opacity: 0,
                          }
                    }
                  >
                    {title}.
                  </motion.span>
                ))}
              </span>
            </h1>

            <p className="font-body text-lg md:text-xl leading-relaxed tracking-tight text-[#78716C] max-w-2xl text-center">
              Deepam uses public signals and a hidden Markov model to identify
              Hindu diaspora temples in North Carolina that may benefit from
              increased community support, before they are forced into ritual
              concessions.
            </p>
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Button size="lg" className="gap-3 font-body" variant="outline" asChild>
              <Link href="/about">
                How it works <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
            <Button size="lg" className="gap-3 font-body" asChild>
              <Link href="/temples">
                Explore temples <MoveRight className="w-4 h-4" />
              </Link>
            </Button>
          </div>

        </div>
      </div>
    </div>
  );
}

export { Hero };
