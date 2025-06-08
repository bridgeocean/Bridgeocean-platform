export const siteConfig = {
  name: "BridgeOcean",
  description: "BridgeOcean Charter and Emergency Services",
  url: "",
  ogImage: "",
  links: {
    twitter: "",
    github: "",
  },
}

export type SiteConfig = typeof siteConfig

export interface MainNavItem {
  title: string
  href: string
  disabled?: boolean
}
