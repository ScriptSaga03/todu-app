import { useContext, useState } from 'react';
import { MdOutlineArrowDropDown, MdOutlineArrowDropUp } from "react-icons/md";
import { ServiceProvider } from '../service/Context';
import Modal from './Modal';

export default function Header() {
    const { openModal, handleModal } = useContext(ServiceProvider);
    const [filter, setFilter] = useState(false);

    const filterCategory = [
        { id: 1, category: 'All' },
        { id: 2, category: 'Pending' },
        { id: 3, category: 'Marked' },
    ];

    return (
        <header className='p-4 w-full shadow-md shadow-indigo-100'>
            <div className='mx-auto max-w-4xl'>
                <div className='grid grid-rows-2 gap-5'>
                    <h1 className='mx-auto text-4xl font-bold text-gray-500 uppercase cursor-pointer'>Todo List</h1>
                    <div className='flex items-center justify-between'>
                        <div className='bg-indigo-400 p-2 px-4 rounded-md shadow-md transition-all active:scale-95 ease-linear duration-300 hover:bg-opacity-75'>
                            <button className='font-semibold text-white' onClick={handleModal}>Add Task</button>
                        </div>
                        <div className='w-1/2'>
                            <input type="search" placeholder='Search your task...' className='bg-gray-100 shadow-sm px-4 p-2 w-full focus:outline-2 outline-indigo-400 rounded-md text-gray-600 font-semibold' />
                        </div>
                        <div className='bg-gray-400 relative w-24 p-2 rounded-lg cursor-pointer transition-all active:scale-95 ease-linear duration-300'
                            onClick={() => setFilter(!filter)}>
                            <div className='flex items-center justify-between font-semibold hover:bg-opacity-75'>
                                <p className='text-white'>Filter</p>
                                {filter ? <MdOutlineArrowDropUp className="text-white text-2xl" /> : <MdOutlineArrowDropDown className="text-white text-2xl" />}
                            </div>
                            {filter && (
                                <ul className="absolute bg-white px-3 py-2 rounded-md shadow-lg top-10 w-32">
                                    {filterCategory.map((item) => (
                                        <li
                                            key={item.id}
                                            className="p-2 hover:bg-gray-200 text-gray-600 font-medium cursor-pointer rounded-md"
                                        >
                                            {item.category}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            {openModal && <Modal />}
        </header>
    );
}