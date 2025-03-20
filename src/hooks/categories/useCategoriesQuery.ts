import { mutationKeys } from '@/core/helpers/key-tanstack'
import { categoriesService } from '@/core/services/categories.service'
import { useQuery } from '@tanstack/react-query'

export const useCategories = () => {
  return useQuery({
    queryKey: mutationKeys.getCategories,
    queryFn: () => categoriesService.getCategories({ items_per_page: 100 })
  })
}
