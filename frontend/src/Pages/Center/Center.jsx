import LeftBar from "../leftBar/leftBar";
import { useEffect, useState } from "react";
import { useOutletContext} from "react-router-dom";
import { useLocation } from 'react-router-dom';
import Home from "./Home";
import book from "../../Service/book";
const Center = () => {
    const [dataBook, setDataBook] = useState([]);
    const location = useLocation();
    const { dataName } = useOutletContext();
    const query = new URLSearchParams(location.search).get('id') || '';
    const getBookData = async () => {
        if (dataName == 'tatca'|| query) {
            try {
                const rs = await book.getAllBook();
                setDataBook(rs.data);
            } catch (error) {
                console.error("Error fetching book:", error);
            }
        }else{
            try {
                const rs= await book.getAllBookByCategory(dataName);
                setDataBook(rs.data);

            } catch (error) {
                console.error("Error fetching book by category:", error);
            }
        }
    };
    useEffect(() => {
        getBookData();
    }, [dataName]);
    console.log(dataBook)
    console.log(dataName)
    return (
        <Home data={dataBook} />
    );
}

export default Center;