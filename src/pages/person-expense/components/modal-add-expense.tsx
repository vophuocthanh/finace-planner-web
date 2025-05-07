import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { InputNumber } from '@/components/ui/input-number'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { numberConstants } from '@/configs/consts'
import { handleError } from '@/core/helpers/error-handler'
import ToastifyCommon from '@/core/helpers/toastify-common'
import { ExpenseSchema } from '@/core/zod/expense.zod'
import { useCategories } from '@/hooks/categories/useCategoriesQuery'
import { useCreateExpenseMutation, useUpdateExpenseMutation } from '@/hooks/expense/useExpenseQuery'
import { useMonthly } from '@/hooks/monthy/useMonthyQuery'
import { ExpenseResponse } from '@/models/interface/expense.interface'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

interface ModalAddPersonExpenseProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  personExpenseData?: ExpenseResponse
  isEditMode?: boolean
  id?: string
}

export default function ModalAddPersonExpense({
  open,
  onOpenChange,
  personExpenseData,
  isEditMode = false,
  id
}: ModalAddPersonExpenseProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isCategoryOpen, setIsCategoryOpen] = useState(false)
  const [isMonthlyOpen, setIsMonthlyOpen] = useState(false)

  const { data: categories, isLoading: isCategoriesLoading } = useCategories({
    enabled: isCategoryOpen || isEditMode
  })

  const { data: monthlies, isLoading: isMonthliesLoading } = useMonthly({
    enabled: isMonthlyOpen || isEditMode
  })

  const { mutate: mutationCreate } = useCreateExpenseMutation()
  const { mutate: mutationUpdate } = useUpdateExpenseMutation(id || '')

  const form = useForm<z.infer<typeof ExpenseSchema>>({
    resolver: zodResolver(ExpenseSchema),
    defaultValues: personExpenseData || {
      amount: numberConstants.ZERO,
      description: '',
      categoryId: '',
      monthlyId: ''
    }
  })

  useEffect(() => {
    if (isEditMode && personExpenseData) {
      form.reset(personExpenseData)
    } else {
      form.reset({
        amount: numberConstants.ZERO,
        description: '',
        categoryId: '',
        monthlyId: ''
      })
    }
  }, [personExpenseData, isEditMode, form])

  function onSubmit(values: z.infer<typeof ExpenseSchema>) {
    setIsLoading(true)
    const payload = {
      ...values,
      amount: Number(values.amount)
    }
    if (isEditMode) {
      mutationUpdate(payload, {
        onSuccess: () => {
          setIsLoading(false)
          onOpenChange(false)
          ToastifyCommon.success('Sửa chi tiêu thành công')
          form.reset()
        },
        onError: (error) => handleError({ error }),
        onSettled: () => {
          setIsLoading(false)
        }
      })
    } else {
      mutationCreate(payload, {
        onSuccess: () => {
          setIsLoading(false)
          onOpenChange(false)
          ToastifyCommon.success('Thêm chi tiêu thành công')
          form.reset()
        },
        onError: (error) => handleError({ error }),
        onSettled: () => {
          setIsLoading(false)
        }
      })
    }
  }

  return (
    <div>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className='w-[340px] sm:w-[525px] rounded-lg'>
          <DialogHeader>
            <DialogTitle>{isEditMode ? 'Sửa chi tiêu' : 'Thêm chi tiêu'}</DialogTitle>
            <DialogDescription>
              {isEditMode ? 'Sửa chi tiêu vào hệ thống' : 'Thêm chi tiêu vào hệ thống'}
            </DialogDescription>
          </DialogHeader>
          <div className='grid gap-4 py-4'>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className='w-full space-y-6'>
                <FormField
                  control={form.control}
                  name='amount'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tiền</FormLabel>
                      <FormControl>
                        <InputNumber placeholder='Nhập số tiền' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='description'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Mô tả</FormLabel>
                      <FormControl>
                        <Input placeholder='Nhập mô tả' className='w-full' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='categoryId'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Danh mục</FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                          onOpenChange={(open) => setIsCategoryOpen(open)}
                        >
                          <SelectTrigger className='w-full'>
                            <SelectValue
                              placeholder={isCategoriesLoading && isCategoryOpen ? 'Đang tải...' : 'Chọn danh mục'}
                            />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              {categories?.data?.map((category) => (
                                <SelectItem key={category.id} value={category.id ?? ''}>
                                  {category.name}
                                </SelectItem>
                              ))}
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='monthlyId'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tháng</FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                          onOpenChange={(open) => setIsMonthlyOpen(open)}
                        >
                          <SelectTrigger className='w-full'>
                            <SelectValue
                              placeholder={isMonthliesLoading && isMonthlyOpen ? 'Đang tải...' : 'Chọn tháng'}
                            />
                          </SelectTrigger>
                          <SelectContent>
                            {monthlies?.data?.map((monthly) => (
                              <SelectItem key={monthly.id} value={monthly.id ?? ''}>
                                {monthly.nameMonth}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  loading={isLoading}
                  className='w-full h-10 text-white bg-primary hover:shadow-lg hover:bg-primary/80'
                  type='submit'
                >
                  {isEditMode ? 'Sửa chi tiêu' : 'Thêm chi tiêu'}
                </Button>
              </form>
            </Form>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
