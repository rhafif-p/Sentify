'use client'

import { useState, useRef } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useRouter } from 'next/navigation'
import axios from 'axios'

export default function AddImage() {
  const [base64Image, setBase64Image] = useState('')
  const [loading, setLoading] = useState(false)
  const [mood, setMood] = useState(null)
  const [selectedImage, setSelectedImage] = useState(null)
  const fileInputRef = useRef(null)
  const router = useRouter()

  const handleClickButton = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }

  const handleImageUpload = (event) => {
    const file = event.target.files[0]
    const reader = new FileReader()

    reader.onloadend = () => {
      const base64String = reader.result
        .replace('data:image/jpeg;base64,', '')
        .replace('data:image/png;base64,', '')
      setBase64Image(base64String)
      setSelectedImage(reader.result)
    }

    if (file) {
      reader.readAsDataURL(file)
    }
  }

  const handleCancel = () => {
    setSelectedImage(null)
    setBase64Image('')
    setMood(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = null
    }
  }

  const handleSubmit = async () => {
    if (selectedImage) {
      await getMood()
    } else {
      toast.error('Please upload an image first')
    }
  }

  const handleViewResults = () => {
    if (mood) {
      localStorage.setItem('myMood', JSON.stringify(mood))
      router.push('/home/results')
    } else {
      toast.error('Mood not predicted yet')
    }
  }

  const getMood = async () => {
    setLoading(true)
    try {
      const response = await axios({
        method: 'POST',
        url: 'https://detect.roboflow.com/senpro-emotion-detection/1',
        params: {
          api_key: 'vqxgZpwsPMqdRWrLT92J',
        },
        data: base64Image,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      })

      let tempMood = response.data.predicted_classes[0]
      const moodMapping = {
        angry: 'marah',
        disgusted: 'jijik',
        fearful: 'takut',
        happy: 'senang',
        neutral: 'netral',
        sad: 'sedih',
        surprised: 'terkejut',
      }
      tempMood = moodMapping[tempMood] || tempMood

      setMood(tempMood)
      console.log('MOODNYA:' + tempMood)
      setLoading(false)
    } catch (error) {
      toast.error('Error uploading image: ' + error.message)
      setLoading(false)
    }
  }

  return (
    <main className="flex h-screen min-h-screen flex-col items-center justify-between p-4 md:p-10 bg-green">
      <div
        className="bg-white h-full w-full flex flex-col items-center rounded-xl mx-4 md:mx-8"
        style={{ boxShadow: '7px 8px 17px 0px #00000040' }}
      >
        <p className="font-bold text-2xl md:text-4xl lg:text-6xl text-darkgray font-poppins text-center w-full px-4 md:px-0 md:w-4/5 lg:w-3/5 pt-10 pb-8 md:pb-16 leading-tight mt-8">
          MASUKKAN FOTO YANG ANDA INGINKAN?
        </p>
        <p className="w-full px-4 md:px-0 md:w-4/5 lg:w-2/3 font-inter text-sm md:text-lg text-lightgray font-semibold text-center">
          Anda dapat menggunakan foto yang sudah anda punya dari perangkat
          dengan cara menggungah atau menggunakan kamera untuk mengambil foto
          terkini melalui tombol pilihan dibawah.
        </p>

        <div className="flex flex-col md:flex-row justify-evenly text-center pt-16 md:pt-36 pb-10 md:pb-20 w-full">
          <div className="relative flex flex-col items-center justify-center px-4 md:px-20 mb-8 md:mb-0">
            <div
              className="w-28 h-24 flex items-center justify-center rounded-lg border-4 border-solid border-limegreen transition transform active:scale-95"
              onClick={handleClickButton}
              style={{ cursor: 'pointer' }}
            >
              {selectedImage ? (
                <img
                  src={selectedImage}
                  alt="Selected"
                  className="w-28 h-24 object-cover"
                />
              ) : (
                <img src="/static/unggah.png" alt="Icon" className="w-8 h-8" />
              )}
            </div>
            <p className="text-md font-bold text-lightgray pt-2">Unggah Foto</p>
          </div>
        </div>

        {selectedImage && (
          <div className="flex flex-col md:flex-row items-center mt-4 space-x-0 md:space-x-4 space-y-4 md:space-y-0">
            <button
              className="border border-limegreen text-limegreen px-4 py-2 rounded transition transform active:scale-95"
              onClick={handleCancel}
            >
              Cancel
            </button>
            {!mood ? (
              <button
                className="bg-limegreen text-white px-4 py-2 rounded transition transform active:scale-95"
                onClick={handleSubmit}
                disabled={loading}
              >
                {loading ? 'Loading...' : 'Predict Mood'}
              </button>
            ) : (
              <button
                className="bg-limegreen text-white px-4 py-2 rounded transition transform active:scale-95"
                onClick={handleViewResults}
              >
                View Results
              </button>
            )}
          </div>
        )}
      </div>
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: 'none' }}
        onChange={handleImageUpload}
      />
      <ToastContainer />
    </main>
  )
}
