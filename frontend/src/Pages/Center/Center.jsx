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
        <div className="flex h-full">

            <div className="pt-12">
                <LeftBar select={chaneSelect} />
            </div>
            <div className="h-full w-full pt-12 overflow-y-auto max-h-screen">
                <Home data={dataName} />
            </div>
        </div>
    );
}

export default Center;