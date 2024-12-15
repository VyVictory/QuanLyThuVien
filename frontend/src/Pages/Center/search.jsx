import notimg from '../../img/notimg.jpg';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom'; // Import useLocation
import book from '../../Service/book';

const Search = () => {
    const [data, setDataBook] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const location = useLocation(); // Get the current location (URL)

    // Extract the search term (id) from the URL
    const query = new URLSearchParams(location.search).get('id') || '';
    console.log(query)
    const getBookData = async () => {
        try {
            const rs = await book.getAllBook();
            setDataBook(rs.data);
        } catch (error) {
            console.error("Error fetching book:", error);
        }
    };

    // Filter books based on the search term in the URL
    console.log(data)
    useEffect(() => {
        if (query) {
            const lowerCaseQuery = query.toLowerCase();
            
            const filtered = data.filter(book =>
                book.title.toLowerCase().includes(query)
            );
            setFilteredData(filtered);
        } else {
            setFilteredData(data); // No filter if query is empty
        }
    }, [query, data]);

    useEffect(() => {
        getBookData();
    }, []);

    const [currentPage, setCurrentPage] = useState(1); // Current page state
    const cardsPerPage = 8;
    const indexOfLastCard = currentPage * cardsPerPage;
    const indexOfFirstCard = indexOfLastCard - cardsPerPage;

    const currentCards = filteredData.length > 0 ? filteredData.slice(indexOfFirstCard, indexOfLastCard) : [];

    // Pagination functions
    const nextPage = () => {
        if (currentPage < Math.ceil(filteredData.length / cardsPerPage)) {
            setCurrentPage(currentPage + 1);
        }
    };

    const prevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    useEffect(() => {
        setCurrentPage(1); // Reset to the first page when data changes
    }, [filteredData]);

    return (
        <div className="h-screen flex flex-col">
            <div className="text-white pt-12 overflow-y-auto flex-1 ml-20">
                {/* Display filtered books */}
                <div className="flex flex-wrap justify-start py-0 px-8 gap-x-10">
                    {currentCards.length > 0 ? (
                        currentCards.map((_, index) => (
                            <a
                                key={index}
                                className="card w-52 bg-[#393E46] m-1"
                                href={'/book/detail/' + _._id}
                            >
                                <img src={_.img[0] ? _.img[0] : notimg} className="h-56 border" alt="Avata" style={{ width: '100%' }} />
                                <div className="container p-3">
                                    <h4 className="truncate-title text-ellipsis overflow-hidden whitespace-nowrap">
                                        <b>{_.title}</b>
                                    </h4>
                                    <p className="flex row">
                                        Tác giả: <span className="uppercase">{_.author}</span>
                                    </p>
                                </div>
                            </a>
                        ))
                    ) : (
                        <p>No books found matching the search criteria.</p> // Display when no books match
                    )}
                </div>
            </div>
            <div className="w-full flex justify-center">
                <div className="pb-2 flex fixed bottom-0">
                    <button
                        className="px-4 py-2 rounded bg-slate-400"
                        onClick={prevPage}
                        disabled={currentPage === 1}
                    >
                        Trở về
                    </button>
                    <div className="px-4 py-2">{`Trang: ${currentPage}`}</div>
                    <button
                        className="px-4 py-2 rounded bg-slate-400"
                        onClick={nextPage}
                        disabled={currentPage === Math.ceil(filteredData.length / cardsPerPage)}
                    >
                        Trang kế
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Search;
