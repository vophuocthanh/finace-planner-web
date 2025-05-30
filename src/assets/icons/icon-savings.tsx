import { SvgIconProps } from '@/core/configs/SVGIconProps'

const IconSavings = (props: SvgIconProps) => {
  const { width = 24, height = 24, color = '#717171' } = props
  return (
    <svg width={width} height={height} viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg' {...props}>
      <path
        d='M4 6C4 3.79086 5.79086 2 8 2H12H14.0633C14.6568 2 15.2197 2.26365 15.5997 2.71963L19.5364 7.44373C19.836 7.80316 20 8.25623 20 8.7241V12V18C20 20.2091 18.2091 22 16 22H8C5.79086 22 4 20.2091 4 18V6Z'
        stroke={color}
        strokeWidth='1.5'
      />
      <path d='M15 2.5V6C15 7.10457 15.8954 8 17 8H19.5' stroke={color} strokeWidth='1.5' strokeLinecap='round' />
      <path d='M8 12H16' stroke={color} strokeWidth='1.5' strokeLinecap='round' />
      <path d='M8 17H12' stroke={color} strokeWidth='1.5' strokeLinecap='round' />
    </svg>
  )
}

export default IconSavings
