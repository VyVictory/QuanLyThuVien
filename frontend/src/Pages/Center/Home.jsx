import notimg from '../../img/notimg.jpg';
import { useState , useEffect} from 'react';

const Home = ({ data = [] }) => {
    const [currentPage, setCurrentPage] = useState(1); // Trạng thái của số trang hiện tại
    const cardsPerPage = 8;
    const indexOfLastCard = currentPage * cardsPerPage;
    const indexOfFirstCard = indexOfLastCard - cardsPerPage;

    const currentCards = data.length > 0 ? data.slice(indexOfFirstCard, indexOfLastCard) : [];

    // Chuyển trang 
    const nextPage = () => {
        if (currentPage < Math.ceil(data.length / cardsPerPage)) {
            setCurrentPage(currentPage + 1);
        }
    };

    const prevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };
    useEffect(() => {
        const rePageThis = () => {
            setCurrentPage(1)
        }
        rePageThis();
    }, [data]);
    return (
        <div className='h-screen flex flex-col'>
            <div className=" text-white pt-12 overflow-y-auto flex-1 ml-20">
                {/* Hiển thị các thẻ card cho trang hiện tại */}
                <div className="flex flex-wrap justify-start py-0 px-8 gap-x-10">
                    {currentCards.length > 0 ? (
                        currentCards.map((_, index) => (
                            <a
                                key={index}
                                className="card w-52 bg-[#393E46] m-1"
                                href={'/book/detail/'+_._id}
                            >
                                <img src={_.img[0]?_.img[0]:notimg} className="h-56 border" alt="Avata" style={{ width: '100%' }} />
                                <div className="container p-3">
                                    <h4 className="truncate-title text-ellipsis overflow-hidden whitespace-nowrap">
                                        <b>{_.title}</b>
                                    </h4>
                                    <p className='flex row'>Tác giả:<p className='uppercase'>{_.author}</p></p>
                                </div>
                            </a>
                        ))
                    ) : (
                        <p>No book by category.</p> // Hiển thị nếu không có thẻ nào
                    )}

                </div>


            </div>
            <div className='w-full flex justify-center'>
                <div className=" pb-2 flex fixed bottom-0">
                    <button
                        className="px-4 py-2 rounded bg-slate-400"
                        onClick={prevPage}
                        disabled={currentPage === 1}
                    >
                        Trở về
                    </button>
                    <div className="px-4 py-2">{`trang: ${currentPage}`}</div>
                    <button
                        className="px-4 py-2 rounded bg-slate-400"
                        onClick={nextPage}
                        disabled={currentPage === Math.ceil(data.length / cardsPerPage)}
                    >
                        Trang kế
                    </button>
                </div>
            </div>

        </div>
    );
};

export default Home;
