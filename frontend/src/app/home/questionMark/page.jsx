'use client'

import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function QuestionMark() {
  const [text, setText] = useState('')
  const [mood, setMood] = useState(null)
  const router = useRouter()

  const handleSubmit = async () => {
    await getMood()
    toast.success('Form submitted successfully!')
  }
  const handleViewResults = () => {
    if (mood) {
      localStorage.setItem('myMood', JSON.stringify(mood))
      console.log(mood)
      router.push('/home/results')
    } else {
      toast.error('Mood not predicted yet')
    }
  }

  const getMood = async () => {
    const reqbody = {
      texts: [text],
    }

    try {
      const response = await axios({
        method: 'POST',
        url: 'https://senpro25.azurewebsites.net/predict',
        data: reqbody,
        headers: {
          'Content-Type': 'application/json',
        },
      })
      const prediction = response.data.predictions[0]
      setMood(prediction)
      toast.success('Mood predicted successfully!')
      console.log(mood)
      if (prediction === 'joy') {
        setMood('senang')
      } else if (prediction === 'sadness') {
        setMood('sedih')
      } else if (prediction === 'anger') {
        setMood('marah')
      } else if (prediction === 'neutral') {
        setMood('netral')
      } else if (prediction === 'fear') {
        setMood('takut')
      }
    } catch (error) {
      console.log(error.message)
      toast.error('Error predicting mood: ' + error.message)
    }
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
              onChange={(e) => {
                setText(e.target.value)
              }}
              placeholder="tulis aja ceritamu disini..."
              className="text-lightgray p-3 w-full min-h-[200px] border-4 border-limegreen rounded-lg focus:border-green resize-none"
            />
          </div>
        </div>
        <div className="flex flex-row gap-10 absolute bottom-4 right-4">
          <button
            className="bg-limegreen text-white px-4 py-2 rounded"
            onClick={handleSubmit}
          >
            Submit
          </button>
          {mood && (
            <button
              className="bg-limegreen text-white px-4 py-2 rounded"
              onClick={handleViewResults}
            >
              View Results
            </button>
          )}
        </div>
      </div>
      <ToastContainer />
    </main>
  )
}
