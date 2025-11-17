import { mutationKeys } from '@/core/helpers/key-tanstack'
import { categoriesService } from '@/core/services/categories.service'
import { useQuery } from '@tanstack/react-query'

export const useCategories = (options?: { enabled?: boolean }) => {
  return useQuery({
    queryKey: mutationKeys.getCategories,
    queryFn: () => categoriesService.getCategories({ itemsPerPage: 100 }),
    enabled: options?.enabled ?? true
  })
}
