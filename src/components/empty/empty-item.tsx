import classNames from 'classnames'
import { ReactNode } from 'react'

interface EmptyItemTableProps {
  children?: ReactNode
  icon?: ReactNode
  content?: ReactNode
  containerClassName?: string
  className?: string
}

const EmptyItemTable = ({ content, icon, children, className, containerClassName }: EmptyItemTableProps) => {
  return (
    <div
      className={classNames(
        'flex items-center justify-center bg-[#F4F5F7] rounded-md gap-6 p-6 border border-dashed border-[#d9dadb]',
        containerClassName
      )}
    >
      {icon}
      <div className={classNames('flex flex-col gap-3 text-[#42526E] whitespace-pre-line', className)}>
        <div>{content}</div>
        {children}
      </div>
    </div>
  )
}

export { EmptyItemTable }

export type { EmptyItemTableProps }
