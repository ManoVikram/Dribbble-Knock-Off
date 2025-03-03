import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Authentication from './Authentication'
import ProfileMenu from './ProfileMenu'
import { navLinks } from '@/constants'
import { auth } from '@/auth'

async function Navbar() {
    const session = await auth()

    return (
        <nav className='flexBetween navbar'>
            <div className='flex-1 flexStart gap-10'>
                <Link href="/">
                    <Image src="/logo.svg" alt='logo' height={43} width={115} />
                </Link>

                <ul className='xl:flex hidden text-small gap-7'>
                    {navLinks.map((navLink) => (
                        <Link key={navLink.key} href={navLink.href}>{navLink.text}</Link>
                    ))}
                </ul>
            </div>

            <div className="flexCenter gap-4">
                {session?.user ? (
                    <>
                        <ProfileMenu session={session} />

                        <Link href="/create-project">
                            ShareWork
                        </Link>
                    </>
                ) : (
                    <Authentication />
                )}
            </div>
        </nav>
    )
}

export default Navbar