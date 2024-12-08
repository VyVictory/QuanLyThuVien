import React from 'react'
import { getAllCategory } from '../../../Service/Staff';
import { useEffect, useState } from 'react'
import AddCategory from './AddCategory';

export default function Categorymanagement() {
    const [dataCategory, setDataCategory] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    //Effect
    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const response = await getAllCategory();
                setDataCategory(response);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData(); // Call fetch data function
    }, []);

    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;
    return (
        <div class="w-full my-10">
            <h1 class="text-3xl font-bold text-center mb-8">Category Management</h1>
            <div class="bg-card p-6 rounded-lg shadow-lg bg-white mx-10">
                <div class="flex items-center justify-between mb-4 gap-2">
                    <input type="text" placeholder="Search Borrow/Return..." class="w-full px-3 py-2 rounded-md bg-input text-primary placeholder-primary-foreground focus:outline-none focus:ring focus:ring-primary" />
                    <button class="bg-sky-400 text-primary-foreground px-4 py-2 rounded-md hover:bg-sky-500">Search</button>
                    <button className="bg-emerald-500 text-primary-foreground px-4 py-2 rounded-md hover:bg-emerald-400" onClick={handleOpenModal}>Add</button>
                </div>
                <div class="overflow-x-auto">
                    <table class="w-full text-center">
                        <thead>
                            <tr className='bg-slate-200 border-2 border-double border-rose-950'>
                                <th class="px-4 py-2">Name</th>
                                <th class="px-4 py-2">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {dataCategory.length === 0 ? (
                                <tr>
                                    <td colSpan="2" class="px-4 py-2 text-center">NO DATA</td>
                                </tr>
                            ) : (
                                dataCategory.map((data) => (
                                    <tr key={data._id} className='border-2 border-dashed border-sky-400'>
                                        <td class="px-4 py-2">{data.nameCate}</td>
                                        <td class="px-4 py-2">
                                            <button class="bg-teal-400 px-3 py-1 rounded-md mr-2 hover:bg-secondary/80">Edit</button>
                                            <button class="bg-red-400 text-destructive-foreground px-3 py-1 rounded-md hover:bg-destructive/80">Delete</button>
                                        </td>
                                    </tr>
                                )))}
                        </tbody>
                    </table>
                </div>
            </div>
            <AddCategory openModal={isModalOpen} handleCloseModal={handleCloseModal} />
        </div>
    )
}
