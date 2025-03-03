"use client"

import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React, { useCallback, useRef } from 'react'

function Modal({ children }) {
  const overlayRef = useRef(null)
  const wrapperRef = useRef(null)

  const router = useRouter()

  const onDismissed = useCallback(
    () => {
      router.push('/')
    },
    [router],
  )

  const onClick = useCallback(
    (event) => {
      if ((event.target === overlayRef.current) && onDismissed) {
        onDismissed()
      }
    },
    [overlayRef, onDismissed],
  )

  return (
    <div ref={overlayRef} className='modal' onClick={onClick}>
      <button type="button" onClick={onDismissed} className='absolute top-4 right-8'>
        <Image src='/close.svg' alt='close-button' height={17} width={17} />
      </button>

      <div ref={wrapperRef} className='modal_wrapper'>
        {children}
      </div>
    </div>
  )
}

export default Modal