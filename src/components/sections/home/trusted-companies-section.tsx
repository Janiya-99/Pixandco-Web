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
        
        {/* Hairline Interactive Cursor Grid */}
        <div
          ref={containerRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="relative grid grid-cols-2 border-l border-t border-[#212121] md:grid-cols-5 overflow-hidden"
          style={{
            ["--cursor-x" as any]: coords ? `${coords.x}px` : "-9999px",
            ["--cursor-y" as any]: coords ? `${coords.y}px` : "-9999px",
          }}
        >
          {/* Hairline cursor crosshairs & radial light glow */}
          {coords && (
            <div
              className="pointer-events-none absolute inset-0 z-20 transition-opacity duration-300"
              style={{
                background: `
                  radial-gradient(420px circle at ${coords.x}px ${coords.y}px, rgba(255, 255, 255, 0.075), transparent 70%),
                  radial-gradient(120px circle at ${coords.x}px ${coords.y}px, rgba(239, 68, 68, 0.08), transparent 75%)
                `,
              }}
            >
              {/* Hairline 0.5px subtle crosshair following cursor */}
              <div
                className="absolute top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-white/20 to-transparent pointer-events-none"
                style={{ left: `${coords.x}px` }}
              />
              <div
                className="absolute left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none"
                style={{ top: `${coords.y}px` }}
              />
            </div>
          )}

          {trustedCompanies.map((company) => (
            <div
              key={company.name}
              className="group relative h-[100px] min-h-[100px] border-b border-r border-[#212121] cursor-pointer hover:z-30 md:h-[110px] md:min-h-[110px]"
            >
              {/* Hairline grid cell reactive backdrop */}
              <div className="absolute inset-0 bg-transparent transition-colors duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:bg-[#1a1a1d]" />

              {/* Lifted foreground grid card with black background & precision hairline edge */}
              <div className="absolute inset-0 top-0 left-0 flex h-full w-full items-center justify-center border border-transparent bg-transparent px-4 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] will-change-transform group-hover:-top-2 group-hover:left-2 group-hover:bg-[#010004] group-hover:border-[#38383e] group-hover:shadow-[0_16px_36px_rgba(0,0,0,0.85),_0_0_1px_1px_rgba(255,255,255,0.1)_inset] group-hover:z-10 md:px-6">
                <Image
                  src={company.logo}
                  alt={company.name}
                  width={company.width}
                  height={company.height}
                  className={`w-auto max-w-[115px] object-contain opacity-50 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:opacity-100 group-hover:brightness-125 md:max-w-[125px] ${company.logoHeight}`}
                />
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}
