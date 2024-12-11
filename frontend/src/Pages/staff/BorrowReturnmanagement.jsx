import React from 'react'
import { useState, useEffect } from 'react'
import { getAllRequest } from '../../Service/Staff'
export default function BorrowReturnmanagement() {
  const [dataRequest, setDataRequest] = useState([])

  useEffect(() => {
    const fetchdata = async () => {
      const response = await getAllRequest()
      setDataRequest(response)
    }
    fetchdata()
  }, [])

  return (
    <div class="w-full my-10">
      <h1 class="text-3xl font-bold text-center mb-8">Borrow/Return Management</h1>
      <div class="bg-card p-6 rounded-lg shadow-lg bg-white mx-10">
        <div class="flex items-center justify-between mb-4 gap-2">
          <input type="text" placeholder="Search Borrow/Return..." class="w-full px-3 py-2 rounded-md bg-input text-primary placeholder-primary-foreground focus:outline-none focus:ring focus:ring-primary" />
          <button class="bg-sky-400 text-primary-foreground px-4 py-2 rounded-md hover:bg-sky-500">Search</button>
        </div>
        <div class="overflow-x-auto">
          <table class="w-full text-center">
            <thead>
              <tr>
                <th class="px-4 py-2">ID</th>
                <th class="px-4 py-2">ID user</th>
                <th class="px-4 py-2">ID book</th>
                <th class="px-4 py-2">requested Date</th>
                <th class="px-4 py-2">Status</th>
                <th class="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {dataRequest.length === 0 ?
                (
                  <tr>
                    <td colSpan="2" class="px-4 py-2 text-center">NO DATA</td>
                  </tr>
                ) : (
                  dataRequest.map((data) => (
                    <tr key={data._id} className='border-b-2'>
                      <td class="px-4 py-2">{data._id}</td>
                      <td class="px-4 py-2">{data.user}</td>
                      <td class="px-4 py-2">{data.book}</td>
                      <td class="px-4 py-2">{data.requestedDate}</td>
                      <td class="px-4 py-2">{data.status}</td>
                      <td class="px-4 py-2 flex">

                        <button class="bg-teal-400 px-3 py-1 rounded-md mr-2 hover:bg-secondary/80">Comfirm</button>
                        <button class="bg-red-400 text-destructive-foreground px-3 py-1 rounded-md hover:bg-destructive/80">Cancel</button>
                      </td>
                    </tr>
                  ))
                )
              }
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
