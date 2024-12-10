import LeftBar from "../leftBar/leftBar";
import { useEffect, useState } from "react";
import Home from "./Home";
import book from "../../Service/book";
const Center = () => {
    const [dataName, setDataName] = useState('tatca');
    const [dataBook, setDataBook] = useState([]);
    function chaneSelect(selectData) {
        setDataName(selectData)
    }
    const getBookData = async () => {
        try {
            const rs = await book.getAllBook();
            setDataBook(rs.data); 
        } catch (error) {
            console.error("Error fetching book:", error);
        }
    };
    useEffect(() => {
            getBookData();
    }, [dataName]);
    console.log(dataBook)
    return (
        <Home data={dataBook} />
    );
}

export default Center;