import { z } from 'zod'

export const PersonIncomeSchema = z.object({
  amount: z.number().min(1, {
    message: 'Số tiền là bắt buộc'
  }),
  description: z.string().min(1, {
    message: 'Mô tả là bắt buộc'
  }),
  categoryId: z.string().min(1, {
    message: 'Danh mục là bắt buộc'
  }),
  monthlyId: z.string().min(1, {
    message: 'Tháng là bắt buộc'
  })
})
