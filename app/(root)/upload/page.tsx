"use client"

import FileInput from '@/components/FileInput'
import FormField from '@/components/FormField'
import { MAX_THUMBNAIL_SIZE, MAX_VIDEO_SIZE } from '@/constants'
import { useFileInput } from '@/lib/hooks/useFileInput'
import React, { ChangeEvent, FormEvent, useState } from 'react'

const page = () => {

    const [error, setError] = useState('')
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        visibility: 'public'
    })


    const [isSubmitting, setIsSubmitting] = useState(false)

    const video = useFileInput(MAX_VIDEO_SIZE)
    const thumbnail = useFileInput(MAX_THUMBNAIL_SIZE)

    const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target

        setFormData((prevState) => ({ ...prevState, [name]: value }))
    }

    //handlesubmit

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()

        setIsSubmitting(true)

        try{
            if(!video.file || !thumbnail.file){
                setError('Please upload thumbnail and video')
                return;
            }

            if(!formData.title || !formData.description) {
                setError('Please fill in all details')
                return;
            }
             //send thumbnail to db
             //attach thumbnail
             //create new db rows for urls

        }catch(error){
            console.log('Error submitting form', error);
            
        }finally{
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


                <button type='submit' disabled={isSubmitting}  className="bg-pink-100 text-white px-4 py-3 rounded-4xl cursor-pointer text-base font-semibold hover:bg-pink-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                    {isSubmitting ? 'Uploading...' : "Upload a video"}
                </button>
            </form>



        </div>
    )
}

export default page
