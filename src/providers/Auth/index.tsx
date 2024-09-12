'use client'

import React, { createContext, useCallback, useContext, useEffect, useState } from 'react'

import { User } from '../../payload-types'
import { gql, USER } from './gql'
import { rest } from './rest'
import { AuthContext, Create, ForgotPassword, Login, Logout, ResetPassword } from './types'

// const Context = createContext({} as AuthContext)
let api = 'rest'
export const useAuth = () => {
  const [user, setUser] = useState<User | null>()

  const create = async (args) => {
    if (api === 'rest') {
      const user = await rest(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/users`, args)
      setUser(user)
      return user
    }

    if (api === 'gql') {
      const { createUser: user } = await gql(`mutation {
        createUser(data: { email: "${args.email}", password: "${args.password}", firstName: "${args.firstName}", lastName: "${args.lastName}" }) {
          ${USER}
        }
      }`)

      setUser(user)
      return user
    }
  }

  const login = async (args) => {
    if (api === 'rest') {
      const user = await rest(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/users/login`, args)
      setUser(user)
      return user
    }

    if (api === 'gql') {
      const { loginUser } = await gql(`mutation {
        loginUser(email: "${args.email}", password: "${args.password}") {
          user {
            ${USER}
          }
          exp
        }
      }`)

      setUser(loginUser?.user)
      return loginUser?.user
    }
  }

  const logout = async () => {
    if (api === 'rest') {
      await rest(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/users/logout`)
      setUser(null)
      return
    }

    if (api === 'gql') {
      await gql(`mutation {
        logoutUser
      }`)

      setUser(null)
    }
  }

  // On mount, get user and set
  useEffect(() => {
    const fetchMe = async () => {
      if (api === 'rest') {
        const user = await rest(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/api/users/me`,
          {},
          {
            method: 'GET',
          },
        )
        setUser(user)
      }

      if (api === 'gql') {
        const { meUser } = await gql(`query {
          meUser {
            user {
              ${USER}
            }
            exp
          }
        }`)

        setUser(meUser.user)
      }
    }

    fetchMe()
  }, [api])

  const forgotPassword = async (args) => {
    if (api === 'rest') {
      const user = await rest(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/users/forgot-password`,
        args,
      )
      setUser(user)
      return user
    }

    if (api === 'gql') {
      const { forgotPasswordUser } = await gql(`mutation {
        forgotPasswordUser(email: "${args.email}")
      }`)

      return forgotPasswordUser
    }
  }

  const resetPassword = async (args) => {
    if (api === 'rest') {
      const user = await rest(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/users/reset-password`,
        args,
      )
      setUser(user)
      return user
    }

    if (api === 'gql') {
      const { resetPasswordUser } = await gql(`mutation {
        resetPasswordUser(password: "${args.password}", token: "${args.token}") {
          user {
            ${USER}
          }
        }
      }`)

      setUser(resetPasswordUser.user)
      return resetPasswordUser.user
    }
  }

  return (
    // <Context.Provider
    //   value={{
    {
      user,
      setUser,
      login,
      logout,
      create,
      resetPassword,
      forgotPassword,
    }
    //   }}
    // >
    //   {children}
    // </Context.Provider>
  )
}

type UseAuth<T = User> = () => AuthContext // eslint-disable-line no-unused-vars

// export const useAuth: UseAuth = () => useContext(Context)
