import React from 'react'
import { useEffect, useState } from 'react';
import { getBookById } from '../../../Service/Staff';

export default function ViewDetailBook({ openModal, handleCloseModal, BookId }) {
    const [dataBook, setDataBook] = useState([]);
    useEffect(() => {
        async function fetchBook() {
            if (BookId) {
                const book = await getBookById(BookId);
                setDataBook([book])
            }
        }
        fetchBook();
    }, [BookId]);

    return (
        <>
            {openModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    {dataBook.map((data) => (
                        <div key={data._id} className="bg-white p-5 rounded-md w-full max-w-lg">
                            <h2 className="text-2xl my-7 text-center font-bold">{data.title}</h2>
                            <div className='grid gap-2 text-center'>
                                <div className='grid justify-center'>
                                    <img src={`${data.img}`} style={{ width: 200, height: 'auto' }} alt="" className='rounded-2xl border-8 border-double border-b-red-500 border-l-yellow-500 border-t-blue-500 border-r-green-500' />
                                </div>
                                <p>Category: {data.category.nameCate}</p>
                                <p>Author: {data.author}</p>
                                <p>Publisher: {data.publisher}</p>
                                <p>Publication date: {data.publicationDate}</p>
                                <p>Language: {data.language}</p>
                                <p>Pagecount: {data.pageCount}</p>
                                <p>Language: {data.language}</p>
                                <p>Createby: {data.createby.lastName}</p>
                            </div>
                            <button className="bg-red-500 w-full text-white px-4 py-2 rounded-md mt-4" onClick={handleCloseModal}>Close</button>

                        </div>
                    ))}
                </div >
            )
            }
        </>
    )
}
