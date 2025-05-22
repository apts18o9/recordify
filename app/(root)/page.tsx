import EmptyState from '@/components/EmptyState'
import Header from '@/components/Header'
import VideoCard from '@/components/VideoCard'
import { dummyCards } from '@/constants'
import { videos } from '@/drizzle/schema'
import { getAllVideos } from '@/lib/actions/video'
import React from 'react'
//this is home page for all
const Page = async ({ searchParams }: SearchParams) => {

  const {query, filter, page} = await searchParams;
  const {videos, pagination} = await getAllVideos(query, filter, Number(page) || 1)
  return (
    <main className='wrapper page'>
      <Header title="All Videos" subHeader='Public Library' />
      
      {videos?.length > 0 ? (
        <section className='video-grid'>
            {videos.map(({ videos: video, user}) => (
              <VideoCard 
                key={video.id}
                {...video}
                thumbnail={video.thumbnailUrl}
                userImg={user?.image || ''}
                username={user?.name || 'Guest'}
              />
            ))}
        </section>
      ): (
        <EmptyState icon='/assets/icons/video.svg' title="No Videos Found" description='Try again to see'/>
      )}
      
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