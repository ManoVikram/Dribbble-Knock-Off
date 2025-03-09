"use client"

import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'
import { Button } from './ui/button'
import { useRouter } from 'next/navigation'

function ProjectActions({ projectID, session }) {
  const router = useRouter()
  const [isDeleting, setIsDeleting] = useState(false)

  async function handleDeleteProject() {
    setIsDeleting(true)

    try {
      const response = await fetch(`http://localhost:8080/api/deleteproject/${projectID}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${session.sessionToken}`
        },
      })
      console.log(response.json());

      router.push("/")
    } catch (error) {
      console.log(error)
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <>
      <Link href={`/edit-project/${projectID}`} className='flexCenter edit-action_btn'>
        <Image src="/pencil.svg" alt='edit' height={16} width={16} />
      </Link>

      <Button className={`flexCenter h-[40px] p-3 text-gray-100 hover:bg-red-600 rounded-lg text-sm font-medium ${isDeleting ? 'bg-gray' : 'bg-primary-purple'}`} onClick={handleDeleteProject}>
        <Image src="/trash.svg" alt='delete' height={16} width={16} />
      </Button>
    </>
  )
}

export default ProjectActions