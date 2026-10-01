"use client"

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
  return (
    <section className="bg-[#010004] pt-8 pb-16 lg:pt-[60px] lg:pb-[100px]">
      <Container className="max-w-[1240px]">
        <p className="eyebrow mb-8 text-center text-white/45 tracking-[0.2em] md:mb-10">
          TRUSTED COMPANIES ACROSS INDUSTRIES
        </p>
        <div className="grid grid-cols-2 border-l border-t border-[#212121] md:grid-cols-5">
          {trustedCompanies.map((company) => (
            <div
              key={company.name}
              className="group flex h-[100px] items-center justify-center border-b border-r border-[#212121] px-4 transition-colors duration-300 hover:bg-[#1a1a1d]/60 md:h-[110px] md:px-6"
            >
              <Image
                src={company.logo}
                alt={company.name}
                width={company.width}
                height={company.height}
                className={`w-auto max-w-[115px] object-contain opacity-60 transition-opacity duration-300 group-hover:opacity-100 md:max-w-[125px] ${company.logoHeight}`}
              />
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}
