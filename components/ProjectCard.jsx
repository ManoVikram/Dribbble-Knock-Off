"use client"

import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

function ProjectCard({ id, image, title, description, creatorID, creatorName, avatarURL }) {
  const [randomLikes, setRandomLikes] = useState(0);
  const [randomViews, setRandomViews] = useState('');

  useEffect(() => {
    setRandomLikes(Math.floor(Math.random() * 10000))
    setRandomViews(String((Math.floor(Math.random() * 10000) / 1000).toFixed(1) + 'k'))
  }, []);

  return (
    <div className="flexCenter flex-col rounded-2xl h-[314px] w-full max-w-[414px]">
      <Link href={`/project/${id}`} className='flexCenter group relative w-full h-full'>
        <Image src={image} height={314} width={414} alt="project-image" className='w-full h-full object-cover rounded-2xl' />

        <div className="hidden group-hover:flex profile_card-title">
          <p className="w-full">{title}</p>
        </div>
      </Link>

      <div className="flexBetween w-full px-2 mt-3 font-semibold text-sm">
        <Link href={`/profile/${creatorID}`}>
          <div className='flexCenter gap-2'>
            <Image src={avatarURL} height={24} width={24} alt='profile-image' className='rounded-full' />

            <p>{creatorName}</p>
          </div>
        </Link>

        <div className="flexCenter gap-3">
          <div className="flexCenter gap-2">
            <Image src="/hearth.svg" height={12} width={12} alt='heart-icon' />

            <p className="text-sm">{randomLikes}</p>
          </div>

          <div className="flexCenter gap-2">
            <Image src="/eye.svg" height={12} width={12} alt='eye-icon' />

            <p className="text-sm">{randomViews}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProjectCard