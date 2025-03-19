import { cn } from '@/core/lib/utils'
import { useInView } from 'react-intersection-observer'
interface Props {
  children: React.ReactNode
  className?: string
}

export default function SectionInViewUp({ children, className }: Props) {
  const { ref, inView } = useInView({
    triggerOnce: true
  })
  return (
    <div ref={ref} className={cn(className, { 'animate-fade-up': inView })}>
      {children}
    </div>
  )
}
