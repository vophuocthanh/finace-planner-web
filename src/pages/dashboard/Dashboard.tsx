import { PieChartDashboard } from '@/pages/dashboard/components/pie-chart-dashboard'
import { ChartDashboard } from './components/chart-dashboard'
import { BarChartDashboard } from '@/pages/dashboard/components/bar-chart-dashboard'

export default function Dashboard() {
  return (
    <div className='w-full h-full'>
      <ChartDashboard />
      <div className='flex gap-4 mt-6'>
        <div className='flex w-1/2 gap-10 ml-10'>
          <PieChartDashboard />
          <PieChartDashboard />
        </div>
        <BarChartDashboard />
      </div>
    </div>
  )
}
