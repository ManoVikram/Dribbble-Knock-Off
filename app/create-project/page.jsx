import { auth } from '@/auth'
import { Modal, ProjectForm } from '@components/index'
import { redirect } from 'next/navigation'
import React from 'react'

async function CreateProject() {
  const session = await auth()

  if (!session?.user) redirect("/")

  return (
    <Modal>
      <h3 className="modal-head-text">Create a new project</h3>

      <ProjectForm type="create" session={session} />
    </Modal>
  )
}

export default CreateProject