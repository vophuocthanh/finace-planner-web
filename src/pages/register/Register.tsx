import { IconEye, IconNonEye } from '@/assets/icons'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Web3Logo } from '@/components/logo/Web3Logo'
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
      <motion.div
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
        className='hidden relative z-10 justify-center items-center w-full md:flex'
      >
        <div className='relative my-10 ml-44'>
          <div className='absolute inset-0 bg-gradient-to-br rounded-2xl blur-2xl from-cyan-500/20 to-purple-500/20' />
          <div className='relative p-10 md:p-12 rounded-2xl border border-cyan-500/30 bg-gradient-to-br from-gray-900/90 to-gray-800/90 shadow-2xl shadow-cyan-500/20 backdrop-blur-sm max-w-[38rem] w-[38rem]'>
            <div className='space-y-8'>
              <div className='flex gap-5 items-center'>
                <div className='flex justify-center items-center w-14 h-14 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-xl'>
                  <span className='text-2xl'>🚀</span>
                </div>
                <div>
                  <h3 className='text-2xl font-semibold text-white'>Onboard to Web3</h3>
                  <p className='text-sm text-gray-400'>KYC-free • Open-source • Permissionless</p>
                </div>
              </div>
              <p className='text-gray-300'>
                Create your decentralized identity, manage assets, and launch dApps with secure wallet tooling that
                scales across chains.
              </p>
              <div className='space-y-3'>
                <div className='flex gap-3 items-center text-gray-300'>
                  <div className='w-2 h-2 bg-cyan-400 rounded-full' />
                  <span className='text-sm'>Create your wallet with seed/backups</span>
                </div>
                <div className='flex gap-3 items-center text-gray-300'>
                  <div className='w-2 h-2 bg-blue-400 rounded-full' />
                  <span className='text-sm'>Access DeFi protocols and on-chain markets</span>
                </div>
                <div className='flex gap-3 items-center text-gray-300'>
                  <div className='w-2 h-2 bg-purple-400 rounded-full' />
                  <span className='text-sm'>Deploy and interact with smart contracts</span>
                </div>
                <div className='flex gap-3 items-center text-gray-300'>
                  <div className='w-2 h-2 bg-emerald-400 rounded-full' />
                  <span className='text-sm'>Hardware wallet support (Ledger/Trezor)</span>
                </div>
                <div className='flex gap-3 items-center text-gray-300'>
                  <div className='w-2 h-2 bg-pink-400 rounded-full' />
                  <span className='text-sm'>NFT minting, gallery and metadata</span>
                </div>
              </div>
              <div className='w-full h-px bg-gradient-to-r from-transparent to-transparent via-cyan-500/30' />
              <div className='grid grid-cols-3 gap-4'>
                <div className='p-4 text-center rounded-xl border border-cyan-500/20 bg-white/5'>
                  <div className='text-2xl font-semibold text-white'>10k+</div>
                  <div className='text-xs text-gray-400'>Builders</div>
                </div>
                <div className='p-4 text-center rounded-xl border border-cyan-500/20 bg-white/5'>
                  <div className='text-2xl font-semibold text-white'>150+</div>
                  <div className='text-xs text-gray-400'>Protocols</div>
                </div>
                <div className='p-4 text-center rounded-xl border border-cyan-500/20 bg-white/5'>
                  <div className='text-2xl font-semibold text-white'>24/7</div>
                  <div className='text-xs text-gray-400'>Uptime</div>
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
                  Privacy-first onboarding. Keys never leave your device — you own your identity.
                </p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
      <div className='relative z-10 flex items-center justify-center w-full mx-auto my-auto md:justify-between md:max-w-[90rem] md:ml-80 md:mr-[8rem]'>
        <motion.div
          initial='hidden'
          animate='visible'
          variants={containerVariants}
          className='flex flex-col items-center space-y-2 w-full md:items-start'
        >
          <motion.div variants={itemVariants} className='mb-10'>
            <Web3Logo showText={true} size='lg' />
          </motion.div>
          <motion.h1
            variants={itemVariants}
            className='text-5xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500'
          >
            Create Account
          </motion.h1>
          <motion.p variants={itemVariants} className='px-10 text-sm text-center text-cyan-100/80 md:text-left md:px-0'>
            Set up your decentralized identity and start building on Web3
          </motion.p>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleRegister)} className='space-y-6 w-10/12 md:w-2/3'>
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
              <motion.div variants={itemVariants} className='flex flex-col gap-6 w-full md:flex-row'>
                <FormField
                  control={form.control}
                  name='name'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className='text-gray-300'>Full Name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder='Enter your name'
                          {...field}
                          className='w-full text-white transition-all duration-300 bg-gray-900/50 border-cyan-500/30 placeholder:text-gray-500 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-400'
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
                      <FormLabel className='text-gray-300'>Phone Number</FormLabel>
                      <FormControl>
                        <Input
                          placeholder='Enter your phone number'
                          {...field}
                          className='w-full text-white transition-all duration-300 bg-gray-900/50 border-cyan-500/30 placeholder:text-gray-500 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-400'
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
              <motion.div variants={itemVariants}>
                <FormField
                  control={form.control}
                  name='confirmPassword'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className='text-gray-300'>Confirm Password</FormLabel>
                      <FormControl>
                        <Input
                          placeholder='Confirm your password'
                          className='w-full text-white transition-all duration-300 bg-gray-900/50 border-cyan-500/30 placeholder:text-gray-500 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-400'
                          type={isConfirmPasswordVisible ? TEXT_TYPE : PASSWORD_TYPE}
                          {...field}
                          icon={
                            isConfirmPasswordVisible ? (
                              <IconNonEye className='text-white' />
                            ) : (
                              <IconEye className='text-white' />
                            )
                          }
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
                    className='w-4 h-4 transition-colors duration-300 border-cyan-500/50 rounded focus:ring-cyan-500 data-[state=checked]:bg-cyan-500 data-[state=checked]:border-cyan-500'
                  />
                  <Label htmlFor='terms' className='text-base font-normal cursor-pointer text-cyan-100/80'>
                    I agree to all the <span className='text-cyan-400'>Terms</span> and{' '}
                    <span className='text-cyan-400'>Privacy Policies</span>
                  </Label>
                </div>
              </motion.div>
              <motion.div variants={itemVariants}>
                <Button
                  loading={isLoading}
                  className='w-full bg-gradient-to-r from-cyan-400 to-blue-500 shadow-lg transition-all duration-300 text-gray-950 hover:from-cyan-300 hover:to-blue-400 hover:shadow-xl hover:shadow-cyan-500/50'
                  type='submit'
                >
                  Create Account
                </Button>
              </motion.div>
              <motion.p variants={itemVariants} className='flex justify-center items-center text-cyan-100/80'>
                Already have an account?&nbsp;
                <Link
                  to={path.login}
                  className='text-cyan-400 transition-colors duration-300 hover:text-cyan-300 hover:underline'
                >
                  Login
                </Link>
              </motion.p>
            </form>
          </Form>
        </motion.div>
      </div>
    </div>
  )
}
