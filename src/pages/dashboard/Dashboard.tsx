import { PieChartDashboard } from '@/pages/dashboard/components/pie-chart-dashboard'
import { ChartDashboard } from './components/chart-dashboard'
import { BarChartDashboard } from '@/pages/dashboard/components/bar-chart-dashboard'

export default function Dashboard() {
  return (
    <div className='w-full h-[calc(100vh-10rem)] md:h-full'>
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
