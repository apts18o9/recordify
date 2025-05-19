"use client"

import Link from 'next/link'
import React from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

const user = {}
const Navbar = () => {
  const router = useRouter();
  
  return (
    <header className='navbar'>
      <nav>
        <Link href="/">
          <Image src="/assets/icons/logo.svg" alt="Logo" width={32} height={32} />
          <h1>RecStore</h1>
        </Link>

        {user && (
          <figure>
            <button onClick={()=> router.push('/profile/123456')}>
              <Image src="/assets/images/dummy.jpg" alt="User" width={35} height={35} className="rounded-full aspect-square" />
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
