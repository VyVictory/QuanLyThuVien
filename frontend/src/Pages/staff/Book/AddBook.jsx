import React from 'react'
import { useEffect, useState } from 'react'
import { createBook, getAllCategory } from '../../../Service/Staff'
export default function AddBook({ openModal, handleCloseModal }) {
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');

    const [dataBook, setDataBook] = useState({
        title: '',
        Category: selectedCategory,
        files: null,
        author: '',
        publisher: '',
        publicationDate: '',
        language: '',
        pageCount: '',
    })

    useEffect(() => {
        const fetchdata = async () => {
            var response = await getAllCategory()
            setCategories(response)
        }
        fetchdata()
    }, [])

    const handleSubmit = async (e) => {
        const formData = new FormData();
        formData.append("title", dataBook.title);
        formData.append("files", dataBook.files);
        formData.append('Category', selectedCategory);
        formData.append("author", dataBook.author);
        formData.append("publisher", dataBook.publisher);
        formData.append("publicationDate", dataBook.publicationDate);
        formData.append("language", dataBook.language);
        formData.append("pageCount", dataBook.pageCount);
        await createBook(formData);
        // handleCloseModal();

    }
    console.log(selectedCategory)

    return (
        <>
            {openModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <form onSubmit={handleSubmit} encType='multipart/form-data' className="bg-white p-4 rounded-md w-full max-w-lg">
                        <h2 className="text-xl my-7 text-center">Add Book</h2>
                        <div className='grid gap-2'>
                            <input type="text" className="border p-2 rounded-md w-full"
                                placeholder="Book Name"
                                value={dataBook.title}
                                onChange={(e) => setDataBook({ ...dataBook, title: e.target.value })}
                            />
                            <input type="file" className='border-2 rounded-md p-2'
                                onChange={(e) => setDataBook({ ...dataBook, files: e.target.files[0] })}
                            />{selectedCategory}
                            <select
                                className="border p-2 rounded-md w-full"
                                value={selectedCategory}
                                onChange={(e) => setSelectedCategory(e.target.value)}
                            >

                                <option selected="true" disabled="disabled" value={""}>Choose Category</option>
                                {categories.map((category) => (
                                    <option key={category._id} value={category._id}>
                                        {category.nameCate}
                                    </option>
                                ))}
                            </select>
                            <input type="text" className="border p-2 rounded-md w-full"
                                placeholder="Author"
                                value={dataBook.author}
                                onChange={(e) => setDataBook({ ...dataBook, author: e.target.value })}
                            />
                            <input type="text" className="border p-2 rounded-md w-full"
                                placeholder="Publisher"
                                value={dataBook.publisher}
                                onChange={(e) => setDataBook({ ...dataBook, publisher: e.target.value })}
                            />
                            <input type="date" className="border p-2 rounded-md w-full"
                                placeholder="Publication Date"
                                value={dataBook.publicationDate}
                                onChange={(e) => setDataBook({ ...dataBook, publicationDate: e.target.value })}
                            />
                            <input type="text" className="border p-2 rounded-md w-full"
                                placeholder="Language"
                                value={dataBook.language}
                                onChange={(e) => setDataBook({ ...dataBook, language: e.target.value })}
                            />
                            <input type="number" className="border p-2 rounded-md w-full"
                                placeholder="Page Count"
                                value={dataBook.pageCount}
                                onChange={(e) => setDataBook({ ...dataBook, pageCount: e.target.value })}
                            />
                        </div>
                        <div className='flex gap-2 justify-between mt-5'>
                            <button type='button' className="bg-red-500 text-white px-4 py-2 rounded-md mt-4" onClick={handleCloseModal}>Close</button>
                            <button type='submit' className="bg-sky-500 text-white px-4 py-2 rounded-md mt-4" >Create</button>
                        </div>
                    </form>
                </div>
            )}
        </>
    )
}
