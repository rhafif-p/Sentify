import React from 'react'

export default function Home() {
  return (
    <main className="flex h-screen flex-col items-center justify-between p-10 bg-green">
      <div
        className="bg-white h-screen flex flex-col items-center rounded-xl m-8"
        style={{ boxShadow: '7px 8px 17px 0px #00000040' }}
      >
        <p className="font-bold text-6xl text-darkgray font-poppins text-center w-2/5 pt-10 pb-16 leading-tight mt-8">
          APA YANG INGIN ANDA BACA HARI INI?
        </p>
        <p className="w-2/3 font-inter text-lg text-lightgray font-semibold text-center px-2">
          Platform ini akan membantu andan untuk menemukan buku bacaan yang
          sesuai dengan perasaan yang rasakan saat ini. Silakan memilih pilihan
          dibawah sehingga kami dapat lebih mengenal lebih jauh preferensi dan
          yang anda rasaka. Semua data yang anda berikan akan kami jaga
          kerahasiaannya dan tidak akan kami sebarluaskan ke pihak manapun.
        </p>

        <div className="flex flex-row justify-evenly text-center pt-40">
          <div className="flex flex-col w-1/6 ">
            <button className="text-lg font-bold bg-limegreen text-white flex items-center justify-center p-4 rounded-lg">
              <img src="/static/face.png" alt="Icon" className="w-6 h-6 mr-2" />
              Face Recognition
            </button>
            <p className="text-sm font-semibold text-lightgray pt-12">
              Anda dapat mengunggah foto terkini dari diri anda melalui kamera
              atau melalui foto yang sudah ada yang memungkinkan kami untuk
              membaca emosi anda dari foto tersebut.
            </p>
          </div>

          <div className="flex flex-col w-1/6">
            <button className="text-lg font-bold bg-limegreen text-white flex items-center justify-center p-4 rounded-lg">
              <img
                src="/static/camera.png"
                alt="Icon"
                className="w-6 h-6 mr-2"
              />
              Answer Question
            </button>
            <p className="text-sm font-semibold text-lightgray pt-12">
              Anda dapat mengunggah foto terkini dari diri anda melalui kamera
              atau melalui foto yang sudah ada yang memungkinkan kami untuk
              membaca emosi anda dari foto tersebut.
            </p>
          </div>
        </div>
      </div>
    </main>
  )
}
