import { mutationKeys } from '@/core/helpers/key-tanstack'
import { monthlyService } from '@/core/services/monthly.service'
import { useQuery } from '@tanstack/react-query'

export const useMonthly = (options?: { enabled?: boolean }) => {
  return useQuery({
    queryKey: mutationKeys.getMonthly,
    queryFn: () => monthlyService.getMonthly({ items_per_page: 100 }),
    enabled: options?.enabled ?? true
  })
}
