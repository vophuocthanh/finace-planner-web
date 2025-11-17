import { useState } from 'react'
import { PieChartDashboard } from '@/pages/dashboard/components/pie-chart-dashboard'
import { ChartDashboard } from './components/chart-dashboard'
import { BarChartDashboard } from '@/pages/dashboard/components/bar-chart-dashboard'
import { useGetTotalExpensesByMonthQuery } from '@/hooks/expense/useExpenseQuery'
import { useMonthly } from '@/hooks/monthy/useMonthyQuery'
import { Select, Skeleton, Spin } from 'antd'
import { formatMoney } from '@/core/helpers/calculator'

export default function Dashboard() {
  const [isSelectOpen, setIsSelectOpen] = useState<boolean>(false)
  const { data: monthly, isLoading: isLoadingMonthly } = useMonthly({ enabled: isSelectOpen })
  const [selectedMonthId, setSelectedMonthId] = useState<string>('')
  const { data: totalExpenses, isLoading: isLoadingTotalExpenses } = useGetTotalExpensesByMonthQuery(selectedMonthId)

  const handleMonthChange = (value: string) => setSelectedMonthId(value)

  const handleDropdownVisibleChange = (open: boolean) => setIsSelectOpen(open)

  return (
    <div className='w-full h-[calc(100vh-10rem)] md:h-full'>
      <Select
        className='w-full md:w-[380px] h-10'
        placeholder='Chọn tháng'
        value={selectedMonthId || undefined}
        onChange={handleMonthChange}
        onDropdownVisibleChange={handleDropdownVisibleChange}
        loading={isLoadingMonthly}
        notFoundContent={
          isLoadingMonthly ? (
            <div className='flex justify-center items-center py-5'>
              <Spin size='default' />
            </div>
          ) : (
            <div className='flex justify-center items-center py-5'>Không tìm thấy tháng</div>
          )
        }
      >
        {monthly?.data?.map((item, index) => {
          const itemId = item.id ?? `month-${index}`
          return (
            <Select.Option key={itemId} value={itemId}>
              {item.nameMonth}
            </Select.Option>
          )
        })}
      </Select>
      <span className='flex my-4 text-2xl font-bold text-white'>
        {selectedMonthId ? (
          <>
            Tổng chi tiêu tháng này:{' '}
            {isLoadingTotalExpenses ? (
              <Skeleton.Input active size='small' style={{ width: 120 }} className='mt-1 ml-2' />
            ) : (
              `${formatMoney(totalExpenses?.data?.total)} VND`
            )}
          </>
        ) : (
          'Vui lòng chọn tháng để xem tổng chi tiêu'
        )}
      </span>
      <ChartDashboard />
      <div className='flex flex-col gap-4 mt-4 md:mt-6 md:flex-row'>
        <div className='flex flex-col gap-4 md:gap-10 md:ml-10 md:w-1/2 md:flex-row'>
          <PieChartDashboard />
          <PieChartDashboard />
        </div>
        <BarChartDashboard />
      </div>
    </div>
  )
}
