import React, { useState, useEffect } from 'react'
import { getCategoryById, updateCategory } from '../../../Service/Staff';

export default function UpdateCategoryForm({ openModal, handleCloseModal, CategoryId }) {
    const [dataCategory, setDataCategory] = useState({
        nameCate: "",
        decription: ""
    })
    useEffect(() => {
        async function fetchCategory() {
            if (CategoryId) {
                const category = await getCategoryById(CategoryId);
                setDataCategory({
                    nameCate: category.nameCate,
                    decription: category.decription
                });
            }
        }
        fetchCategory();
    }, [CategoryId]);

    async function handleSubmit() {
        try {
            await updateCategory(CategoryId, dataCategory);
            handleCloseModal();
            window.location.reload()
        } catch (error) {
            console.error("Failed to update category:", error);
        }
    }
    return (
        <>
            {openModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-4 rounded-md">

                        <h2 className="text-xl my-7 text-center">Update Category {CategoryId}</h2>
                        <div className='grid gap-2'>
                            <input type="text"
                                className="border p-2 rounded-md w-full"
                                placeholder="Category Name"
                                value={dataCategory.nameCate}
                                onChange={(e) => setDataCategory({ ...dataCategory, nameCate: e.target.value })}

                            />
                            <textarea
                                rows="5"
                                cols="30"
                                className='border p-2 rounded-md w-full'
                                value={dataCategory.decription}
                                onChange={(e) => setDataCategory({ ...dataCategory, decription: e.target.value })}
                            >

                            </textarea>
                        </div>
                        <div className='flex gap-2 justify-between mt-5'>
                            <button className="bg-red-500 text-white px-4 py-2 rounded-md mt-4"
                                onClick={handleCloseModal}>Close</button>
                            <button className="bg-sky-500 text-white px-4 py-2 rounded-md mt-4"
                                onClick={handleSubmit}>Update</button>
                        </div>
                    </div>
                </div >
            )
            }
        </>
    )
}
