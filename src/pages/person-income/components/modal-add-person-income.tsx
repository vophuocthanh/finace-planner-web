import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { InputNumber } from '@/components/ui/input-number'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { numberConstants } from '@/configs/consts'
import { handleError } from '@/core/helpers/error-handler'
import { PersonIncomeSchema } from '@/core/zod/person-income.zod'
import { useCategories } from '@/hooks/categories/useCategoriesQuery'
import { useMonthly } from '@/hooks/monthy/useMonthyQuery'
import { useCreatePersonIncome, useUpdatePersonIncome } from '@/hooks/person-income/usePersonIncomeQuery'
import { PersonIncomeResponse } from '@/models/interface/person-income.interface'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

interface ModalAddPersonIncomeProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  personIncomeData?: PersonIncomeResponse
  isEditMode?: boolean
  id?: string
}

export default function ModalAddPersonIncome({
  open,
  onOpenChange,
  personIncomeData,
  isEditMode = false,
  id
}: ModalAddPersonIncomeProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isCategoryOpen, setIsCategoryOpen] = useState(false)
  const [isMonthlyOpen, setIsMonthlyOpen] = useState(false)

  const { data: categories, isLoading: isCategoriesLoading } = useCategories({
    enabled: isCategoryOpen || isEditMode
  })

  const { data: monthlies, isLoading: isMonthliesLoading } = useMonthly({
    enabled: isMonthlyOpen || isEditMode
  })

  const { mutate: mutation } = useCreatePersonIncome()
  const { mutate: updateMutation } = useUpdatePersonIncome(id || '')

  const form = useForm<z.infer<typeof PersonIncomeSchema>>({
    resolver: zodResolver(PersonIncomeSchema),
    defaultValues: personIncomeData || {
      amount: numberConstants.ZERO,
      description: '',
      categoryId: '',
      monthlyId: ''
    }
  })

  useEffect(() => {
    if (isEditMode && personIncomeData) {
      form.reset(personIncomeData)
    } else {
      form.reset({
        amount: numberConstants.ZERO,
        description: '',
        categoryId: '',
        monthlyId: ''
      })
    }
  }, [personIncomeData, isEditMode, form])

  function onSubmit(values: z.infer<typeof PersonIncomeSchema>) {
    setIsLoading(true)
    const payload = {
      ...values,
      amount: Number(values.amount)
    }
    if (isEditMode) {
      updateMutation(payload, {
        onSuccess: () => {
          setIsLoading(false)
          onOpenChange(false)
          form.reset()
        },
        onError: (error) => handleError({ error }),
        onSettled: () => {
          setIsLoading(false)
        }
      })
    } else {
      mutation(payload, {
        onSuccess: () => {
          setIsLoading(false)
          onOpenChange(false)
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
            <DialogTitle>{isEditMode ? 'Sửa thu nhập' : 'Thêm thu nhập'}</DialogTitle>
            <DialogDescription>
              {isEditMode ? 'Sửa thu nhập vào hệ thống' : 'Thêm thu nhập vào hệ thống'}
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
                  {isEditMode ? 'Sửa thu nhập' : 'Thêm thu nhập'}
                </Button>
              </form>
            </Form>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
