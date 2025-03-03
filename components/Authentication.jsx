import React from 'react'
import { logIn } from '@/lib/actions/auth'

function Authentication() {
  return (
    < button className='py-2 px-6 bg-slate-950 font-semibold text-white rounded-full' onClick={logIn}>
      Log in
    </button >
  )
}

export default Authentication