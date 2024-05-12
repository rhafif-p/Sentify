'use client'
import React, { useState } from 'react'

export default function Result() {
  const [selectedItem, setSelectedItem] = useState(null)

  const items = [
    {
      id: 1,
      name: 'Judul 1',
      description: 'Description for Judul 1',
      content: 'Content for Judul 1',
    },
    {
      id: 2,
      name: 'Judul 2',
      description: 'Description for Judul 2',
      content: 'Content for Judul 2',
    },
    {
      id: 3,
      name: 'Judul 3',
      description: 'Description for Judul 3',
      content: 'Content for Judul 3',
    },
    {
      id: 4,
      name: 'Judul 4',
      description: 'Description for Judul 4',
      content: 'Content for Judul 4',
    },
    {
      id: 5,
      name: 'Judul 5',
      description: 'Description for Judul 5',
      content: 'Content for Judul 5',
    },
    {
      id: 6,
      name: 'Judul 6',
      description: 'Description for Judul 6',
      content: 'Content for Judul 6',
    },
    {
      id: 7,
      name: 'Judul 7',
      description: 'Description for Judul 7',
      content: 'Content for Judul 7',
    },
    {
      id: 8,
      name: 'Judul 8',
      description: 'Description for Judul 8',
      content: 'Content for Judul 8',
    },
    {
      id: 9,
      name: 'Judul 9',
      description: 'Description for Judul 9',
      content: 'Content for Judul 9',
    },
  ]

  return (
    <main className="h-auto flex flex-col items-center justify-between p-10 bg-green">
      <div
        className="bg-white h-sdvh w-full flex flex-col items-center rounded-xl mx-8"
        style={{ boxShadow: '7px 8px 17px 0px #00000040' }}
      >
        <p className="font-bold text-6xl text-darkgray font-poppins text-center w-3/6 pt-10 pb-16 leading-tight mt-8">
          BERIKUT INI JUDUL BUKU REKOMENDASI KAMI
        </p>

        <p className="w-2/3 font-inter text-lg text-lightgray font-semibold text-center px-2 pb-8">
          Anda dapat melakukan pratinjau dengan memilih salah satu judul buku
        </p>

        <div className="flex h-full w-3/4 columns-2 py-10 gap-10">
          <div className="flex-1 overflow-y-auto overflow-hidden">
            {/* Scrollable column */}

            {/* Header description if its needed */}
            {/* <div className="pb-10 border-b border-gray-400">
              <p className="text-lg font-bold text-darkgray">Judul Buku</p>
              <p className="text-gray-600">Deskripsi</p>
            </div> */}
            {items.map((item) => (
              <div
                key={item.id}
                className={`p-4 h-32 border border-gray-200 rounded-xl mb-4 ${selectedItem === item.id ? 'bg-gray-100' : ''}`}
                onClick={() => setSelectedItem(item.id)}
              >
                <p className="text-xl font-bold text-darkgray">{item.name}</p>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>

          <div className="flex-1">
            {/* Detailed content column */}
            {selectedItem && (
              <div className="p-4">
                <p className="text-2xl font-bold text-darkgray">
                  {items.find((i) => i.id === selectedItem).name}
                </p>
                <p className="text-gray-600">
                  {items.find((i) => i.id === selectedItem).content}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}
