import React, { Suspense } from 'react'

import { getMeUser } from '@/utilities/getMeUser'
import { LoginForm } from '@/components/LoginForm'
import { Loader } from 'lucide-react'

async function LoginPage() {
  //   await getMeUser({
  //     validUserRedirect: `/account?message=${encodeURIComponent('You are already logged in.')}`,
  //   })
  getMeUser().then((res) => console.log(res.user))
  return (
    <div className="max-w-7xl m-auto px-5 md:px-10 py-20 md:py-24 z-10 relative text-white">
      <h1>Log in</h1>
      <Suspense fallback={<Loader />}>
        <LoginForm />
      </Suspense>
    </div>
  )
}

export default LoginPage
