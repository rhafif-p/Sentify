'use client'

import React, { useState, useEffect } from 'react'
import axios from 'axios'

export default function Result() {
  const [books, setBooks] = useState([])
  const [selectedBook, setSelectedBook] = useState(null)
  const [bookDescription, setBookDescription] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [mood, setMood] = useState(null)

  const genres = [
    'arts',
    'architecture',
    'art instruction',
    'art history',
    'dance',
    'graphic novels',
    'algebra',
    'computerscience',
    'design',
    'fashion',
    'film',
    'graphic design',
    'music',
    'music theory',
    'painting',
    'photography',
    'animals',
    'bears',
    'cats',
    'kittens',
    'dogs',
    'puppies',
    'fiction',
    'fantasy',
    'historical fiction',
    'horror',
    'humor',
    'literature',
    'magic',
    'mystery and detective stories',
    'plays',
    'poetry',
    'romance',
    'science fiction',
    'short stories',
    'thriller',
    'young adult',
    'science & mathematics',
    'biology',
    'chemistry',
    'mathematics',
    'physics',
    'programming',
    'business & finance',
    'management',
    'drama',
    'satire',
    'business success',
    'finance',
    "children's",
    'kids books',
    'stories in rhyme',
    'baby books',
    'bedtime books',
    'picture books',
    'history',
    'ancient civilization',
    'archaeology',
    'anthropology',
    'world war ii',
    'social life and customs',
    'health & wellness',
    'cooking',
    'cookbooks',
    'mental health',
    'exercise',
    'nutrition',
    'self-help',
    'biography',
    'autobiographies',
    'history',
    'politics and government',
    'world war ii',
    'women',
    'kings and rulers',
    'comedy',
    'novel',
    'children',
  ]

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
          jijik: ['magic', 'programming', 'health'],
          takut: ['comedy', 'humor', 'education'],
          senang: ['film', 'humor'],
          netral: ['poetry', 'romance'],
          sedih: ['exercise', 'psychology'],
          terkejut: ['computerscience', 'history'],
        }

        const selectedSubjects = moodSubjects[mood] // Get subjects based on mood
        const seed = new Date().getTime() // Get current timestamp as seed
        const random = Math.floor(Math.random() * seed)
        const selectedSubject =
          selectedSubjects[random % selectedSubjects.length]
        console.log('Subjek yang digunakan adalah ' + selectedSubject)

        const apiUrl = `https://openlibrary.org/subjects/${selectedSubject}.json?has_cover=true&fields=title,author_name,publish_year,subject,subject_key,ratings_average,ratings_sortable,cover_i,key,isbn,number_of_pages_median&limit=5`
        const response = await axios.get(apiUrl)
        // console.log(response.data.docs)
        // const sortedBooks = response.data.works.sort(
        //   (a, b) => b.ratings_sortable - a.ratings_sortable
        // )
        const sortedBooks = response.data.works
        console.log(sortedBooks)
        setBooks(sortedBooks.slice(0, 30))
      } catch (error) {
        console.error('Error fetching data:', error)
      }
      setIsLoading(false)
    }

    fetchData()
  }, [mood])

  // useEffect(() => {
  //   const fetchBookDescription = async () => {
  //     if (selectedBook) {  
  //       try {
  //         const isbn = selectedBook.isbn[0]
  //         const response = await axios.get(
  //           `https://openlibrary.org/api/books?bibkeys=ISBN:${isbn}&jscmd=details&format=json`
  //         )
  //         const bookDetails = response.data[`ISBN:${isbn}`].details
  //         setBookDescription(
  //           bookDetails.description
  //             ? bookDetails.description.value
  //             : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut eros in libero consequat ultrices. Aliquam erat volutpat. Mauris nec sapien nulla. Quisque auctor malesuada risus, vel tempus felis eleifend a. Nullam accumsan, eros vel cursus venenatis, leo odio rutrum felis, et volutpat tortor diam nec nibh. Vivamus vehicula, magna non feugiat tincidunt, risus ligula ullamcorper elit, eu efficitur est dui in velit. In hac habitasse platea dictumst. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Morbi pretium mauris sed odio interdum ultrices. Sed sit amet felis sed ex sodales tempus. Vivamus vel eros in libero sollicitudin rhoncus sit amet vitae turpis. Proin sit amet sapien non .'
  //         )

  //         // Scroll back to the detailed content column
  //         window.scrollTo({
  //           top: document.getElementById('detailed-content').offsetTop,
  //           behavior: 'smooth',
  //         })
  //       } catch (error) {
  //         console.error('Error fetching book description:', error)
  //       }
  //     }
  //   }
  //   fetchBookDescription()
  // }, [selectedBook])

  useEffect(() => {
    const fetchBookDescription = async () => {
      if (selectedBook) {
        try {
          const isbn = selectedBook.isbn[0]
          const response = await axios.get(
            `https://openlibrary.org/${book_number}.json`
          )
          const bookDetails = response.data[`ISBN:${isbn}`].details
          setBookDescription(
            bookDetails.description
              ? bookDetails.description.value
              : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut eros in libero consequat ultrices. Aliquam erat volutpat. Mauris nec sapien nulla. Quisque auctor malesuada risus, vel tempus felis eleifend a. Nullam accumsan, eros vel cursus venenatis, leo odio rutrum felis, et volutpat tortor diam nec nibh. Vivamus vehicula, magna non feugiat tincidunt, risus ligula ullamcorper elit, eu efficitur est dui in velit. In hac habitasse platea dictumst. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Morbi pretium mauris sed odio interdum ultrices. Sed sit amet felis sed ex sodales tempus. Vivamus vel eros in libero sollicitudin rhoncus sit amet vitae turpis. Proin sit amet sapien non .'
          )

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
              BERIKUT INI JUDUL BUKU REKOMENDASI KAMI
            </p>

            <p className="w-2/3 font-inter text-lg text-gray-500 font-semibold text-center px-2 pb-8">
              Kami mendeteksi bahwa anda merasa {mood} sekarang, kami rekomen
              buat baca ini
            </p>

            <div className="flex h-full w-3/4 columns-2 py-10 gap-10">
              <div className="flex-1">
                {/* Scrollable column */}
                {/* {console.log(books)} */}
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
                        {/* {book.authors.slice(0, 3).join(', ')} */}
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
                {/* Detailed content column */}
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
                      {selectedBook.subject
                        .filter((subject) =>
                          genres.includes(subject.toLowerCase())
                        )
                        .join(', ')}
                    </p>
                    {/* <p className="text-gray-600">
                      <span className="font-bold">Rating:</span>{' '}
                      {selectedBook.ratings_average}
                    </p> */}
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
