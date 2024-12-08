import React from 'react'

export default function AddBook({ openModal, handleCloseModal }) {
    return (
        <>
            {openModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-4 rounded-md w-full max-w-lg">
                        <h2 className="text-xl my-7 text-center">Add Book</h2>
                        <div className='grid gap-2'>
                            <input type="text" className="border p-2 rounded-md w-full" placeholder="Book Name" />
                            <textarea name="" id="" placeholder="Description" className='border p-2 rounded-md w-full'></textarea>
                        </div>
                        <div className='flex gap-2 justify-between mt-5'>
                            <button className="bg-red-500 text-white px-4 py-2 rounded-md mt-4" onClick={handleCloseModal}>Close</button>
                            <button className="bg-sky-500 text-white px-4 py-2 rounded-md mt-4" onClick={handleCloseModal}>Create</button>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}
