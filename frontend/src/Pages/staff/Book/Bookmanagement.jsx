import React from 'react'
import { useState, useEffect } from 'react'
import { getAllBook } from '../../../Service/Staff';
import AddBook from './AddBook';
export default function Bookmanagement() {
  const [dataBook, setDataBook] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const response = await getAllBook();
        setDataBook(response)
      }
      catch (error) {
        setError(error.message);
      }
      finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [])

  const [isModalOpen, setIsModalOpen] = useState(false);

  function HandleOpenModal() {
    setIsModalOpen(true)
  }
  function HandleCloseModal() {
    setIsModalOpen(false)
  }

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  return (
    <div class="w-full my-10">

      <h1 class="text-3xl font-bold text-center mb-8">Book Management</h1>
      <div class="bg-card p-6 rounded-lg shadow-lg bg-white mx-10">
        <div class="flex items-center justify-between mb-4 gap-2">
          <input type="text" placeholder="Search books..." class="w-full px-3 py-2 rounded-md bg-input text-primary placeholder-primary-foreground focus:outline-none focus:ring focus:ring-primary" />
          <button class="bg-sky-400 text-primary-foreground px-4 py-2 rounded-md hover:bg-sky-500">Search</button>
          <button class="bg-emerald-500 text-primary-foreground px-4 py-2 rounded-md hover:bg-emerald-400" onClick={HandleOpenModal}>Add</button>
        </div>
        <div class="overflow-x-auto">
          <table class="w-full text-center">
            <thead>
              <tr className='bg-slate-200 border-2 border-double border-rose-950'>
                <th class="px-4 py-2">Image</th>
                <th class="px-4 py-2">Name</th>
                <th class="px-4 py-2">Author</th>
                <th class="px-4 py-2">Language</th>
                <th class="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {dataBook.length === 0 ?
                (
                  <tr>
                    <td colSpan="2" class="px-4 py-2 text-center">NO DATA</td>
                  </tr>
                ) : (
                  dataBook.map((data) => (
                    <tr key={data._id} className='border-2 border-dashed border-sky-400'>
                      <td class="px-4 py-2">
                        <img src={`${data.img}`} alt="" style={{ width: '80px', height: '80px' }} className='border-2 border-black' />
                      </td>
                      <td class="px-4 py-2">{data.title}</td>
                      <td class="px-4 py-2">{data.author}</td>
                      <td class="px-4 py-2">{data.language}</td>

                      <td class="px-4 py-2">
                        <button class="bg-teal-400 px-3 py-1 rounded-md mr-2 hover:bg-secondary/80">Edit</button>
                        <button class="bg-red-400 text-destructive-foreground px-3 py-1 rounded-md hover:bg-destructive/80">Delete</button>
                      </td>
                    </tr>
                  ))
                )
              }
            </tbody>
          </table>
        </div>
      </div>
      <AddBook openModal={isModalOpen} handleCloseModal={HandleCloseModal} />
    </div>
  )
}
