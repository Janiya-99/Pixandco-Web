const names = ["NOTION", "HUBSPOT", "SLACK", "OPENAI", "STRIPE", "MAKE", "AIRTABLE", "POSTGRES"]

export function LogoMarquee() {
  const items = [...names, ...names]
  return <div className="overflow-hidden border-y border-white/10 py-7" aria-label="Technology integrations"><div className="marquee-track flex w-max items-center">{items.map((name, index) => <span key={`${name}-${index}`} className="w-44 shrink-0 text-center text-sm font-medium tracking-[.15em] text-white/40 transition-colors hover:text-white/80 md:w-56">{name}</span>)}</div></div>
}
