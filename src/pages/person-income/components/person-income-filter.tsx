import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { getMonthlies } from '@/core/data/monthly.data'

interface PersonIncomeFilterProps {
  onFilterChange: (monthName: string) => void
}

const PersonIncomeFilter = ({ onFilterChange }: PersonIncomeFilterProps) => {
  return (
    <Select onValueChange={onFilterChange}>
      <SelectTrigger className='md:w-[150px] w-full'>
        <SelectValue placeholder='Lọc theo tháng' />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {getMonthlies().map((month) => (
            <SelectItem key={month.id} value={month.id}>
              {month.name}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}

export default PersonIncomeFilter
