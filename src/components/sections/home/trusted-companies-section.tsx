"use client"

import * as React from "react"
import Image from "next/image"
import { Container } from "@/components/layout/container"

const trustedCompanies = [
  {
    name: "Shinta",
    logo: "/images/site/1u8H6mP6vhZLd0xVrSiW9moQdc32.webp",
    width: 540,
    height: 140,
    logoHeight: "h-[26px] md:h-[29px]",
  },
  {
    name: "RAMA",
    logo: "/images/site/cPEkYEN8j0SgDsewIqTWVBVDuqA2f33.webp",
    width: 275,
    height: 171,
    logoHeight: "h-[26px] md:h-[28px]",
  },
  {
    name: "Pandawa",
    logo: "/images/site/nxa6pfbQtEYxdVeUqpkPW8Dsa4b929.webp",
    width: 581,
    height: 144,
    logoHeight: "h-[24px] md:h-[26px]",
  },
  {
    name: "Obima",
    logo: "/images/site/yGq9RhzlF3714t1PTOrdY8BGk7I1ba0.webp",
    width: 441,
    height: 144,
    logoHeight: "h-[24px] md:h-[26px]",
  },
  {
    name: "Sadewa",
    logo: "/images/site/qm9i22nLv4VG7J0tmUDBv0l5jMId021.webp",
    width: 617,
    height: 144,
    logoHeight: "h-[21px] md:h-[23px]",
  },
  {
    name: "NAKULA",
    logo: "/images/site/PBDnGSqWR1joHAbTPGiRzmPm8Dc1828.webp",
    width: 414,
    height: 144,
    logoHeight: "h-[24px] md:h-[26px]",
  },
  {
    name: "BATAVIA",
    logo: "/images/site/qnG1f8Uqexmf9rfolflT0b3fTs346d.webp",
    width: 657,
    height: 144,
    logoHeight: "h-[17px] md:h-[19px]",
  },
  {
    name: "BLOCKHAUS.",
    logo: "/images/site/iCEg6GaMkQTFNk2qzxaPxmYCuk28f7.webp",
    width: 599,
    height: 144,
    logoHeight: "h-[19px] md:h-[21px]",
  },
  {
    name: "Mandala",
    logo: "/images/site/Mld8FcmFfxKKmF9yh6rbn1Bk620f011.webp",
    width: 639,
    height: 144,
    logoHeight: "h-[24px] md:h-[26px]",
  },
  {
    name: "VELOX THEMES",
    logo: "/images/site/r2YvmLhS92NVgMeXKrRsaKHOxQ9ed7.webp",
    width: 738,
    height: 144,
    logoHeight: "h-[20px] md:h-[22px]",
  },
] as const

export function TrustedCompaniesSection() {
  const containerRef = React.useRef<HTMLDivElement>(null)
  const [coords, setCoords] = React.useState<{ x: number; y: number } | null>(null)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    setCoords({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    })
  }

  const handleMouseLeave = () => {
    setCoords(null)
  }

  return (
    <section className="bg-[#010004] pt-8 pb-16 lg:pt-[60px] lg:pb-[100px]">
      <Container className="max-w-[1240px]">
        <p className="eyebrow mb-8 text-center text-white/45 tracking-[0.2em] md:mb-10">
          TRUSTED COMPANIES ACROSS INDUSTRIES
        </p>
        
        {/* Precision Interactive Grid */}
        <div
          ref={containerRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="relative grid grid-cols-2 border-l border-t border-[#212121] md:grid-cols-5"
        >
          {/* Subtle monochrome ambient light on cursor hover (behind cards at z-0) */}
          {coords && (
            <div
              className="pointer-events-none absolute inset-0 z-0 transition-opacity duration-300"
              style={{
                background: `radial-gradient(380px circle at ${coords.x}px ${coords.y}px, rgba(255, 255, 255, 0.035), transparent 70%)`,
              }}
            />
          )}

          {trustedCompanies.map((company) => (
            <div
              key={company.name}
              className="group relative z-10 h-[100px] min-h-[100px] border-b border-r border-[#212121] cursor-pointer hover:z-40 md:h-[110px] md:min-h-[110px]"
            >
              {/* Underlying slot in the grid cell (turns to slot color when card lifts) */}
              <div className="absolute inset-0 bg-transparent transition-colors duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:bg-[#1a1a1d]" />

              {/* Lifted foreground grid card: translates cleanly in 3D with high z-index and precision hairline border */}
              <div className="absolute inset-0 z-20 flex h-full w-full items-center justify-center border border-transparent bg-transparent px-4 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] will-change-transform group-hover:-translate-y-2 group-hover:translate-x-2 group-hover:z-50 group-hover:bg-[#010004] group-hover:border-[#38383e] group-hover:shadow-[0_20px_40px_rgba(0,0,0,0.95),0_0_0_1px_rgba(255,255,255,0.08)] md:px-6">
                <Image
                  src={company.logo}
                  alt={company.name}
                  width={company.width}
                  height={company.height}
                  className={`w-auto max-w-[115px] object-contain opacity-50 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:opacity-100 group-hover:brightness-125 md:max-w-[125px] ${company.logoHeight}`}
                />
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}
