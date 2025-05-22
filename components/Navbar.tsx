"use client"

import Link from 'next/link'
import React from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { authClient } from '@/lib/auth-client'


const Navbar = () => {
  const router = useRouter();
  const {data: session} = authClient.useSession()
  const user = session?.user;

  return (
    <header className='navbar'>
      <nav>
        <Link href="/">
          <Image src="/assets/icons/logo.svg" alt="Logo" width={32} height={32} />
          <h1>RecStore</h1>
        </Link>

        {user && (
          <figure>
            <button onClick={() => router.push(`/profile/${user?.id}`)}>
              <Image src={user.image || ''} alt="User" width={24} height={24} className='rounded-full' />
            </button>
            <button className='cursor-pointer'>
              <Image src="/assets/icons/logout.svg" alt="Logout" width={35} height={35} className='rotate-180' />
            </button>
          </figure>
        )}
      </nav>

    </header>
  )
}

export default Navbar
