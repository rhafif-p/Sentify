'use client'
import React from 'react'
import Link from 'next/link'

export default function Home() {
  const handleFaceRecognitionClick = (event) => {
    event.preventDefault()
    window.location.href = '/home/addImage'
  }

  const handleAnswerQuestionClick = (event) => {
    event.preventDefault()
    window.location.href = '/home/questionMark'
  }

  const handleExplorePage = (event) => {
    event.preventDefault()
    window.location.href = '/home/explore'
  }

  return (
    <main className="flex h-screen min-h-screen flex-col items-center justify-between p-4 md:p-10 bg-green">
      <div
        className="bg-white h-full w-full flex flex-col items-center rounded-xl mx-4 md:mx-8"
        style={{ boxShadow: '7px 8px 17px 0px #00000040' }}
      >
        <p className="font-bold text-2xl md:text-4xl lg:text-6xl text-darkgray font-poppins text-center w-full px-4 md:px-0 md:w-4/5 lg:w-3/5 pt-10 pb-8 md:pb-16 leading-tight mt-8">
          APA YANG INGIN ANDA BACA HARI INI?
        </p>
        <p className="w-full px-4 md:px-0 md:w-4/5 lg:w-2/3 font-inter text-sm md:text-lg text-lightgray font-semibold text-center">
          Platform ini akan membantu anda untuk menemukan buku bacaan yang
          sesuai dengan perasaan yang rasakan saat ini. Silakan memilih pilihan
          dibawah sehingga kami dapat lebih mengenal lebih jauh preferensi dan
          yang anda rasaka. Semua data yang anda berikan akan kami jaga
          kerahasiaannya dan tidak akan kami sebarluaskan ke pihak manapun.
        </p>

        <div className="flex flex-col md:flex-row justify-evenly text-center pt-16 md:pt-36 pb-10 md:pb-20 w-full">
          <div className="flex flex-col w-full md:w-1/3 lg:w-1/6 px-4 md:px-2 lg:px-0 mb-8 md:mb-0">
            <button
              className="text-lg font-bold bg-limegreen text-white flex items-center justify-center p-4 rounded-lg transition transform active:scale-95"
              onClick={handleFaceRecognitionClick}
            >
              <div className="flex flex-row items-center">
                <img
                  src="/static/face.png"
                  alt="Icon"
                  className="w-8 h-8 mr-2"
                />
                Face Recognition
              </div>
            </button>
            <p className="text-sm font-semibold text-lightgray pt-8">
              Anda dapat mengunggah foto terkini dari diri anda melalui foto
              yang sudah ada yang memungkinkan kami untuk membaca emosi anda
              dari foto tersebut.
            </p>
          </div>

          <div className="flex flex-col w-full md:w-1/3 lg:w-1/6 px-4 md:px-2 lg:px-0">
            <button
              className="text-lg font-bold bg-limegreen text-white flex items-center justify-center p-4 rounded-lg transition transform active:scale-95"
              onClick={handleAnswerQuestionClick}
            >
              <div className="flex flex-row items-center">
                <img
                  src="/static/camera.png"
                  alt="Icon"
                  className="w-8 h-9 mr-2"
                />
                Answer Question
              </div>
            </button>
            <p className="text-sm font-semibold text-lightgray pt-8">
              Kami akan mencoba memahami anda sebaik mungkin dari jawaban yang
              anda berikan, sehingga cobalah untuk jujur pada perasaan anda.
            </p>
          </div>
        </div>
        <p
          className="text-center font-bold text-md text-lightgray underline underline-offset-4 hover:underline-offset-8 cursor-pointer	"
          onClick={handleExplorePage}
        >
          Explore Daftar Buku
        </p>
      </div>
    </main>
  )
}
