import LeftBar from "../leftBar/leftBar";
import { useState } from "react";
import Home from "./Home";

const Center = () => {
    const [dataName, setDataName] = useState('tatca');
    function chaneSelect(selectData) {
        setDataName(selectData)
    }
    console.log(dataName)
    return (
        <Home data={dataName} />
    );
}

export default Center;