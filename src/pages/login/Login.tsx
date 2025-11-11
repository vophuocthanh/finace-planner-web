import { IconEye, IconNonEye } from '@/assets/icons'
import { logo } from '@/assets/images'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { PASSWORD_TYPE, TEXT_TYPE } from '@/configs/consts'
import { REMEMBER_ME } from '@/core/configs/const'
import { path } from '@/core/constants/path'
import { handleError } from '@/core/helpers/error-handler'
import { mutationKeys } from '@/core/helpers/key-tanstack'
import toastifyCommon from '@/core/helpers/toastify-common'
import { authApi } from '@/core/services/auth.service'
import { setAccessTokenToLS, setRefreshTokenToLS, setUserToLS } from '@/core/shared/storage'
import { LoginSchema } from '@/core/zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { z } from 'zod'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
}

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.5 }
  }
}

export default function Login() {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false)
  const [rememberMe, setRememberMe] = useState<boolean>(localStorage.getItem(REMEMBER_ME) === 'true' ? true : false)

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  })

  const mutationLogin = useMutation({
    mutationKey: mutationKeys.login,
    mutationFn: (data: z.infer<typeof LoginSchema>) => authApi.login(data)
  })

  function onSubmit() {
    setIsLoading(true)
    const loginData = form.getValues() as z.infer<typeof LoginSchema>
    mutationLogin.mutate(loginData, {
      onSuccess: ({ access_token, refresh_token, user }) => {
        setAccessTokenToLS(access_token)
        setRefreshTokenToLS(refresh_token)
        setUserToLS(user)
        navigate(path.admin.dashboard)
        toastifyCommon.success('Login success 🚀🚀⚡⚡')
      },
      onError: (error: Error) => handleError(error),
      onSettled: () => {
        setIsLoading(false)
      }
    })
  }

  const togglePasswordVisibility = () => setIsPasswordVisible(!isPasswordVisible)

  const handleChangeRememberMe = (event: boolean) => {
    setRememberMe(event)
    localStorage.setItem(REMEMBER_ME, JSON.stringify(event))
  }

  useEffect(() => {
    if (rememberMe) {
      const email = localStorage.getItem('email')
      if (email) {
        form.setValue('email', email)
      }
    }
  }, [form, rememberMe])

  return (
    <div className='flex justify-center w-full min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50'>
      <div className='flex items-center justify-center w-full mx-auto my-auto md:justify-between md:max-w-[90rem]'>
        <motion.div
          initial='hidden'
          animate='visible'
          variants={containerVariants}
          className='flex flex-col justify-center items-center md:items-start w-full md:ml-32 space-y-2 mt-[4rem]'
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
            Welcome Back
          </motion.h1>
          <motion.p variants={itemVariants} className='text-sm text-gray-600'>
            Login to access your account
          </motion.p>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6 w-10/12 md:w-2/3'>
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
              <motion.div variants={itemVariants}>
                <FormField
                  control={form.control}
                  name='password'
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
              <motion.div variants={itemVariants} className='flex justify-between'>
                <div className='flex justify-center items-center space-x-2'>
                  <Checkbox
                    id='terms'
                    className='w-4 h-4 rounded border-gray-300 transition-colors duration-300 focus:ring-indigo-500'
                    onChange={(e) => handleChangeRememberMe((e.target as HTMLInputElement).checked)}
                    checked={rememberMe}
                  />
                  <Label htmlFor='terms' className='text-base font-normal text-gray-600 cursor-pointer'>
                    Remember me
                  </Label>
                </div>
                <Link
                  to={path.forgotPassword}
                  className='text-indigo-600 transition-colors duration-300 hover:text-indigo-700 hover:underline'
                >
                  Forgot Password?
                </Link>
              </motion.div>

              <motion.div variants={itemVariants}>
                <Button
                  loading={isLoading}
                  className='w-full text-white bg-gradient-to-r from-indigo-600 to-purple-600 shadow-lg transition-all duration-300 hover:from-indigo-700 hover:to-purple-700 hover:shadow-xl'
                  type='submit'
                >
                  Sign In
                </Button>
              </motion.div>

              <motion.p variants={itemVariants} className='flex justify-center items-center text-gray-600'>
                Don't have an account?&nbsp;
                <Link
                  to='/register'
                  className='text-indigo-600 transition-colors duration-300 hover:text-indigo-700 hover:underline'
                >
                  Sign up
                </Link>
              </motion.p>
            </form>
          </Form>
        </motion.div>
      </div>
      <motion.div
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
        className='hidden w-full pr-[8rem] md:flex justify-center items-center'
      >
        <img
          src='https://img.freepik.com/free-vector/finance-management-concept-illustration_114360-1233.jpg'
          alt='Financial Management'
          className='my-10 rounded-lg shadow-2xl transition-transform duration-300 transform hover:scale-105'
        />
      </motion.div>
    </div>
  )
}
