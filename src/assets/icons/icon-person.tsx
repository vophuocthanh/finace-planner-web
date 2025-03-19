import { SvgIconProps } from '@/core/configs/SVGIconProps'

const IconPerson = (props: SvgIconProps) => {
  const { width = 24, height = 24, color = '#53545C' } = props
  return (
    <svg width={width} height={height} viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg' {...props}>
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M9.59102 15.207C13.28 15.207 16.433 15.766 16.433 17.999C16.433 20.232 13.301 20.807 9.59102 20.807C5.90102 20.807 2.74902 20.253 2.74902 18.019C2.74902 15.785 5.88002 15.207 9.59102 15.207Z'
        stroke={color}
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M9.59108 12.02C7.16908 12.02 5.20508 10.057 5.20508 7.635C5.20508 5.213 7.16908 3.25 9.59108 3.25C12.0121 3.25 13.9761 5.213 13.9761 7.635C13.9851 10.048 12.0351 12.011 9.62208 12.02H9.59108Z'
        stroke={color}
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M16.4824 10.8823C18.0834 10.6573 19.3164 9.28326 19.3194 7.62026C19.3194 5.98126 18.1244 4.62126 16.5574 4.36426'
        stroke={color}
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M18.5947 14.7324C20.1457 14.9634 21.2287 15.5074 21.2287 16.6274C21.2287 17.3984 20.7187 17.8984 19.8947 18.2114'
        stroke={color}
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  )
}

export default IconPerson
