import type { SvgComponent } from "astro/types"
import Email from "@/assets/icons/email.svg"
import GitHub from "@/assets/icons/github.svg"
import LinkedIn from "@/assets/icons/linkedin.svg"
import RSS from "@/assets/icons/rss.svg"

export const SITE = {
  title: "Fady I/O",
  author: "Fady Nagh",
  description:
    "Practical notes and guides about AWS, Kubernetes, Linux, privacy, and cloud-native infrastructure.",
  locale: "en-US",
  dir: "ltr",
  defaultPageImage: "/static/twitter-card.webp",
  defaultPostImage: "/static/twitter-card.webp",
} as const

export const NAVIGATION = [
  { href: "/blog", label: "Blog" },
  { href: "/projects", label: "Projects" },
  { href: "/pgp-key", label: "PGP Key" },
]

export const SOCIALS: { href: string; label: string; icon: SvgComponent }[] = [
  { href: "https://github.com/Fadyio", label: "GitHub", icon: GitHub },
  { href: "mailto:Fady@Fadyio.com", label: "Email", icon: Email },
  {
    href: "https://linkedin.com/in/Fadyio",
    label: "LinkedIn",
    icon: LinkedIn,
  },
  { href: "/rss.xml", label: "RSS", icon: RSS },
]
