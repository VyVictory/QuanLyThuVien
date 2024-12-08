import React from 'react'
import { useState, useEffect } from 'react'
import { getAllUser } from '../../../Service/Staff'

export default function Usermanagement() {
  const [dataUser, setDataUser] = useState([])
  const [loading, setLoading] = useState()
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchdata = async () => {
      try {
        setLoading(true)
        const response = await getAllUser();
        setDataUser(response)
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false)
      }
    }
    fetchdata();
  }, [])

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div class="w-full my-10">
      <h1 class="text-3xl font-bold text-center mb-8">User Management</h1>
      <div class="bg-card p-6 rounded-lg shadow-lg bg-white mx-10">
        <div class="flex items-center justify-between mb-4 gap-2">
          <input type="text" placeholder="Search users..." class="w-full px-3 py-2 rounded-md bg-input text-primary placeholder-primary-foreground focus:outline-none focus:ring focus:ring-primary" />
          <button class="bg-sky-400 text-primary-foreground px-4 py-2 rounded-md hover:bg-sky-500">Search</button>
        </div>
        <div class="overflow-x-auto">
          <table class="w-full text-center">
            <thead>
              <tr>
                <th class="px-4 py-2">Name</th>
                <th class="px-4 py-2">Address</th>
                <th class="px-4 py-2">Gender</th>
                <th class="px-4 py-2">Birhday</th>
              </tr>
            </thead>
            <tbody>
              {dataUser.map((data) => (
                <tr key={data._id}>
                  <td class="px-4 py-2"> {data.firstName} {data.lastName}</td>
                  <td class="px-4 py-2">{data.address}</td>
                  <td class="px-4 py-2">{data.gender}</td>
                  <td class="px-4 py-2">{data.birthday}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
