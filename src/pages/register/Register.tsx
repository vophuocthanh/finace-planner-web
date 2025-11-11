import { IconEye, IconNonEye } from '@/assets/icons'
import { logo } from '@/assets/images'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { PASSWORD_TYPE, TEXT_TYPE } from '@/configs/consts'
import { path } from '@/core/constants/path'
import { handleError } from '@/core/helpers/error-handler'
import { mutationKeys } from '@/core/helpers/key-tanstack'
import toastifyCommon from '@/core/helpers/toastify-common'
import { authApi } from '@/core/services/auth.service'
import { RegisterSchema } from '@/core/zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { motion, type Variants } from 'framer-motion'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { z } from 'zod'

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
}

const itemVariants: Variants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.5 }
  }
}

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
    onSuccess: (_, variables) => {
      navigate('/verify-email', { state: { email: variables.email } })
      toastifyCommon.success('Registration successful! Please verify your email 🚀')
    },
    onError: (error) => {
      handleError(error)
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
    <div className='flex justify-center w-full min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50'>
      <motion.div
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
        className='hidden justify-center items-center w-full md:flex'
      >
        <img
          src='https://img.freepik.com/free-vector/personal-finance-concept-illustration_114360-7720.jpg'
          alt='Personal Finance'
          className='my-10 ml-44 rounded-lg shadow-2xl transition-transform duration-300 transform hover:scale-105'
        />
      </motion.div>
      <div className='flex items-center justify-center w-full mx-auto my-auto md:justify-between md:max-w-[90rem] md:ml-80 md:mr-[8rem]'>
        <motion.div
          initial='hidden'
          animate='visible'
          variants={containerVariants}
          className='flex flex-col items-center space-y-2 w-full md:items-start'
        >
          <motion.div variants={itemVariants} className='mb-10 w-40'>
            <Link to='/'>
              <img src={logo} alt='logo' className='object-cover w-full h-full' />
            </Link>
          </motion.div>
          <motion.h1
            variants={itemVariants}
            className='text-5xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600'
          >
            Create Account
          </motion.h1>
          <motion.p variants={itemVariants} className='px-10 text-sm text-center text-gray-600 md:text-left md:px-0'>
            Let's get you all set up so you can access your personal account.
          </motion.p>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleRegister)} className='space-y-6 w-10/12 md:w-2/3'>
              <motion.div variants={itemVariants}>
                <FormField
                  control={form.control}
                  name='email'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className='text-gray-700'>Email</FormLabel>
                      <FormControl>
                        <Input
                          placeholder='Enter your email'
                          type='email'
                          {...field}
                          className='transition-all duration-300 focus:ring-2 focus:ring-indigo-500'
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </motion.div>
              <motion.div variants={itemVariants} className='flex flex-col gap-6 w-full md:flex-row'>
                <FormField
                  control={form.control}
                  name='name'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className='text-gray-700'>Full Name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder='Enter your name'
                          {...field}
                          className='w-full transition-all duration-300 focus:ring-2 focus:ring-indigo-500'
                        />
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
                      <FormLabel className='text-gray-700'>Phone Number</FormLabel>
                      <FormControl>
                        <Input
                          placeholder='Enter your phone number'
                          {...field}
                          className='w-full transition-all duration-300 focus:ring-2 focus:ring-indigo-500'
                          maxLength={10}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </motion.div>
              <motion.div variants={itemVariants}>
                <FormField
                  control={form.control}
                  name={PASSWORD_TYPE}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className='text-gray-700'>Password</FormLabel>
                      <FormControl>
                        <Input
                          placeholder='Enter your password'
                          className='w-full transition-all duration-300 focus:ring-2 focus:ring-indigo-500'
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
              </motion.div>
              <motion.div variants={itemVariants}>
                <FormField
                  control={form.control}
                  name='confirmPassword'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className='text-gray-700'>Confirm Password</FormLabel>
                      <FormControl>
                        <Input
                          placeholder='Confirm your password'
                          className='w-full transition-all duration-300 focus:ring-2 focus:ring-indigo-500'
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
              </motion.div>
              <motion.div variants={itemVariants} className='flex justify-between'>
                <div className='flex justify-center items-center space-x-2'>
                  <Checkbox
                    id='terms'
                    className='w-4 h-4 rounded border-gray-300 transition-colors duration-300 focus:ring-indigo-500'
                  />
                  <Label htmlFor='terms' className='text-base font-normal text-gray-600 cursor-pointer'>
                    I agree to all the <span className='text-indigo-600'>Terms</span> and{' '}
                    <span className='text-indigo-600'>Privacy Policies</span>
                  </Label>
                </div>
              </motion.div>
              <motion.div variants={itemVariants}>
                <Button
                  loading={isLoading}
                  className='w-full text-white bg-gradient-to-r from-indigo-600 to-purple-600 shadow-lg transition-all duration-300 hover:from-indigo-700 hover:to-purple-700 hover:shadow-xl'
                  type='submit'
                >
                  Create Account
                </Button>
              </motion.div>
              <motion.p variants={itemVariants} className='flex justify-center items-center text-gray-600'>
                Already have an account?&nbsp;
                <Link
                  to={path.login}
                  className='text-indigo-600 transition-colors duration-300 hover:underline hover:text-indigo-700'
                >
                  Sign in
                </Link>
              </motion.p>
            </form>
          </Form>
        </motion.div>
      </div>
    </div>
  )
}
