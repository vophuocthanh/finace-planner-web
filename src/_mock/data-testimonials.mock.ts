import { Testimonial } from '@/models/interface/testimonials.interface'

export const dataTestimonials: Testimonial[] = [
  {
    id: 1,
    name: 'Sarah Johnson',
    role: 'CFO',
    company: 'TechGrow Inc.',
    content:
      'This tool has transformed how we manage our company finances. The insights and automation have saved us countless hours each month.',
    rating: 5
  },
  {
    id: 2,
    name: 'Michael Chen',
    role: 'Small Business Owner',
    company: 'Artisan Cafe',
    content:
      "As a small business owner, I needed something simple yet powerful. This platform delivers exactly that - it's intuitive and gives me a clear picture of my finances.",
    rating: 5
  },
  {
    id: 3,
    name: 'Priya Sharma',
    role: 'Personal Finance Blogger',
    company: 'WealthWise',
    content:
      "I've tried dozens of finance apps, and this one stands out for its beautiful design and comprehensive features. It's helped me stay on top of my savings goals.",
    rating: 4
  }
]
