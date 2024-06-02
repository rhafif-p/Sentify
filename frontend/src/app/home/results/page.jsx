'use client'

import React, { useState, useEffect } from 'react'
import axios from 'axios'

export default function Result() {
  const [books, setBooks] = useState([])
  const [selectedBook, setSelectedBook] = useState(null)
  const [bookDescription, setBookDescription] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [mood, setMood] = useState(null)

  const genres = []

  useEffect(() => {
    const storedMood = localStorage.getItem('myMood')
    const parsedMood = storedMood ? JSON.parse(storedMood) : null
    setMood(parsedMood)
  }, [])

  useEffect(() => {
    const fetchData = async () => {
      if (!mood) {
        return
      }

      setIsLoading(true)
      try {
        const moodSubjects = {
          marah: ['algebra', 'architecture'],
          jijik: ['magic', 'film', 'health'],
          takut: ['comedy', 'humor', 'programming'],
          senang: ['exercise', 'nutrition', 'fantasy'],
          netral: ['poetry', 'romance', 'thriller'],
          sedih: ['exercise', 'psychology', 'self-help'],
          terkejut: ['computerscience', 'history', 'education'],
        }

        const selectedSubjects = moodSubjects[mood] // Get subjects based on mood
        const seed = new Date().getTime() // Get current timestamp as seed
        const random = Math.floor(Math.random() * seed)
        const selectedSubject =
          selectedSubjects[random % selectedSubjects.length]
        console.log('Selected subject:', selectedSubject)

        const apiUrl = `https://openlibrary.org/subjects/${selectedSubject}.json?has_cover=true&fields=title,author_name,publish_year,subject,subject_key,ratings_average,ratings_sortable,cover_i,key,isbn,number_of_pages_median&limit=5`
        const response = await axios.get(apiUrl)
        console.log(response.data.works)
        const sortedBooks = response.data.works
        setBooks(sortedBooks.slice(0, 30))
      } catch (error) {
        console.error('Error fetching data:', error)
      }
      setIsLoading(false)
    }
    fetchData()
  }, [mood])

  useEffect(() => {
    const fetchBookDescription = async () => {
      if (selectedBook) {
        try {
          const key = selectedBook.key
          const response = await axios.get(`https://openlibrary.org${key}.json`)
          const bookDetails = response.data

          let description =
            'We cannot find the description for this book due to copyright issues.'

          if (bookDetails.description) {
            if (typeof bookDetails.description === 'string') {
              description = bookDetails.description
            } else if (bookDetails.description.value) {
              description = bookDetails.description.value
            }
          }

          setBookDescription(description)

          // Scroll back to the detailed content column
          window.scrollTo({
            top: document.getElementById('detailed-content').offsetTop,
            behavior: 'smooth',
          })
        } catch (error) {
          console.error('Error fetching book description:', error)
        }
      }
    }
    fetchBookDescription()
  }, [selectedBook])

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
        <main className="h-auto flex flex-col items-center justify-between p-10 bg-green">
          <div
            className="bg-white h-sdvh w-full flex flex-col items-center rounded-xl mx-8"
            style={{ boxShadow: '7px 8px 17px 0px #00000040' }}
          >
            <p className="font-bold text-6xl text-gray-800 font-poppins text-center w-3/6 pt-10 pb-16 leading-tight mt-8">
              BERIKUT INI JUDUL BUKU REKOMENDASI KAMI UNTUK MOOD{' '}
              {mood.toUpperCase()}
            </p>

            <p className="w-2/3 font-inter text-lg text-gray-500 font-semibold text-center px-2 pb-8">
              Nih bisa jadi referensi buat kamu yang lagi {mood}
            </p>

            <div className="flex h-full w-3/4 columns-2 py-10 gap-10">
              <div className="flex-1">
                {books.map((book) => (
                  <div
                    key={book.title}
                    className={`p-4 h-auto border border-gray-200 rounded-xl mb-4 flex flex-row gap-4 ${selectedBook === book ? 'bg-gray-100' : ''}`}
                    onClick={() => setSelectedBook(book)}
                  >
                    <div>
                      <img
                        src={`https://covers.openlibrary.org/b/id/${book.cover_id}-L.jpg`}
                        alt={book.title}
                        className="w-24 rounded-lg"
                      />
                    </div>
                    <div>
                      <p className="text-xl font-bold text-gray-800">
                        {book.title}
                      </p>
                      <p className="text-gray-600">
                        {(function () {
                          const authorNames = []
                          for (const author of book.authors) {
                            authorNames.push(author.name)
                          }
                          return authorNames.join(', ')
                        })()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex-1" id="detailed-content">
                {selectedBook && (
                  <div className="p-4 flex flex-col gap-4">
                    <p className="text-5xl font-bold text-gray-800">
                      {selectedBook.title}
                    </p>
                    <img
                      src={`https://covers.openlibrary.org/b/id/${selectedBook.cover_id}-L.jpg`}
                      className="rounded-lg w-1/2 drop-shadow-md"
                    />
                    <p className="text-gray-600">
                      <span className="font-bold">Deskripsi:</span>{' '}
                      {bookDescription}
                    </p>
                    <p className="text-gray-600">
                      <span className="font-bold">Penulis:</span>{' '}
                      {(function () {
                        const authorNames = []
                        for (const author of selectedBook.authors) {
                          authorNames.push(author.name)
                        }
                        return authorNames.join(', ')
                      })()}
                    </p>
                    <p className="text-gray-600">
                      <span className="font-bold">
                        Tahun Publikasi Pertama:
                      </span>{' '}
                      {selectedBook.first_publish_year}
                    </p>
                    <p className="text-gray-600">
                      <span className="font-bold">Edisi Terakhir:</span>{' '}
                      {selectedBook.edition_count}
                    </p>
                    <p className="text-gray-600">
                      <span className="font-bold">Genre:</span>{' '}
                      {selectedBook.subject && selectedBook.subject.length > 0
                        ? selectedBook.subject.slice(0, 5).join(', ')
                        : 'N/A'}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </main>
      )}
    </>
  )
}
