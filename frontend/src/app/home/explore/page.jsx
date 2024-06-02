'use client'
import React, { useState, useEffect } from 'react'
import booksData from '../book.json'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/swiper-bundle.css'
import axios from 'axios'

import 'swiper/css/pagination'
import { Pagination, Autoplay } from 'swiper/modules'

const BookListPage = () => {
  const [selectedBook, setSelectedBook] = useState(null)
  const [selectedBookAPI, setSelectedBookAPI] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [books, setBooks] = useState([])
  const [selectedSubject, setSelectedSubject] = useState(null) // Initialize selectedSubject state

  useEffect(() => {
    const genres = [
      'architecture',
      'fantasy',
      'fiction',
      'novel',
      'comedy',
      'romance',
      'history',
      'animals',
      'thriller',
      'drama',
      'poetry',
    ]
    const seed = new Date().getTime() // Get current timestamp as seed
    const random = Math.floor(Math.random() * seed)
    const initialSubject = genres[random % genres.length]
    setSelectedSubject(initialSubject)
  }, [])

  useEffect(() => {
    if (!selectedSubject) return

    const fetchData = async () => {
      setIsLoading(true)
      try {
        const apiUrl = `https://openlibrary.org/subjects/${selectedSubject}.json?has_cover=true&fields=title,author_name,publish_year,subject,subject_key,ratings_average,ratings_sortable,cover_i,key,isbn,number_of_pages_median&limit=10`
        const response = await axios.get(apiUrl)
        const sortedBooks = response.data.works
        setBooks(sortedBooks.slice(0, 30))
      } catch (error) {
        console.error('Error fetching data:', error)
      }
      setIsLoading(false)
    }

    fetchData()
  }, [selectedSubject])

  return (
    <>
      {isLoading ? (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-200 z-50">
          <div className="text-center">
            <div role="status">
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: '78vh',
                }}
              >
                <div
                  style={{
                    border: '8px solid #f3f3f3',
                    borderTop: '8px solid #3498db',
                    borderRadius: '50%',
                    width: '60px',
                    height: '60px',
                    animation: 'spin 1s linear infinite',
                  }}
                />
              </div>
              <p className="text-blue-500 text-lg font-bold mt-4">Loading...</p>
            </div>
            <style>
              {`
                                @keyframes spin {
                                    0% { transform: rotate(0deg); }
                                    100% { transform: rotate(360deg); }
                                }
                            `}
            </style>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center min-h-screen bg-green p-4">
          <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-7xl">
            <h1 className="text-3xl font-bold mb-8 text-center text-darkgray font-poppins">
              Berikut Daftar Buku dari Kami
            </h1>
            <div>
              <h2 className="text-xl font-bold mb-4 text-darkgray font-poppins">
                Best Sellers 2024!!
              </h2>
              <Swiper
                modules={[Pagination, Autoplay]}
                spaceBetween={10}
                slidesPerView={5}
                loop={true}
                autoplay={{ delay: 1000, disableOnInteraction: false }}
                style={{ height: '450px' }}
              >
                {booksData.map((book, index) => (
                  <SwiperSlide key={index}>
                    <div
                      className="flex flex-col items-center shadow-md rounded-md hover:bg-slate-100 pt-5 pb-10"
                      onClick={() => setSelectedBook(book)}
                    >
                      <img
                        src={book.cover_image_link}
                        alt={book.title}
                        className="w-32 h-48 mb-2 rounded-xl"
                      />
                      <p className="text-center font-semibold max-w-32 text-black">
                        {book.title}
                      </p>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
              {selectedBook && (
                <div className="fixed top-0 left-0 flex items-center justify-center w-full h-svh bg-gray-900 bg-opacity-50 z-10">
                  <div className="bg-white p-8 rounded-lg shadow-lg max-w-2xl flex flex-col gap-3 overflow-auto h-5/6">
                    <p className="text-2xl font-bold text-gray-800 pb-3">
                      {selectedBook.title}
                    </p>
                    <img
                      src={selectedBook.cover_image_link}
                      className="rounded-lg w-1/2 drop-shadow-md"
                      alt={selectedBook.title}
                    />
                    <p className="text-gray-600">
                      <span className="font-bold">Deskripsi:</span>{' '}
                      {selectedBook.description}
                    </p>
                    <p className="text-gray-600">
                      <span className="font-bold">Penulis:</span>{' '}
                      {selectedBook.author}
                    </p>
                    <p className="text-gray-600">
                      <span className="font-bold">
                        Tahun Publikasi Pertama:
                      </span>{' '}
                      {selectedBook.latest_edition_year}
                    </p>
                    <p className="text-gray-600">
                      <span className="font-bold">Edisi Terakhir:</span>{' '}
                      {selectedBook.latest_edition_year}
                    </p>
                    <p className="text-gray-600">
                      <span className="font-bold">Genre:</span>{' '}
                      {selectedBook.genre}
                    </p>
                    <button
                      className="mt-4 bg-red-500 text-white px-4 py-2 rounded-md"
                      onClick={() => setSelectedBook(null)}
                    >
                      Close
                    </button>
                  </div>
                </div>
              )}
            </div>
            <div>
              <h2 className="text-xl font-bold mb-4 text-darkgray font-poppins">{`Genre ${selectedSubject}`}</h2>
              <Swiper
                modules={[Pagination, Autoplay]}
                spaceBetween={10}
                slidesPerView={5}
                loop={true}
                autoplay={{
                  delay: 1500,
                  disableOnInteraction: false,
                  reverseDirection: true,
                }}
                style={{ height: '450px' }}
              >
                {books.map((book, index) => (
                  <SwiperSlide key={index}>
                    <div
                      className="flex flex-col items-center shadow-md rounded-md hover:bg-slate-100 pt-5 pb-10"
                      onClick={() => setSelectedBookAPI(book)}
                    >
                      <img
                        src={`https://covers.openlibrary.org/b/id/${book.cover_id}-L.jpg`}
                        alt={book.title}
                        className="w-32 h-48 mb-2 rounded-xl"
                      />
                      <p className="text-center font-semibold max-w-32 text-black">
                        {book.title}
                      </p>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>

              {selectedBookAPI && (
                <div className="fixed top-0 left-0 flex items-center justify-center w-full h-svh bg-gray-900 bg-opacity-50 z-10">
                  <div className="bg-white p-8 rounded-lg shadow-lg max-w-2xl flex flex-col gap-3 overflow-auto h-5/6">
                    <p className="text-2xl font-bold text-gray-800 pb-3">
                      {selectedBookAPI.title}
                    </p>
                    <img
                      src={`https://covers.openlibrary.org/b/id/${selectedBookAPI.cover_id}-L.jpg`}
                      className="rounded-lg w-1/2 drop-shadow-md"
                      alt={selectedBookAPI.title}
                    />
                    <p className="text-gray-600">
                      <span className="font-bold">Deskripsi:</span>{' '}
                      {selectedBookAPI.description}
                    </p>
                    <p className="text-gray-600">
                      <span className="font-bold">Penulis:</span>{' '}
                      {(function () {
                        const authorNames = []
                        for (const author of selectedBookAPI.authors) {
                          authorNames.push(author.name)
                        }
                        return authorNames.join(', ')
                      })()}
                    </p>
                    <p className="text-gray-600">
                      <span className="font-bold">
                        Tahun Publikasi Pertama:
                      </span>{' '}
                      {selectedBookAPI.first_publish_year}
                    </p>
                    <p className="text-gray-600">
                      <span className="font-bold">Edisi Terakhir:</span>{' '}
                      {selectedBookAPI.edition_count}
                    </p>
                    <button
                      className="mt-4 bg-red-500 text-white px-4 py-2 rounded-md"
                      onClick={() => setSelectedBookAPI(null)}
                    >
                      Close
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default BookListPage
