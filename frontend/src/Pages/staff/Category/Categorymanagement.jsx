import React from 'react'
import { getAllCategory } from '../../../Service/Staff';
import { useEffect, useState } from 'react'
import AddCategory from './AddCategory';
import UpdateCategoryForm from './UpdateCategory';

export default function Categorymanagement() {
    const [dataCategory, setDataCategory] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isSelected, setIsSelected] = useState(null);
    const [isModalOpenCreate, setIsModalOpenCreate] = useState(false);
    const [isModalOpenUpdate, setIsModalOpenUpdate] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');


    //Effect
    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const response = await getAllCategory();
                const sortedResponse = response.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                setDataCategory(sortedResponse);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData(); // Call fetch data function
    }, []);

    //create
    const handleOpenModalCreate = () => {
        setIsModalOpenCreate(true);
    };

    const handleCloseModalCreate = () => {
        setIsModalOpenCreate(false);
    };
    //update
    const handleOpenModalUpdate = (id) => {
        setIsSelected(id)
        setIsModalOpenUpdate(true);
    };

    const handleCloseModalUpdate = () => {
        setIsModalOpenUpdate(false);
        setIsSelected(null)
    };

    //search



    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;
    return (
        <div class="w-full my-10">
            <h1 class="text-3xl font-bold text-center mb-8">Category Management</h1>
            <div class="bg-card p-6 rounded-lg shadow-lg bg-white mx-10">
                <div class="flex items-center justify-between mb-4 gap-2">
                    <input type="text"
                        placeholder="Search Category..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        class="w-full px-3 py-2 rounded-md bg-input text-primary placeholder-primary-foreground focus:outline-none focus:ring focus:ring-primary" />
                    <button class="bg-sky-400 text-primary-foreground px-4 py-2 rounded-md hover:bg-sky-500">Search</button>
                    <button className="bg-emerald-500 text-primary-foreground px-4 py-2 rounded-md hover:bg-emerald-400" onClick={handleOpenModalCreate}>Add</button>
                </div>
                <div class="overflow-x-auto">
                    <table class="w-full text-center">
                        <thead>
                            <tr className='border-b-2'>
                                <th class="px-4 py-2">Name</th>
                                <th class="px-4 py-2">Description</th>
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
                                    <tr key={data._id} className='border-b-2'>
                                        <td class="px-4 py-2">{data.nameCate}</td>
                                        <td class="px-4 py-2">{data.decription}</td>

                                        <td class="px-4 py-2">
                                            <button class="bg-teal-400 px-3 py-1 rounded-md mr-2 hover:bg-secondary/80" onClick={() => handleOpenModalUpdate(data._id)}>Edit</button>
                                            <button class="bg-red-400 text-destructive-foreground px-3 py-1 rounded-md hover:bg-destructive/80">Delete</button>
                                        </td>
                                    </tr>
                                )))}
                        </tbody>
                    </table>
                </div>
            </div>
            <AddCategory openModal={isModalOpenCreate} handleCloseModal={handleCloseModalCreate} />
            <UpdateCategoryForm openModal={isModalOpenUpdate} handleCloseModal={handleCloseModalUpdate} CategoryId={isSelected} />
        </div>
    )
}
