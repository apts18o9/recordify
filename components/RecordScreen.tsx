"use client"
import React, { useRef, useState } from 'react'
import { ICONS } from '@/constants'
import Image from "next/image"
import { useRouter } from 'next/navigation'
import { useScreenRecording } from '@/lib/hooks/useScreenRecording'

//record button logic
const RecordScreen = () => {
    const router = useRouter();
    const [isOpen, setIsOpen] = useState(false)
    const videoRef = useRef<HTMLVideoElement>(null)

    const { resetRecording,
        isRecording, recordedBlob, recordedVideoUrl, recordingDuration, startRecording, stopRecording

    } = useScreenRecording()

    const closeModal = () => {
        resetRecording();
        setIsOpen(false)
    }
    
    const handleStart = async () => {
       console.log("record btn clicked");
       
        await startRecording()
        setIsOpen(true)
        // console.log("recording btn clicked")
    }   


   

    const recordAgain = async () => {
        resetRecording();
        await startRecording();

        if (recordedVideoUrl && videoRef.current) {
            videoRef.current.src = recordedVideoUrl
        }
    }

    return (
        <div className='record'>
            <button type="button" className='primary-btn' onClick={()=> setIsOpen(true)}
            >
                <Image src={ICONS.record} alt="record" width={16} height={16} />
                <span>Record a video</span>
            </button>


            {isOpen && (
                <section className='dialog'>
                    <div className='overlay-record' onClick={closeModal}>
                        <div className='dialog-content'>
                            <figure>
                                <h3>Screen Recording</h3>
                                <button onClick={closeModal}>
                                    <Image src={ICONS.close} width={20} height={20} alt="close" />
                                </button>
                            </figure>

                            <section>
                                {isRecording ? (
                                    <article>
                                        <div />
                                        <span>Recording in progress</span>
                                    </article>
                                ) : (
                                    <p>Click to start recording your screen</p>
                                )}
                            </section>

                            <div className='record-box'>
                                {!isRecording && !recordedVideoUrl && (
                                    <button onClick={handleStart} className='record-start'>
                                        <Image src={ICONS.record} alt="record" width={16} height={16} />
                                        Record
                                    </button>
                                )}
                                {isRecording && (
                                    <button onClick={stopRecording} className='record-stop'>
                                        <Image src={ICONS.record} alt="record" width={16} height={16} />
                                        Stop Recording
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </section>
            )}
        </div>
    )
}

export default RecordScreen
