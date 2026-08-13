export type Project = {
  slug: string
  title: string
  year: string
  industry: string
  summary: string
  coverImage: string
  services: string[]
  challenge: string
  approach: string
  result: string
  metrics: { value: string; label: string }[]
}
