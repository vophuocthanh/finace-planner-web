import { mutationKeys } from '@/core/helpers/key-tanstack'
import { monthlyService } from '@/core/services/monthly.service'
import { useQuery } from '@tanstack/react-query'

export const useMonthly = () => {
  return useQuery({ queryKey: mutationKeys.getMonthly, queryFn: monthlyService.getMonthly })
}
