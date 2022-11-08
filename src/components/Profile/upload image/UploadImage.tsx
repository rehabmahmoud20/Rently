import React, { useRef, useState } from 'react'
import styles from './UploadImage.module.scss'
function UploadImage () {
  const profilePhoto = useRef(null)
  const [photo, setPhoto] = useState(null)
  const handleImageUpload = (e, uploadedImage, setPhoto) => {
    const [file] = e.target.files
    if (file) {
      const reader = new FileReader()
      const { current } = uploadedImage
      current.file = file
      reader.onload = (e) => {
        setPhoto(e.target.result)
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <div>
      <div
        className={`${styles.profile_photo} block`}
        style={{
          backgroundImage: photo ? `url(${photo})` : '#8f8f8f',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center center',
          backgroundSize: 'cover'
        }}
      >
        {' '}
        <input
          type="file"
          accept="image/*"
          name="profile_photo"
          multiple={false}
          ref={profilePhoto}
          className={styles.image_input}
          onChange={(e) => handleImageUpload(e, profilePhoto, setPhoto)}
        />
        <div
          className={`circle ${styles.user_image_container}`}
          onClick={() => profilePhoto.current.click()}
        >
          <div className={styles.upload_content}>
            <img src={'add icon'} className="upload-icon" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default UploadImage
