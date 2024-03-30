import React from 'react'

export default function addImage() {
  return (
    <main className="flex h-screen flex-col items-center justify-between p-10 bg-green">
      <div
        className="bg-white h-screen flex flex-col items-center rounded-xl m-8"
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
            <div className="w-28 h-24 flex items-center justify-center rounded-lg border-4 border-solid border-limegreen">
              <img src="/static/kamera.png" alt="Icon" className="w-8 h-8" />
            </div>
            <p className="text-md font-bold text-lightgray pt-2">
              Gunakan Kamera
            </p>
          </div>

          <div className="relative flex flex-col items-center justify-center px-20">
            <div className="w-28 h-24 flex items-center justify-center rounded-lg border-4 border-solid border-limegreen">
              <img src="/static/unggah.png" alt="Icon" className="w-8 h-8" />
            </div>
            <p className="text-md font-bold text-lightgray pt-2">Unggah Foto</p>
          </div>
        </div>
      </div>
    </main>
  )
}
