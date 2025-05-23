"use client"

import FileInput from '@/components/FileInput'
import FormField from '@/components/FormField'
import { MAX_THUMBNAIL_SIZE, MAX_VIDEO_SIZE } from '@/constants'
import { getThumbnailUploadUrl, getVideoUploadUrl, saveVideoDetails } from '@/lib/actions/video'
import { useFileInput } from '@/lib/hooks/useFileInput'
import { useRouter } from 'next/navigation'

import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react'


//uploading to bunny (file)

const uploadFileToBunny = (file: File, uploadUrl: string, accessKey: string): Promise<void> => {
    return fetch(uploadUrl, {
        method: "PUT",
        headers: {
            'Content-Type': file.type,
            AccessKey: accessKey,
        },
        body: file,
    }).then((response) => {
        if (!response.ok) throw new Error("Upload Failed")
    })
}

const page = () => {
    const router = useRouter();

    const [videoDuration, setVideoDuration] = useState(0)


    const [error, setError] = useState('')
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        visibility: 'public'
    })


    const [isSubmitting, setIsSubmitting] = useState(false)

    const video = useFileInput(MAX_VIDEO_SIZE)
    const thumbnail = useFileInput(MAX_THUMBNAIL_SIZE)

    useEffect(() => {
        if (video.duration !== 0 && video.duration !== null) {
            setVideoDuration(video.duration);
        } else {
            setVideoDuration(0)
        }
    }, [video.duration])


    //to get recorded video
    useEffect(() =>{
        const checkForRecordedVideo = async() => {
            try{
                const stored = sessionStorage.getItem('recordedVideo')

                if(!stored) return;

                const {url, name, type, duration} = JSON.parse(stored);
                const blob = await fetch(url).then((res)=> res.blob());
                const file = new File([blob], name, {type, lastModified: Date.now()})

                if(video.inputRef.current){
                    const dataTransfer = new DataTransfer()
                    dataTransfer.items.add(file)
                    video.inputRef.current.files = dataTransfer.files;

                    const event = new Event('change', {bubbles: true})
                    video.inputRef.current.dispatchEvent(event)
                    video.handleFileChange({
                        target: {files: dataTransfer.files}
                    }as ChangeEvent<HTMLInputElement>)
                }


                if(duration) setVideoDuration(duration)

                sessionStorage.removeItem('recordedVideo')
                URL.revokeObjectURL(url)
            }catch(error){
                console.log('error in loading the recorded video')
            }
            checkForRecordedVideo();
        }
    },[])



    const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target

        setFormData((prevState) => ({ ...prevState, [name]: value }))
    }

    //handlesubmit

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()

        setIsSubmitting(true)

        try {
            if (!video.file || !thumbnail.file) {
                setError('Please upload thumbnail and video')
                return;
            }

            if (!formData.title || !formData.description) {
                setError('Please fill in all details')
                return;
            }

            //getting uploading url

            const { videoId, uploadUrl: videoUploadUrl, accessKey: videoAccessKey } = await getVideoUploadUrl();

            if (!getVideoUploadUrl || !videoAccessKey) throw new Error("Failed to get video upload credentials")

            // uploading video to bunny

            await uploadFileToBunny(video.file, videoUploadUrl, videoAccessKey);

            //uploading thumbnail to bunny

            const {
                uploadUrl: thumbnailUploadUrl,
                accessKey: thumbnailAccessKey,
                cdnUrl: thumbnailCdnUrl,
            } = await getThumbnailUploadUrl(videoId);

            if (!thumbnailUploadUrl || !thumbnailCdnUrl || !thumbnailAccessKey) throw new Error("Failed to get thumbnail upload credentials")

            //attaching thumbnail
            await uploadFileToBunny(thumbnail.file, thumbnailUploadUrl, thumbnailAccessKey);


            //creating new db entery to save(video)
            await saveVideoDetails({
                videoId,
                thumbnailUrl: thumbnailCdnUrl,
                ...formData,
                duration: videoDuration
            })

            console.log("video uploaded success")
            router.push(`/video/${videoId}`) //redirect to video details page(to be made)


        } catch (error) {
            console.log('Error submitting form', error);

        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <div className='wrapper page'>
            <p>Upload A Video</p>

            {error && <div className='error-field'>{error}</div>}

            <form className='rounded-20 shadow-10 gap-6 w-full flex flex-col px-5 py-7.5' onSubmit={handleSubmit}>
                <FormField
                    id="title"
                    label="Title"
                    placeholder="Enter a clean video title"
                    value={formData.title}
                    onChange={handleInputChange}
                />

                <FormField
                    id="description"
                    label="Description"
                    placeholder="Describe about the video"
                    value={formData.description}
                    as={"textarea"}
                    onChange={handleInputChange}
                />

                <FileInput
                    id="video"
                    label="Video"
                    accept="video/*"
                    file={video.file}
                    previewUrl={video.previewUrl}
                    inputRef={video.inputRef}
                    onChange={video.handleFileChange}
                    onReset={video.resetFile}
                    type="video"
                />

                <FileInput
                    id="thumbnail"
                    label="Thumbnail"
                    accept="image/*"
                    file={thumbnail.file}
                    previewUrl={thumbnail.previewUrl}
                    inputRef={thumbnail.inputRef}
                    onChange={thumbnail.handleFileChange}
                    onReset={thumbnail.resetFile}
                    type="image"
                />


                <FormField
                    id="visibility"
                    label="Visibility"
                    value={formData.visibility}
                    as="select"
                    options={[
                        { value: 'public', label: 'public' },
                        { value: 'private', label: 'private' }
                    ]}
                    onChange={handleInputChange}
                />


                <button type='submit' disabled={isSubmitting} className="bg-pink-100 text-white px-4 py-3 rounded-4xl cursor-pointer text-base font-semibold hover:bg-pink-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                    {isSubmitting ? 'Uploading...' : "Upload a video"}
                </button>
            </form>



        </div>
    )
}

export default page
