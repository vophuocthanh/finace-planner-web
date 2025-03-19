import { cn } from '@/core/lib/utils'
import * as React from 'react'

export interface InputNumberDecimalProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type' | 'onChange'> {
  onChange?: (value: string) => void
}

const formatDecimal = (value: string) => {
  const numbersOnly = value.replace(/\D/g, '')

  return numbersOnly.replace(/\B(?=(\d{3})+(?!\d))/g, '.')
}

const InputNumber = React.forwardRef<HTMLInputElement, InputNumberDecimalProps>(
  ({ className, onChange, ...props }, ref) => {
    const [displayValue, setDisplayValue] = React.useState('')

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const formattedValue = formatDecimal(e.target.value)
      setDisplayValue(formattedValue)
      onChange?.(formattedValue)
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
