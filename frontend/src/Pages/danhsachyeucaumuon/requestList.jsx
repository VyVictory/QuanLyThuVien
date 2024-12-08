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
            <div className='pb-4'>
                <strong>Danh sách yêu cầu mượn</strong>
                <div class="w-full grow flex justify-end" >
                    <div class="relative w-80">
                        <button
                            class="absolute top-0 left-0 flex items-center h-full px-2" >
                            <div>
                                <svg className="" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                                </svg>
                            </div>
                        </button>
                        <input
                            class="w-full p-1 pl-10 rounded-2xl border border-slate-200 focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                            placeholder="Tìm kiếm"
                        />
                    </div>
                </div>
            </div>
            <table className='w-full'>
                <tr className='text-gray-400 border-b '>
                    <th className='py-2'>STT</th>
                    <th>Poster</th>
                    <th>Tên sách</th>
                    <th>Ngày yêu cầu mượn</th>
                    <th>Trạng thái duyệt</th>
                    <th>Thời gian đến nhận sách</th>
                </tr>
                {rows.map((row, index) => (
                    <>
                        <tr className='text-center'>
                            <td className='py-2'>{index + 1}</td>
                            <td>MariaAnders</td>
                            <td>Germany</td>
                            <td>Alfreds</td>
                            <td>MariaAnders</td>
                            <td>Germany</td>
                        </tr>

                        <tr className='border-b'></tr>
                    </>

                ))}
            </table>
            <div>
                
            </div>
        </div>
    );
}
