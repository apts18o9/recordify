
import React from 'react'
import { createIframeLink } from '@/lib/utils'
//to show the video details(preview)
const VideoPlayer = ({videoId}: VideoPlayerProps) => {
  return (
    <div className='video-player'>
        <iframe
        src={createIframeLink((videoId))}
        loading='lazy'
        title="Video Player"
        style={{border:0, zIndex: 50}}
        allowFullScreen
        allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture"
    />
    </div>
    
  )
}
//video player running in this file using iframe which is used to run external videos in current page
export default VideoPlayer
