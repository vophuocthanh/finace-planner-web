import { TwitterIcons, LinkedinIcons, FacebookIcons } from '@/assets/icons'

export const dataFooterLink = [
  {
    title: 'Product',
    links: [
      { label: 'Features', href: '/' },
      { label: 'Security', href: '/' },
      { label: 'Pricing', href: '/' },
      { label: 'Integrations', href: '/' }
    ]
  },
  {
    title: 'Resources',
    links: [
      { label: 'Blog', href: '/' },
      { label: 'Documentation', href: '/' },
      { label: 'Guides', href: '/' },
      { label: 'Support', href: '/' }
    ]
  },
  {
    title: 'Company',
    links: [
      { label: 'About', href: '/' },
      { label: 'Careers', href: '/' },
      { label: 'Contact', href: '/' },
      { label: 'Partners', href: '/' }
    ]
  }
]

export const socialLinks = [
  { icon: TwitterIcons, href: 'https://twitter.com', label: 'Twitter' },
  { icon: LinkedinIcons, href: 'https://linkedin.com', label: 'LinkedIn' },
  { icon: FacebookIcons, href: 'https://facebook.com', label: 'Facebook' }
]
