import { IconEye, IconNonEye } from '@/assets/icons'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Web3Logo } from '@/components/logo/Web3Logo'
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
import { motion, type Variants } from 'framer-motion'
import { useEffect, useState } from 'react'
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
    <div className='flex overflow-hidden relative justify-center w-full min-h-screen bg-gradient-to-br from-gray-950 via-indigo-950/40 to-gray-950'>
      {/* Background effects */}
      <div className='absolute inset-0'>
        <div className='absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(56,189,248,0.18),transparent_60%)]' />
        <div className='absolute inset-0 bg-[radial-gradient(circle_at_80%_90%,rgba(139,92,246,0.18),transparent_60%)]' />
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            className='absolute inset-x-0 h-px bg-gradient-to-r from-transparent to-transparent via-cyan-500/20'
            style={{ top: `${(i + 1) * 16}%` }}
          />
        ))}
      </div>
      <div className='relative z-10 flex items-center justify-center w-full mx-auto my-auto md:justify-between md:max-w-[90rem]'>
        <motion.div
          initial='hidden'
          animate='visible'
          variants={containerVariants}
          className='flex flex-col items-center justify-center w-full mt-[4rem] space-y-2 md:items-start md:ml-32'
        >
          <motion.div variants={itemVariants} className='mb-10'>
            <Web3Logo showText={true} size='lg' />
          </motion.div>
          <motion.h1
            variants={itemVariants}
            className='text-5xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500'
          >
            Welcome Back
          </motion.h1>
          <motion.p variants={itemVariants} className='text-sm text-cyan-100/80'>
            Login to access your decentralized dashboard
          </motion.p>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6 w-10/12 md:w-2/3'>
              <motion.div variants={itemVariants}>
                <FormField
                  control={form.control}
                  name='email'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className='text-gray-300'>Email</FormLabel>
                      <FormControl>
                        <Input
                          placeholder='Enter your email'
                          type='email'
                          {...field}
                          className='text-white transition-all duration-300 bg-gray-900/50 border-cyan-500/30 placeholder:text-gray-500 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-400'
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
                      <FormLabel className='text-gray-300'>Password</FormLabel>
                      <FormControl>
                        <Input
                          placeholder='Enter your password'
                          className='w-full text-white transition-all duration-300 bg-gray-900/50 border-cyan-500/30 placeholder:text-gray-500 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-400'
                          type={isPasswordVisible ? TEXT_TYPE : PASSWORD_TYPE}
                          {...field}
                          icon={
                            isPasswordVisible ? (
                              <IconNonEye className='text-white' />
                            ) : (
                              <IconEye className='text-white' />
                            )
                          }
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
                    className='w-4 h-4 transition-colors duration-300 border-cyan-500/50 rounded focus:ring-cyan-500 data-[state=checked]:bg-cyan-500 data-[state=checked]:border-cyan-500'
                    onChange={(e) => handleChangeRememberMe((e.target as HTMLInputElement).checked)}
                    checked={rememberMe}
                  />
                  <Label htmlFor='terms' className='text-base font-normal cursor-pointer text-cyan-100/80'>
                    Remember me
                  </Label>
                </div>
                <Link
                  to={path.forgotPassword}
                  className='text-cyan-400 transition-colors duration-300 hover:text-cyan-300 hover:underline'
                >
                  Forgot Password?
                </Link>
              </motion.div>

              <motion.div variants={itemVariants}>
                <Button
                  loading={isLoading}
                  className='w-full bg-gradient-to-r from-cyan-400 to-blue-500 shadow-lg transition-all duration-300 text-gray-950 hover:from-cyan-300 hover:to-blue-400 hover:shadow-xl hover:shadow-cyan-500/50'
                  type='submit'
                >
                  Sign In
                </Button>
              </motion.div>

              <motion.p variants={itemVariants} className='flex justify-center items-center text-cyan-100/80'>
                Don't have an account?&nbsp;
                <Link
                  to='/register'
                  className='text-cyan-400 transition-colors duration-300 hover:text-cyan-300 hover:underline'
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
        className='relative z-10 hidden w-full pr-[8rem] md:flex justify-center items-center'
      >
        <div className='relative my-10'>
          <div className='absolute inset-0 bg-gradient-to-br rounded-2xl blur-2xl from-cyan-500/20 to-purple-500/20' />
          <div className='relative p-10 md:p-12 bg-gradient-to-br rounded-2xl border shadow-2xl backdrop-blur-sm border-cyan-500/30 from-gray-900/90 to-gray-800/90 shadow-cyan-500/20 max-w-[38rem] w-[38rem]'>
            <div className='space-y-8'>
              <div className='flex gap-5 items-center'>
                <div className='flex justify-center items-center w-14 h-14 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-xl'>
                  <span className='text-2xl'>🔗</span>
                </div>
                <div>
                  <h3 className='text-2xl font-semibold text-white'>Web3 Wallet</h3>
                  <p className='text-sm text-gray-400'>Secure • Non-custodial • Multi-chain</p>
                </div>
              </div>
              <p className='text-gray-300'>
                Manage digital assets, sign transactions, and interact with dApps seamlessly across chains. Your keys,
                your crypto.
              </p>
              <div className='space-y-3'>
                <div className='flex gap-3 items-center text-gray-300'>
                  <div className='w-2 h-2 bg-cyan-400 rounded-full' />
                  <span className='text-sm'>Multi-chain support (EVM + more)</span>
                </div>
                <div className='flex gap-3 items-center text-gray-300'>
                  <div className='w-2 h-2 bg-blue-400 rounded-full' />
                  <span className='text-sm'>Smart contract ready with gas estimation</span>
                </div>
                <div className='flex gap-3 items-center text-gray-300'>
                  <div className='w-2 h-2 bg-purple-400 rounded-full' />
                  <span className='text-sm'>DeFi integration</span>
                </div>
                <div className='flex gap-3 items-center text-gray-300'>
                  <div className='w-2 h-2 bg-emerald-400 rounded-full' />
                  <span className='text-sm'>Ledger/Trezor hardware support</span>
                </div>
                <div className='flex gap-3 items-center text-gray-300'>
                  <div className='w-2 h-2 bg-pink-400 rounded-full' />
                  <span className='text-sm'>NFT gallery and metadata preview</span>
                </div>
              </div>
              <div className='w-full h-px bg-gradient-to-r from-transparent to-transparent via-cyan-500/30' />
              <div className='grid grid-cols-3 gap-4'>
                <div className='p-4 text-center rounded-xl border border-cyan-500/20 bg-white/5'>
                  <div className='text-2xl font-semibold text-white'>5k+</div>
                  <div className='text-xs text-gray-400'>dApps</div>
                </div>
                <div className='p-4 text-center rounded-xl border border-cyan-500/20 bg-white/5'>
                  <div className='text-2xl font-semibold text-white'>1.2M</div>
                  <div className='text-xs text-gray-400'>Daily txns</div>
                </div>
                <div className='p-4 text-center rounded-xl border border-cyan-500/20 bg-white/5'>
                  <div className='text-2xl font-semibold text-white'>$45B</div>
                  <div className='text-xs text-gray-400'>DeFi TVL</div>
                </div>
              </div>
              <div className='space-y-3'>
                <div className='text-sm font-medium text-gray-300'>Supported chains</div>
                <div className='flex flex-wrap gap-2 items-center'>
                  <span className='px-3 py-1 text-xs text-cyan-200 rounded-full border border-cyan-500/30 bg-cyan-500/10'>
                    Ethereum
                  </span>
                  <span className='px-3 py-1 text-xs text-cyan-200 rounded-full border border-cyan-500/30 bg-cyan-500/10'>
                    Polygon
                  </span>
                  <span className='px-3 py-1 text-xs text-cyan-200 rounded-full border border-cyan-500/30 bg-cyan-500/10'>
                    Binance
                  </span>
                  <span className='px-3 py-1 text-xs text-cyan-200 rounded-full border border-cyan-500/30 bg-cyan-500/10'>
                    Arbitrum
                  </span>
                  <span className='px-3 py-1 text-xs text-cyan-200 rounded-full border border-cyan-500/30 bg-cyan-500/10'>
                    Optimism
                  </span>
                </div>
              </div>
              <div className='flex gap-3 items-start p-4 rounded-xl border border-emerald-500/30 bg-emerald-500/10'>
                <span className='mt-0.5 text-emerald-300'>✅</span>
                <p className='text-sm text-emerald-200'>
                  Non-custodial by design — private keys are encrypted locally. You remain in full control.
                </p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
