import { SvgIconProps } from '@/core/configs/SVGIconProps'

const IconPersonIncome = (props: SvgIconProps) => {
  const { width = 24, height = 24, color = '#717171' } = props
  return (
    <svg width={width} height={height} viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg' {...props}>
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M16.5134 21.5003H8.16555C5.09919 21.5003 2.74679 20.3927 3.41498 15.9351L4.19301 9.89387C4.60491 7.66962 6.02367 6.81836 7.26852 6.81836H17.447C18.7102 6.81836 20.0466 7.73369 20.5225 9.89387L21.3006 15.9351C21.8681 19.8893 19.5797 21.5003 16.5134 21.5003Z'
        stroke={color}
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M16.6502 6.59873C16.6502 4.21265 14.716 2.27836 12.3299 2.27836V2.27836C11.1809 2.27349 10.0773 2.72652 9.26308 3.53727C8.44889 4.34803 7.9912 5.44971 7.99121 6.59873H7.99121'
        stroke={color}
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path d='M15.296 11.1022H15.2502' stroke={color} strokeWidth='1.5' strokeLinecap='round' strokeLinejoin='round' />
      <path
        d='M9.46492 11.1022H9.41916'
        stroke={color}
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  )
}

export default IconPersonIncome
