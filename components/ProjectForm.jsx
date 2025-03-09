"use client"

import React, { useState } from 'react'
import Image from 'next/image'
import FormField from './FormField'
import DropDownField from './DropdownField'
import { categoryFilters } from '@/constants'
import { Button } from './ui/button'
import { Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation'

function ProjectForm({ type, session, project }) {
  const router = useRouter()
  const [form, setForm] = useState({
    title: project?.title || "",
    description: project?.description || "",
    image: project?.image || "",
    liveSiteUrl: project?.live_site_url || "",
    githubUrl: project?.github_url || "",
    category: project?.category || "",
    createdBy: session?.user?.id,
  })
  const [isFormSubmitting, setIsFormSubmitting] = useState(false)

  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async function onSubmit(event) {
    event.preventDefault()

    setIsFormSubmitting(true)

    if (type === "create") {
      await fetch("http://localhost:8080/api/createproject", {
        method: "POST",
        body: JSON.stringify(form),
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${session.sessionToken}`
        },
      })
    } else if (type === "edit") {
      await fetch(`http://localhost:8080/api/updateproject/${project.id}`, {
        method: "PUT",
        body: JSON.stringify(form),
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${session.sessionToken}`
        },
      })
    }
    
    router.push("/")

    setIsFormSubmitting(false)
  }

  function onImageChange(event) {
    event.preventDefault()

    const imageFile = event.target?.files[0]

    if (!imageFile)
      return

    if (!imageFile.type.includes("image")) {
      return alert("Please upload an image file")
    }

    const reader = new FileReader()

    reader.readAsDataURL(imageFile)

    reader.onload = () => {
      const result = reader.result

      onStateChange("image", result)
    }
  }

  function onStateChange(fieldName, value) {
    setForm((previousForm) => {
      return {
        ...previousForm,
        [fieldName]: value
      }
    })
  }

  return (
    <form onSubmit={onSubmit} className='flexStart form'>
      <div className="flexStart form_image-container">
        <label htmlFor="poster" className='flexCenter form_image-label'>
          {!form.image && "Choose a poster for your project"}
        </label>

        <input type="file" id='image' accept='image/*' required={type === "create"} className='form_image-input' onChange={onImageChange} />

        {form.image && (
          <Image src={form.image} alt='selected-posetr' className='sm:p-10 object-contain z-20' fill />
        )}
      </div>

      <FormField title="Title" state={form.title} placeholder="Flexibbble" setState={(value) => onStateChange("title", value)} />

      <FormField title="Description" state={form.description} placeholder="Showcase and discover remarkable developer projects." setState={(value) => onStateChange("description", value)} />

      <FormField type="url" title="Website URL" state={form.liveSiteUrl} placeholder="http://dribbble.com/" setState={(value) => onStateChange("liveSiteUrl", value)} />

      <FormField type="url" title="GitHub URL" state={form.githubUrl} placeholder="http://github.com/" setState={(value) => onStateChange("githubUrl", value)} />

      <DropDownField title="Category" state={form.category} filters={categoryFilters} setState={(value) => onStateChange("category", value)} />

      <div className="flexStart w-full">
        <Button className={`${isFormSubmitting ? "bg-purple-300" : "bg-purple-500"} hover:bg-purple-700`} disabled={isFormSubmitting}>
          {isFormSubmitting ? <Loader2 className="animate-spin" /> : <></>}
          {isFormSubmitting ? (type === "create" ? "Creating" : "Updating") : (type === "create" ? "Create" : "Update")}
        </Button>
      </div>
    </form>
  )
}

export default ProjectForm