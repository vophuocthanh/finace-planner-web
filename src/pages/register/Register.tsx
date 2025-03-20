import { IconEye, IconNonEye } from '@/assets/icons'
import { BannerRegister } from '@/assets/images'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { PASSWORD_TYPE, TEXT_TYPE } from '@/configs/consts'
import { path } from '@/core/constants/path'
import { mutationKeys } from '@/core/helpers/key-tanstack'
import { authApi } from '@/core/services/auth.service'
import { RegisterSchema } from '@/core/zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { z } from 'zod'

export default function Register() {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false)
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState<boolean>(false)

  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
      name: '',
      phone: ''
    }
  })

  const mutationRegister = useMutation({
    mutationKey: mutationKeys.register,
    mutationFn: (data: z.infer<typeof RegisterSchema>) => authApi.register(data),
    onSuccess: () => {
      navigate('/login')
      toast.success('Register success 🚀🚀⚡⚡')
    },
    onError: () => {
      toast.error('Register failed!')
    },
    onSettled: () => {
      setIsLoading(false)
    }
  })

  const handleRegister = () => {
    setIsLoading(true)
    mutationRegister.mutate(form.getValues())
  }

  const togglePasswordVisibility = () => setIsPasswordVisible((prev) => !prev)
  const toggleConfirmPasswordVisibility = () => setIsConfirmPasswordVisible((prev) => !prev)

  return (
    <div className='flex justify-center w-full h-screen'>
      <div className='items-center justify-center hidden w-full md:flex'>
        <img src={BannerRegister} alt='' className='my-10 rounded-lg ml-44' />
      </div>
      <div className='flex items-center justify-center w-full mx-auto my-auto md:justify-between md:max-w-[90rem] md:ml-80 md:mr-[8rem] '>
        <div className='flex flex-col items-center w-full space-y-2 md:items-start'>
          <h1 className='text-5xl font-semibold'>Register</h1>
          <p className='text-sm text-[#112211] text-center md:text-left px-10 md:px-0'>
            Let’s get you all st up so you can access your personal account.
          </p>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleRegister)} className='w-10/12 space-y-6 md:w-2/3'>
              <FormField
                control={form.control}
                name='email'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder='Nhập email' type='email' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className='flex flex-col w-full gap-6 md:flex-row'>
                <FormField
                  control={form.control}
                  name='name'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder='Nhập name' {...field} className='w-full' />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='phone'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number</FormLabel>
                      <FormControl>
                        <Input placeholder='Nhập phone number' {...field} className='w-full' maxLength={10} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name={PASSWORD_TYPE}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        placeholder='Nhập password'
                        className='w-full'
                        type={isPasswordVisible ? TEXT_TYPE : PASSWORD_TYPE}
                        {...field}
                        icon={isPasswordVisible ? <IconNonEye /> : <IconEye />}
                        iconOnClick={togglePasswordVisibility}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='confirmPassword'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <Input
                        placeholder='Nhập confirm password'
                        className='w-full'
                        type={isConfirmPasswordVisible ? TEXT_TYPE : PASSWORD_TYPE}
                        {...field}
                        icon={isConfirmPasswordVisible ? <IconNonEye /> : <IconEye />}
                        iconOnClick={toggleConfirmPasswordVisibility}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className='flex justify-between'>
                <div className='flex items-center justify-center space-x-2'>
                  <Checkbox id='terms' className='w-4 h-4' />
                  <Label htmlFor='terms' className='mt-6 text-base font-normal text-gray-500 cursor-pointer md:mt-0'>
                    I agree to all the <span className='text-redCustom'>Terms</span> and{' '}
                    <span className='text-redCustom'>Privacy Policies</span>
                  </Label>
                </div>
              </div>
              <Button
                loading={isLoading}
                className='w-full text-white bg-[#4E47FF] hover:bg-[#4E47FF] hover:shadow-lg'
                type='submit'
              >
                Create Account
              </Button>
              <p className='flex items-center justify-center'>
                Already have an account?&nbsp;
                <Link to={path.login} className='cursor-pointer hover:underline text-primary'>
                  Login
                </Link>
              </p>
            </form>
          </Form>
        </div>
      </div>
    </div>
  )
}
