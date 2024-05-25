'use client'

import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import axios from 'axios'


export default function QuestionMark() {
  const handleSubmit = () => {
    // Handle submit logic here
    toast.success('Form submitted successfully!')
  }

  return (

    
    <main className="flex h-screen flex-col items-center justify-center p-10 bg-green">
      <div
        className="bg-white h-full w-full flex flex-col items-start rounded-xl p-20 relative"
        style={{ boxShadow: '7px 8px 17px 0px #00000040' }}
      >
        <p className="font-bold text-6xl text-darkgray font-poppins text-left w-full pb-8 leading-tight">
          Kamu kalo cerita sama aku ga ada yang marah kan?
        </p>
        <p className="w-full font-inter text-lg text-lightgray font-semibold text-left px-2">
          kami coba dengerin kamu kok, ga kayak pacar kamu yang toxic itu!
        </p>

        <div className="pt-10 w-full flex flex-col">
          <div className="w-full h-full relative">
            <textarea
              placeholder="tulis aja ceritamu disini..."
              className="text-lightgray p-3 w-full min-h-[200px] border-4 border-limegreen rounded-lg focus:border-green resize-none"
            />
          </div>
        </div>

        <button
          className="bg-limegreen text-white px-4 py-2 rounded absolute bottom-4 right-4"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </div>
      <ToastContainer />
    </main>
  )
}
