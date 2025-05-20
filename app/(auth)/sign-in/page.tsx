import Link from 'next/link'
import React from 'react'
import Image from 'next/image'
const page = () => {
  return (
    <main className='sign-in'>
        <aside className='testimonial'>
            <Link href="/">
                <Image src="/assets/icons/logo.svg" alt="logo" width={32} height={32} />
                <h1>Recodify</h1>
            </Link>

            <div className='description'>
                <section>
                    <figure>
                        {Array.from({ length: 5}).map((_,index) => (
                            <Image src="/assets/icons/star.svg" alt="star" width={20} height={20} key={index} />
                        ))}
                    </figure>
                    <p>SnapCast makes screen recording easy. From quick walkthroughs to
                        full presentations, it&apos;s fast, smooth, and shareable in seconds</p>
                        <article>
                            <Image src="/assets/images/jason.png" alt="jason" width={64} height={64} className='rounded-full' />
                        </article>
                        <div>
                            <p>Jason Doe</p>
                            <h2>Product Man</h2>
                        </div>
                </section>
            </div>

            <p>© Recordify {(new Date()).getFullYear()}</p>
        </aside>
        <aside className='google-sign-in'>
            <section>
                <Link href="/">
                    <Image src="/assets/icons/logo.svg" alt="logo" width={40} height={40} />
                    <p>Recordify</p>
                </Link>
                <p>Create and share your first <span>Recordify Video</span> quickly!</p>
                <button>
                    <Image src="/assets/icons/google.svg" alt="google" width={22} height={22} />
                    <span>Sign In with Google</span>
                </button>
            </section>
        </aside>
        <div className='overlay'></div>
    </main>
  )
}

export default page
