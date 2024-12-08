import React, { useState } from 'react'
import { createCategory } from '../../../Service/Staff';

export default function AddCategory({ openModal, handleCloseModal }) {
    const [dataCategory, setDataCategory] = useState({
        categoryName: '',
        decription: ''
    });
    const handleSumbit = async () => {

        const categoryData = {
            nameCate: dataCategory.categoryName,
            decription: dataCategory.decription
        };
        await createCategory(categoryData);
        handleCloseModal();
    }
    return (
        <>
            {openModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-4 rounded-md">
                        <h2 className="text-xl my-7">Add Category</h2>
                        <div className='grid gap-2'>
                            <input type="text"
                                className="border p-2 rounded-md w-full"
                                placeholder="Category Name"
                                value={dataCategory.categoryName}
                                onChange={(e) => setDataCategory({ ...dataCategory, categoryName: e.target.value })}
                            />
                            <textarea
                                placeholder="Description"
                                className='border p-2 rounded-md w-full'
                                value={dataCategory.decription}
                                onChange={(e) => setDataCategory({ ...dataCategory, decription: e.target.value })}
                            >

                            </textarea>
                        </div>
                        <div className='flex gap-2 justify-between mt-5'>
                            <button className="bg-red-500 text-white px-4 py-2 rounded-md mt-4" onClick={handleCloseModal}>Close</button>
                            <button className="bg-sky-500 text-white px-4 py-2 rounded-md mt-4" onClick={handleSumbit}>Create</button>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}
