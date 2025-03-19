import { SvgIconProps } from '@/core/configs/SVGIconProps'

const IconChervonRight = (props: SvgIconProps) => {
  const { width = 24, height = 24, color = '#717171' } = props
  return (
    <svg width={width} height={height} viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg' {...props}>
      <path
        d='M13 15.0001L15.2929 12.7072C15.6834 12.3166 15.6834 11.6835 15.2929 11.293L13 9.00006M15 12.0001L8 12.0001M12 22.0001C17.5228 22.0001 22 17.5229 22 12.0001C22 6.47721 17.5228 2.00006 12 2.00006C6.47715 2.00006 2 6.47721 2 12.0001C2 17.5229 6.47715 22.0001 12 22.0001Z'
        stroke={color}
        stroke-width='1.5'
        stroke-linecap='round'
      />
    </svg>
  )
}

export default IconChervonRight
