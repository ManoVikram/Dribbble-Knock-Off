import { auth } from '@/auth'
import { Modal } from '@components/index'
import ProjectActions from '@components/ProjectActions'
import RelatedProjects from '@components/RelatedProjects'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

async function Project({ params }) {
    const { id } = await params
    const session = await auth()

    const response = await fetch(`http://localhost:8080/api/project/${id}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        }
    })
    const data = await response.json()

    if (!data) {
        return (
            <p className='no-result-text'>Failed to fetch project information</p>
        )
    }

    return (
        <Modal>
            <section className="flexBetween gap-y-8 max-w-4xl max-sm:flex-col w-full">
                <div className="flex-1 flex items-start gap-5 w-full max-sm:flex-col">
                    <Link href={`/profile/${data?.created_by?.id}`}>
                        <Image src={data?.created_by?.image} height={50} width={50} alt='profile-image' className='rounded-full' />
                    </Link>

                    <div className="flex-1 flexStart flex-col gap-1">
                        <p className="self-start text-lg font-semibold">{data?.title}</p>

                        <div className="user-info">
                            <Link href={`/profile/${data?.created_by?.id}`}>
                                {data?.created_by?.name}
                            </Link>

                            <Image src="/dot.svg" height={4} width={4} alt='dot' />

                            <Link href={`/?category=${data?.category.toLowerCase()}`} className='text-primary-purple font-semibold'>
                                {data?.category}
                            </Link>
                        </div>
                    </div>
                </div>

                {session?.user?.email === data?.created_by?.email && (
                    <div className="flex justify-end items-center gap-2">
                        <ProjectActions projectID={data?.id} />
                    </div>
                )}
            </section>

            <section className="flexCenter flex-col mt-20">
                <p className="max-w-5xl text-xl font-normal">
                    {data?.description}
                </p>

                <div className="flex flex-wrap mt-5 gap-5">
                    <Link href={data?.github_url} target='_blank' rel="noopener noreferrer" className="flexCenter gap-2 tex-sm font-medium text-primary-purple">
                        🖥 <span className="underline">Github</span>
                    </Link>

                    <Image src="/dot.svg" width={4} height={4} alt="dot" />

                    <Link href={data?.live_site_url} target="_blank" rel="noopener noreferrer" className="flexCenter gap-2 tex-sm font-medium text-primary-purple">
                        🚀 <span className="underline">Live Site</span>
                    </Link>
                </div>
            </section>

            <section className="flexCenter w-full gap-8 mt-28">
                <span className="w-full h-0.5 bg-light-white-200" />

                <Link href={`/profile/${data?.created_by?.id}`} className='min-w-[82px] min-h-[82px]'>
                    <Image src={data?.created_by?.image} height={82} width={82} alt='profile-image' className='rounded-full' />
                </Link>

                <span className="w-full h-0.5 bg-light-white-200" />
            </section>

            <RelatedProjects userID={data?.created_by?.id} projectID={data?.id} />
        </Modal>
    )
}

export default Project