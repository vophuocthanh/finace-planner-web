import { cn } from '@/core/lib/utils'
import * as React from 'react'

export interface InputNumberDecimalProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type' | 'onChange'> {
  onChange?: (value: number) => void
  value?: number
}

const formatDecimal = (value: number): string => {
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
}

const InputNumber = React.forwardRef<HTMLInputElement, InputNumberDecimalProps>(
  ({ className, onChange, value, ...props }, ref) => {
    const [displayValue, setDisplayValue] = React.useState(() => {
      return value !== undefined ? formatDecimal(value) : ''
    })

    React.useEffect(() => {
      if (value !== undefined) {
        setDisplayValue(formatDecimal(value))
      }
    }, [value])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const rawValue = e.target.value.replace(/\./g, '')
      const numericValue = rawValue ? parseInt(rawValue, 10) : 0

      if (!isNaN(numericValue)) {
        const formattedValue = formatDecimal(numericValue)
        setDisplayValue(formattedValue)
        onChange?.(numericValue)
      }
    }

    return (
      <input
        type='text'
        className={cn(
          'flex h-10 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium focus:ring-primary focus:ring-2 placeholder:text-slate-500 outline-none',
          className
        )}
        ref={ref}
        value={displayValue}
        onChange={handleChange}
        {...props}
      />
    )
  }
)
InputNumber.displayName = 'InputNumber'

export { InputNumber }
