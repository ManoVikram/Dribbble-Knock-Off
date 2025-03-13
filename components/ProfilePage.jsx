import Image from 'next/image'
import React from 'react'
import { Button } from './ui/button'
import Link from 'next/link'
import ProjectCard from './ProjectCard'

function ProfilePage({ userData }) {
    return (
        <section className="flexCenter flex-col max-w-10xl w-full mx-auto paddings">
            <section className="flexBetween max-lg:flex-col gap-10 w-full">
                <div className="flex flex-col items-start w-full">
                    <Image src={userData?.image} width={100} height={100} className='rounded-full' alt='user-image' />

                    <p className="text-4xl mt-4">{userData?.name}</p>

                    <p className="md:text-5xl text-3xl font-extrabold md:mt-8 mt-5 max-w-full">I'm a Software Developer 👋</p>

                    <div className="flex mt-8 gap-5 w-full flex-wrap">
                        <Button className="bg-light-white-400 hover:bg-light-white-300 text-black-100 px-4 py-2">
                            <Image src="/plus-round.svg" alt='github-icon' width={20} height={20} /> Follow
                        </Button>

                        <Link href={`mailto:${userData?.email}`}>
                            <Button className="px-4 py-2">
                                <Image src="/email.svg" alt='email-icon' width={20} height={20} /> Hire Me
                            </Button>
                        </Link>
                    </div>
                </div>

                {userData?.projects?.length > 0 ? (
                    <Image src={userData?.projects[0]?.image} alt="project-image" width={739} height={554} className='rounded-xl object-cover w-[739px] h-[554px]' />
                ) : (
                    <Image src="/profile-post.png" width={739} height={554} alt="project-image" className='rounded-xl w-[739px] h-[554px]' />
                )}
            </section>

            <section className="flexStart flex-col lg:mt-28 mt-16 w-full">
                <p className="w-full text-left text-lg font-semibold">Recent Work</p>

                <div className="profile_projects">
                    {userData?.projects?.map((project) => (
                        <ProjectCard key={project.id} id={project.id} image={project.image} title={project.title} description={project.description} creatorID={project.created_by} creatorName={userData?.name} avatarURL={userData?.image} />
                    ))}
                </div>
            </section>
        </section>
    )
}

export default ProfilePage