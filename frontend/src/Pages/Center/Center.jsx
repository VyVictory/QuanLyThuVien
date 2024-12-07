import LeftBar from "../leftBar/leftBar";
import { useState } from "react";

const Center = () => {
    const [dataName, setDataName] = useState('tatca');
    function chaneSelect(selectData) {
        setDataName(selectData)
    }
    console.log(dataName)
    return (
        <div className="flex row h-full">
            <LeftBar select={chaneSelect} />

            <div>abc</div>
        </div>
    );
}

export default Center;