import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

async function RelatedProjects({ userID, projectID }) {
  const response = await fetch(`http://localhost:8080/api/projects/${userID}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    }
  })
  const data = await response.json()

  if (data?.projects.length <= 1) return null

  return (
    <section className="flex flex-col mt-32 w-full">
      <div className="flexBetween">
        <p className='font-semibold'>More by {data?.name}</p>

        <Link href={`/profile/${data.id}`} className='text-primary-purple text-base'>
          View all
        </Link>

      </div>
      
      <div className="related_projects-grid">
        {data?.projects.map((project) => {
          if (project.id === projectID) return null

          return (
            <div key={project.id} className="flexCenter related_project-card drop-shadow-card">
              <Link href={`/project/${project.id}`} className='flex-center group relative h-[314px] w-[414px]'>
                <Image src={project.image} alt='project-image' height={314} width={414} className='h-[314px] w-[414px] object-cover rounded-2xl' />

                <div className="hidden group-hover:flex related_project-card_title">
                  <p className="w-full">{project.title}</p>
                </div>
              </Link>
            </div>
          )
        })}
      </div>
    </section>
  )
}

export default RelatedProjects