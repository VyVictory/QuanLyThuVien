import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
}

const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
];

export default function BasicTable() {
    return (
        <div className="pt-12 px-5">
            <strong>Danh sách yêu cầu mượn</strong>
            <table className='w-full'>
                <tr className='text-gray-400 border-b '>
                    <th className='py-2'>STT</th>
                    <th>Poster</th>
                    <th>Tên sách</th>
                    <th>Ngày yêu cầu mượn</th>
                    <th>Trạng thái duyệt</th>
                    <th>Thời gian đến nhận sách</th>
                </tr>
                <tr className='text-center'>
                    <td className='py-2'>Alfreds</td>
                    <td>MariaAnders</td>
                    <td>Germany</td>
                    <td>Alfreds</td>
                    <td>MariaAnders</td>
                    <td>Germany</td>
                </tr>
                <tr className='border-b'></tr>
            </table>
        </div>
    );
}
