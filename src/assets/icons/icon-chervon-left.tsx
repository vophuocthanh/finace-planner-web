import { SvgIconProps } from '@/core/configs/SVGIconProps'

const IconChervonLeft = (props: SvgIconProps) => {
  const { width = 24, height = 24, color = '#717171' } = props
  return (
    <svg width={width} height={height} viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg' {...props}>
      <path
        d='M11 9L8.70711 11.2929C8.31658 11.6834 8.31658 12.3166 8.70711 12.7071L11 15M9 12H16M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2Z'
        stroke={color}
        strokeWidth='1.5'
        strokeLinecap='round'
      />
    </svg>
  )
}

export default IconChervonLeft
