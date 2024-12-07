import imglogin from '../../img/login/bg_login.jpg';

const cards = Array.from({ length: 12 });

const Home = ({ data }) => {
    console.log({ data });
    return (
        <div>
            <div className="p-2  ml-1 text-white " >
                {/* Hiển thị 8 thẻ card đầu tiên */}
                <div className='justify-center flex flex-wrap py-2 px-8 gap-x-10'>
                    {cards.slice(0, 12).map((_, index) => (
                        <div key={index} className="card w-56 bg-[#393E46] m-1">
                            <img src={imglogin} className="h-64" alt="Avata" style={{ width: '100%' }} />
                            <div className="container p-3">
                                <h4><b>John Doe</b></h4>
                                <p>Architect & Engineer</p>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </div>

    );
};

export default Home;
