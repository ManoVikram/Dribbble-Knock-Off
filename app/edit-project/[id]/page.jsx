import { auth } from '@/auth'
import { Modal, ProjectForm } from '@components/index'
import { redirect } from 'next/navigation'
import React from 'react'

async function EditProject({ params }) {
  const session = await auth()

  if (!session?.user) redirect("/")

  const { id } = await params

  const response = await fetch(`http://localhost:8080/api/project/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    }
  })
  const data = await response.json()

  return (
    <Modal>
      <h3 className="modal-head-text">Edit project</h3>

      <ProjectForm type="edit" session={session} project={data} />
    </Modal>
  )
}

export default EditProject