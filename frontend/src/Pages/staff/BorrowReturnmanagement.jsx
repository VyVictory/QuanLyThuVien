import React from 'react'
import { useState, useEffect } from 'react'
import { comfirmRequest, getAllBook, getAllRequest, getAllUser, rejectRequest } from '../../Service/Staff'
export default function BorrowReturnmanagement() {
  const [dataRequest, setDataRequest] = useState([])
  const [dataBook, setDataBook] = useState([])
  const [dataUser, setDataUser] = useState([])


  useEffect(() => {
    const fetchdata = async () => {
      const responseRequest = await getAllRequest()

      const responseBook = await getAllBook()

      const responseUser = await getAllUser()

      const filteredRequests = responseRequest.filter(request =>
        responseUser.some(user => user._id === request.user) &&
        responseBook.some(book => book._id === request.book)
      ).map(request => {
        const user = responseUser.find(user => user._id === request.user);
        const book = responseBook.find(book => book._id === request.book);
        const formattedDate = new Date(request.requestedDate).toLocaleDateString('en-GB');
        return {
          ...request,
          userLastName: user ? user.lastName : 'Unknown User',
          userFirstName: user ? user.firstName : 'Unknown User',
          bookTitle: book ? book.title : 'Unknown Book',
          requestedDate: formattedDate,
        };
      });

      setDataBook(responseBook);
      setDataUser(responseUser);
      setDataRequest(filteredRequests); // Assuming you have a state to set filtered requests

    }
    fetchdata()
  }, [])

  async function handleComfirmRequest(Id) {
    try {
      await comfirmRequest(Id);
      setDataRequest(prevDataRequest =>
        prevDataRequest.map(request =>
          request._id === Id ? { ...request, status: 'approved' } : request
        )
      );
      alert(`approved success`);


    } catch (error) {
      console.error("Failed to confirm request", error);
    }
  }

  async function handleRejectRequest(Id) {
    try {
      await rejectRequest(Id);
      setDataRequest(prevDataRequest =>
        prevDataRequest.map(request =>
          request._id === Id ? { ...request, status: 'rejected' } : request
        )
      );
      alert(`Reject success`)

    } catch (error) {
      console.error("Failed to reject request", error);
    }
  }


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

                <th class="px-4 py-2">user</th>
                <th class="px-4 py-2">book</th>
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
                      <td class="px-4 py-2">{data.userLastName} {data.userFirstName}</td>
                      <td class="px-4 py-2">{data.bookTitle}</td>
                      <td class="px-4 py-2">{data.requestedDate}</td>
                      <td class="px-4 py-2">{data.status}</td>
                      <td class="px-4 py-2 flex justify-center">
                        {(() => {
                          switch (data.status) {
                            case "pending":
                              return (
                                <>
                                  <button onClick={() => handleComfirmRequest(data._id)} className="bg-teal-400 px-3 py-1 rounded-md mr-2 hover:bg-secondary/80">Approved</button>
                                  <button onClick={() => handleRejectRequest(data._id)} className="bg-red-400 text-destructive-foreground px-3 py-1 rounded-md hover:bg-destructive/80">Cancel</button>
                                </>
                              );
                            case "borrowed":
                              return (
                                <button className="bg-green-400 px-3 py-1 rounded-md mr-2 hover:bg-secondary/80">update</button>
                              );
                            case "approved":
                              return (
                                <button className="bg-green-400 px-3 py-1 rounded-md mr-2 hover:bg-secondary/80">update</button>
                              );
                            case "rejected":
                              return (
                                <></>
                              );
                            default:
                              return null;
                          }
                        })()}
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
