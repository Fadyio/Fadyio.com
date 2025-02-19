export type Site = {
  TITLE: string
  DESCRIPTION: string
  EMAIL: string
  NUM_POSTS_ON_HOMEPAGE: number
  POSTS_PER_PAGE: number
  SITEURL: string
}

export type Link = {
  href: string
  label: string
}

export const SITE: Site = {
  TITLE: "Fadyio.com",
  DESCRIPTION:
    'Dive into DevOps with Fady Nagh, Discover in-depth insights on AWS, Kubernetes, automation, and cloud-native technologies with practical guides.',
  EMAIL: 'Fady@Fadyio.com',
  NUM_POSTS_ON_HOMEPAGE: 3,
  POSTS_PER_PAGE: 8,
  SITEURL: 'https://fadyio.com',
}

export const NAV_LINKS: Link[] = [
  { href: '/blog', label: 'blog' },
  { href: '/gpg-key.txt', label: 'PGP Key'},
  { href: '/about', label: 'about' },
]

export const SOCIAL_LINKS: Link[] = [
  { href: 'https://github.com/Fadyio', label: 'GitHub' },
  {
    href: 'Fady@Fadyio.com', label: 'Email' },
  { href: 'http://linkedin.com/in/Fadyio', label: 'LinkedIn' },
  { href: '/rss.xml', label: 'RSS' },
]
