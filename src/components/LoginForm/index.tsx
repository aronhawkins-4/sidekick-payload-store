'use client'

import React, { useCallback, useRef } from 'react'
import { useForm } from 'react-hook-form'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'

import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { useAuth } from '@/providers/Auth'

type FormData = {
  email: string
  password: string
}

export const LoginForm: React.FC = () => {
  const searchParams = useSearchParams()
  const allParams = searchParams.toString() ? `?${searchParams.toString()}` : ''
  const redirect = useRef(searchParams.get('redirect'))
  const { login } = useAuth()
  const router = useRouter()
  const [error, setError] = React.useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors, isLoading },
  } = useForm<FormData>()

  const onSubmit = async (data: FormData) => {
    try {
      await login(data)
      if (redirect?.current) router.push(redirect.current as string)
      else router.push('/account')
    } catch (error: any) {
      console.log(error)
      setError('There was an error with the credentials provided. Please try again.')
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <p>
        {`This is where your customers will login to manage their account, review their order history, and more. To manage all users, `}
        <Link href="/admin/collections/users">login to the admin dashboard</Link>
        {'.'}
      </p>
      <Input placeholder="Email Address" required {...register('email')} type="email" />
      <Input type="password" placeholder="Password" required {...register('password')} />
      <Button type="submit" disabled={isLoading}>
        {isLoading ? 'Processing' : 'Login'}
      </Button>
      {error && <p>{error}</p>}
    </form>
  )
}
