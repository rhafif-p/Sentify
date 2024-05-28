import Image from 'next/image'

import Home from './home/page'

import React from 'react'

export default function Main() {
  return (
    <main>
      <div className="flex flex-col ">
        <Home />
      </div>
    </main>
  )
}
