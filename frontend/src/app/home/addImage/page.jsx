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
  // const [predictedClasses, setPredictedClasses] = useState(null)

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
    setMood(null) // Reset mood when canceling
    setPredictedClasses(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = null // Clear the file input
    }
  }

  const handleSubmit = async () => {
    if (selectedImage) {
      await getMood()
    } else {
      console.log('No photo uploaded')
      toast.error('Please upload an image first')
    }
  }

  const handleViewResults = () => {
    if (mood) {
      localStorage.setItem('myMood', JSON.stringify(mood))
      localStorage.setItem('predictedClasses', JSON.stringify(mood))
      router.push('/home/results')
    } else {
      toast.error('Mood not predicted yet')
    }
  }

  const getMood = async () => {
    setLoading(true)
    console.log('Sending base64Image:', base64Image)
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

      console.log(response.data)
      // let tempMood = response.data.top
      // let tempPredictedClasses = response.data.predicted_classes[0]
      let tempMood = response.data.predicted_classes[0]
      if (tempMood === 'angry') {
        tempMood = 'marah'
        console.log('Changed to', tempMood)
      } else if (tempMood === 'disgusted') {
        tempMood = 'jijik'
        console.log('Changed to', tempMood)
      } else if (tempMood === 'fearful') {
        tempMood = 'takut'
        console.log('Changed to', tempMood)
      } else if (tempMood === 'happy') {
        tempMood = 'senang'
        console.log('Changed to', tempMood)
      } else if (tempMood === 'neutral') {
        tempMood = 'netral'
        console.log('Changed to', tempMood)
      } else if (tempMood === 'sad') {
        tempMood = 'sedih'
        console.log('Changed to', tempMood)
      } else if (tempMood === 'surprised') {
        tempMood = 'terkejut'
        console.log('Changed to', tempMood)
      }
      // setPredictedClasses(tempPredictedClasses)
      // console.log('Predicted Classnya:', tempPredictedClasses[0])
      setMood(tempMood)
      setLoading(false)
      console.log('PREDICTED MOODNYA:', tempMood)
    } catch (error) {
      console.log(error.message)
      toast.error('Error uploading image: ' + error.message)
      setLoading(false)
    }
  }

  return (
    <main className="flex h-auto min-h-screen flex-col items-center justify-between p-10 bg-green">
      <div
        className="bg-white h-screen w-full flex flex-col items-center rounded-xl mx-8"
        style={{ boxShadow: '7px 8px 17px 0px #00000040' }}
      >
        <p className="font-bold text-6xl text-darkgray font-poppins text-center w-3/6 pt-10 pb-16 leading-tight mt-8">
          MASUKKAN FOTO YANG ANDA INGINKAN?
        </p>
        <p className="w-2/3 font-inter text-lg text-lightgray font-semibold text-center px-2">
          Anda dapat menggunakan foto yang sudah anda punya dari perangkat
          dengan cara menggungah atau menggunakan kamera untuk mengambil foto
          terkini melalui tombol pilihan dibawah.
        </p>

        <div className="flex flex-row justify-evenly text-center pt-40">
          <div className="relative flex flex-col items-center justify-center px-20">
            <div
              className="w-28 h-24 flex items-center justify-center rounded-lg border-4 border-solid border-limegreen"
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
          <div className="flex flex-row items-center mt-4 space-x-4">
            <button
              className="border border-limegreen text-limegreen px-4 py-2 rounded"
              onClick={handleCancel}
            >
              Cancel
            </button>
            {!mood ? (
              <button
                className="bg-limegreen text-white px-4 py-2 rounded"
                onClick={handleSubmit}
                disabled={loading}
              >
                {loading ? 'Loading...' : 'Predict Mood'}
              </button>
            ) : (
              <button
                className="bg-limegreen text-white px-4 py-2 rounded"
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
