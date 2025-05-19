import Header from '@/components/Header'
import VideoCard from '@/components/VideoCard'
import React from 'react'
//this is home page
const Page = () => {
  return (
    <main className='wrapper page'>
      <Header title="All Videos" subHeader='Public Library' />
      <h1 className='text-4xl font-karla text-blue-600'>Welcome to home page</h1>

      <VideoCard />
    </main>

    
  )
}

export default Page