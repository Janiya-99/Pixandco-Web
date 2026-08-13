export type Post = {
  slug: string
  title: string
  category: string
  date: string
  excerpt: string
  image: string
  readingTime: string
  content: { heading: string; body: string }[]
}
