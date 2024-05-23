'use client'

import { useState, useRef } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export default function AddImage() {
  const [selectedImage, setSelectedImage] = useState(null)
  const fileInputRef = useRef(null)

  const handleClickButton = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setSelectedImage(reader.result)
        toast.success('Image uploaded successfully!')
      }
      reader.readAsDataURL(file)
    }
  }

  const handleCancel = () => {
    setSelectedImage(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = null // Clear the file input
    }
  }

  const handleSubmit = () => {
    // Handle the submit action here
    toast.success('Image submitted successfully!')
  }

  return (
    <main className="flex h-screen flex-col items-center justify-between p-10 bg-green">
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
              <img
                src={selectedImage || '/static/unggah.png'}
                alt="Icon"
                className="w-8 h-8"
              />
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
            <button
              className="bg-limegreen text-white px-4 py-2 rounded"
              onClick={handleSubmit}
            >
              Submit
            </button>
          </div>
        )}
      </div>
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: 'none' }}
        onChange={handleFileChange}
      />
      <ToastContainer />
    </main>
  )
}
