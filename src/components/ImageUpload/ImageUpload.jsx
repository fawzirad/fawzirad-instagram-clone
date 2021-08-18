import React, { useState } from 'react'
import { Button } from '@material-ui/core'
import { useData } from '../../context/data-context'
import './ImageUpload.css'

function ImageUpload() {
  const [image, setImage] = useState(null)
  const [caption, setCaption] = useState('')
  const { progress, createPost } = useData()

  const handleChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0])
    }
  }

  const handleUpload = () => {
    const _post = {
      image,
      caption,
    }
    createPost(_post)
  }

  return (
    <>
      <section className='imageupload'>
        <input
          type='text'
          placeholder='Enter a caption...'
          onChange={(event) => setCaption(event.target.value)}
          value={caption}
        />
        <input type='file' onChange={handleChange} />
        <progress
          className='imageupload__progress'
          value={progress}
          max='100'
        />
        <Button onClick={handleUpload}>Upload</Button>
      </section>
    </>
  )
}

export default ImageUpload
