import { useRef } from 'react'
import { motion } from 'motion/react'
import DottedMap from 'dotted-map'
import { useTheme } from '@/components/theme/theme-provider'
import { MapProps } from '@/models/interface/map.interface'
import { isEqual } from 'lodash'
import { numberConstants } from '@/configs/consts'

export function WorldMap({ dots = [], lineColor = '#0ea5e9' }: MapProps) {
  const svgRef = useRef<SVGSVGElement>(null)
  const { theme } = useTheme()

  const map = new DottedMap({ height: numberConstants.ONE_HUNDRED, grid: 'diagonal' })
  const svgMap = map.getSVG({
    radius: 0.22,
    color: isEqual(theme, 'dark') ? '#FFFFFF40' : '#00000040',
    shape: 'circle',
    backgroundColor: isEqual(theme, 'dark') ? 'black' : 'white'
  })

  const projectPoint = (lat: number, lng: number) => {
    const x = (lng + 180) * (800 / 360)
    const y = (90 - lat) * (400 / 180)
    return { x, y }
  }

  const createCurvedPath = (start: { x: number; y: number }, end: { x: number; y: number }) => {
    const midX = (start.x + end.x) / numberConstants.TWO
    const midY = Math.min(start.y, end.y) - 50
    return `M ${start.x} ${start.y} Q ${midX} ${midY} ${end.x} ${end.y}`
  }

  const renderPulsingCircle = (cx: number, cy: number) => (
    <>
      <circle cx={cx} cy={cy} r='2' fill={lineColor} />
      <circle cx={cx} cy={cy} r='2' fill={lineColor} opacity='0.5'>
        <animate attributeName='r' from='2' to='8' dur='1.5s' begin='0s' repeatCount='indefinite' />
        <animate attributeName='opacity' from='0.5' to='0' dur='1.5s' begin='0s' repeatCount='indefinite' />
      </circle>
    </>
  )

  return (
    <div className='w-full aspect-[2/1] rounded-lg relative font-sans'>
      <img
        src={`data:image/svg+xml;utf8,${encodeURIComponent(svgMap)}`}
        className='h-full w-full [mask-image:linear-gradient(to_bottom,transparent,white_10%,white_90%,transparent)] pointer-events-none select-none'
        alt='world map'
        height='495'
        width='1056'
        draggable={false}
      />
      <svg
        ref={svgRef}
        viewBox='0 0 800 400'
        className='absolute inset-0 w-full h-full pointer-events-none select-none'
      >
        {dots.map((dot, i) => {
          const startPoint = projectPoint(dot.start.lat, dot.start.lng)
          const endPoint = projectPoint(dot.end.lat, dot.end.lng)
          return (
            <g key={`path-group-${i}`}>
              <motion.path
                d={createCurvedPath(startPoint, endPoint)}
                fill='none'
                stroke='url(#path-gradient)'
                strokeWidth='1'
                initial={{ pathLength: numberConstants.ZERO }}
                animate={{ pathLength: numberConstants.ONE }}
                transition={{
                  duration: numberConstants.ONE,
                  delay: 0.5 * i,
                  ease: 'easeOut'
                }}
              />
            </g>
          )
        })}

        <defs>
          <linearGradient id='path-gradient' x1='0%' y1='0%' x2='100%' y2='0%'>
            <stop offset='0%' stopColor='white' stopOpacity='0' />
            <stop offset='5%' stopColor={lineColor} stopOpacity='1' />
            <stop offset='95%' stopColor={lineColor} stopOpacity='1' />
            <stop offset='100%' stopColor='white' stopOpacity='0' />
          </linearGradient>
        </defs>

        {dots.map((dot, i) => {
          const startPos = projectPoint(dot.start.lat, dot.start.lng)
          const endPos = projectPoint(dot.end.lat, dot.end.lng)

          return (
            <g key={`points-group-${i}`}>
              <g key={`start-${i}`}>{renderPulsingCircle(startPos.x, startPos.y)}</g>
              <g key={`end-${i}`}>{renderPulsingCircle(endPos.x, endPos.y)}</g>
            </g>
          )
        })}
      </svg>
    </div>
  )
}
