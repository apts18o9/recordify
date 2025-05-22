// 'use client'
import VideoDetailHeader from '@/components/VideoDetailHeader';
import VideoPlayer from '@/components/VideoPlayer';
import { getVideoById } from '@/lib/actions/video';
import { redirect } from "next/navigation"
import React from 'react'

const page = async ({ params }: Params) => {

  const { videoId } = await params;

  const { user, videos: video } = await getVideoById(videoId)

  if (!video) redirect('/404')

  return (
    <main className='wrapper page'>
      {/* <h1 className='text-2xl'>{video.title}</h1> */}
      {/* <h1 className='text-2xl'>{video.videoId}</h1> */}

      <VideoDetailHeader {...video} userImg={user?.image} username={user?.name} ownerId={video.userId}/>
      <section className='video-details'>
        <div className='content'>
          <VideoPlayer videoId={video.videoId} />

        </div>
      </section>
    </main>
  )
}

export default page
