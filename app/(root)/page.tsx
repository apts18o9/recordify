import Header from '@/components/Header'
import VideoCard from '@/components/VideoCard'
import { dummyCards } from '@/constants'
import React from 'react'
//this is home page for all
const Page = () => {
  return (
    <main className='wrapper page'>
      <Header title="All Videos" subHeader='Public Library' />
      <h1 className='text-4xl font-karla text-blue-600'>Welcome to home page</h1>


      
      <section className='video-grid'>
          {dummyCards.map((card)=> (
            <VideoCard key={card.id} {...card} />
          ))}
      </section>
      
      {/* <VideoCard 
        id="1"
        title="Social Message - 18 May 2025"
        thumbnail="/assets/samples/thumbnail (1).png"
        createdAt={new Date ("2025-02-02 15:18:18.254")}
        userImg="/assets/images/jason.png"
        username="Jason"
        views={10}
        visibility="public"
        duration={156}
      
      /> */}
    </main>

    
  )
}

export default Page