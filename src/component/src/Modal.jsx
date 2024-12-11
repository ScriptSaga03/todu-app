import { useContext } from 'react';
import { ServiceProvider } from '../service/Context';
import { MdOutlineArrowDropDown, MdOutlineArrowDropUp } from "react-icons/md";
import { IoMdClose } from "react-icons/io";
import { UserValidation } from '../service/validation/UserValidation';

export default function Modal() {
    const { errors, handleSubmit, } = useContext(UserValidation);

    const { handleModal, user, handleInputChange, selectedMaritalStatus, handleStatusChange, dropDown, setDropDown } = useContext(ServiceProvider);
    return (
        <div className='relative z-10' aria-labelledby='modal-title' role='modal' aria-modal="true">
            {/* Overlay */}
            <div className="fixed inset-0 bg-gray-500/75 transition-opacity" aria-hidden="true" onClick={handleModal}></div>

            {/* Modal Content */}
            <div className='fixed inset-0 z-10 w-screen flex justify-center items-center p-4'>
                <div
                    className='bg-white relative h-auto md:p-6 sm:p-4 p-2 rounded-lg shadow-lg max-w-5xl w-full overflow-y-auto scroll-bar max-h-[90vh]'
                    onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the modal
                >
                    {/* Close button */}

                    <div className='absolute sm:-right-0 right-0 -top-0' onClick={handleModal}>
                        <button>
                            <IoMdClose className='text-xl text-gray-500' />
                        </button>

                    </div>

                    {/* Registration Form */}
                    <form action="#" onSubmit={handleSubmit} className='w-full'>
                        {/* title */}
                        <h1 className='title uppercase md:ms-6 ms-0 mb-2 text-center md:text-2xl text-md text-indigo-700 font-bold relative group cursor-pointer'>
                            New Employee Registration Form
                            {/* <span className="block w-0 group-hover:w-32 rounded transition-all duration-500 h-[2px] bg-indigo-600 absolute left-0 bottom-[-2px] group-hover:md:w-56"></span> */}
                        </h1>
                        <p className='font-semibold text-xs text-gray-600 text-center'>Please fill out the form to complete your registration. Thank you!</p>

                        {/* Parent Input fields Div  */}
                        <div className='w-full mt-5 grid'>
                            <h2 className='text-lg font-semibold text-gray-600 text-center'>Personal Information</h2>
                            <span className='block w-full h-[2px] bg-gray-300 mb-2'></span>

                            {/* Personal Information Container */}
                            <div className='mx-4'>

                                {/* Full Name */}
                                <p className='font-semibold text-sm text-gray-600 '>Full Name<span className='text-red-600'>*</span></p>
                                {/* Name Inputs  */}
                                <div className='grid sm:grid-cols-3 grid-cols-1 gap-5 mt-2 relative'>
                                    {/* first Name */}

                                    <div className="flex flex-col">
                                        <input type="text" placeholder='First Name' id='firstName' name='firstName' value={user.firstName} onChange={handleInputChange} className='text-sm bg-gray-200 sm:p-3 p-2 rounded-md outline-none cursor-pointer text-gray-600 font-semibold px-4 shadow-sm  group-focus:outline-2 focus:outline-indigo-600' />
                                        {errors.firstName && <span className='text-xs  text-red-600 w-full'>*{errors.firstName}*</span>}
                                    </div>
                                    {/* Middle Name */}
                                    <div className="flex flex-col">
                                        <input type="text" placeholder='Middle Name' id='midName' name='midName' value={user.midName} onChange={handleInputChange} className='text-sm bg-gray-200 sm:p-3 p-2 rounded-md outline-none cursor-pointer text-gray-600 font-semibold px-4 shadow-sm  group-focus:outline-2 focus:outline-indigo-600' />
                                        {errors.midName && <span className="text-red-500 text-xs">*{errors.midName}*</span>}
                                    </div>
                                    {/* Last Name */}
                                    <div className="flex flex-col">
                                        <input type="text" placeholder='Last Name' id='lastName' name='lastName' value={user.lastName} onChange={handleInputChange} className='text-sm bg-gray-200 sm:p-3 p-2 rounded-md outline-none cursor-pointer text-gray-600 font-semibold px-4 shadow-sm  group-focus:outline-2 focus:outline-indigo-600' />
                                        {errors.lastName && <span className="text-red-500 text-xs">*{errors.midName}*</span>}
                                    </div>
                                </div>

                                {/* Second Container of Personal Info. of DOB and Marital status */}
                                <div className='mt-3 grid sm:grid-cols-2 gap-5'>
                                    {/* Marital Status */}
                                    <div className='flex flex-col gap-1 relative'>
                                        {/* Marital Status title */}
                                        <p className='font-semibold text-sm text-gray-600 '>Marital Status<span className='text-red-600'>*</span></p>
                                        {/* DropDown of Marital Status container */}
                                        <div className='text-sm bg-gray-200 sm:p-3 p-2 cursor-pointer rounded-md outline-none text-gray-600 font-semibold px-4 shadow-sm  group-focus:outline-2 focus:outline-indigo-600 flex items-center justify-between'
                                            onClick={() => setDropDown(!dropDown)}
                                        >
                                            {selectedMaritalStatus}
                                            {
                                                dropDown ? (
                                                    < MdOutlineArrowDropUp className='text-2xl' />
                                                )
                                                    :
                                                    (
                                                        <MdOutlineArrowDropDown className='text-2xl' />
                                                    )
                                            }

                                        </div>
                                        {/* Inside the DropDown */}
                                        {
                                            dropDown && (
                                                <div className='absolute bg-white top-14 w-full shadow-lg shadow-gray-600 p-2 rounded-md'>
                                                    <ul className='list-none'>
                                                        {['Married', 'Single'].map((status) => (
                                                            <li
                                                                key={status}
                                                                className='text-gray-600 font-semibold border-b-2 m-4 cursor-pointer hover:text-gray-400'
                                                                onClick={() => handleStatusChange(status)}
                                                            >
                                                                {status}
                                                            </li>
                                                        ))}

                                                    </ul>
                                                </div>
                                            )
                                        }
                                        {errors.selectedMaritalStatus && (
                                            <span className="text-xs text-red-600 w-full">
                                                *{errors.selectedMaritalStatus}*
                                            </span>
                                        )}
                                    </div>

                                    {/* Date Of Birth */}
                                    <div className='flex flex-col gap-1'>
                                        <label htmlFor="dob" className='font-semibold text-sm text-gray-600 '>DOB<span className='text-red-600'>*</span></label>
                                        <input type="date" id='dob' name='dob' value={user.dob} onChange={handleInputChange} placeholder='Middle Name' className='text-sm bg-gray-200 sm:p-3 p-2 rounded-md outline-none text-gray-600 font-semibold px-4 shadow-sm  group-focus:outline-2 cursor-pointer focus:outline-indigo-600' />
                                        {errors.dob && <span className="text-red-500 text-xs">*{errors.dob}*</span>}
                                    </div>
                                </div>
                            </div>


                            {/* Contact Info */}
                            <div className='mt-5'>
                                <h2 className='text-lg font-semibold text-gray-600 text-center'>Contact Information</h2>
                                <span className='block w-full h-[2px] bg-gray-300 mb-2'></span>
                                <div className='grid sm:grid-cols-2 gap-5 mx-4'>
                                    <div className='flex flex-col gap-1'>
                                        <label htmlFor="userGmail" className='font-semibold text-sm text-gray-600 '>E-mail<span className='text-red-600'>*</span></label>
                                        <input type="email" id='userGmail' placeholder='user E-mail' name='userGmail' value={user.userGmail} onChange={handleInputChange} className='text-sm bg-gray-200 sm:p-3 p-2 rounded-md outline-none cursor-pointer text-gray-600 font-semibold px-4 shadow-sm  group-focus:outline-2 focus:outline-indigo-600' />
                                        {errors.userGmail && <span className="text-red-500 text-xs">*{errors.userGmail}*</span>}
                                    </div>
                                    <div className='flex flex-col gap-1'>
                                        <label htmlFor="userNumber" className='font-semibold text-sm text-gray-600 '>Mobile Number<span className='text-red-600'>*</span></label>
                                        <input type="tel" autoComplete='userNumber' pattern="[0-9]{10}" id='userNumber' placeholder='User Mobile Number' name='userNumber' value={user.userNumber} onChange={handleInputChange} className='text-sm bg-gray-200 sm:p-3 p-2 rounded-md outline-none cursor-pointer text-gray-600 font-semibold px-4 shadow-sm  group-focus:outline-2 focus:outline-indigo-600' />
                                        {errors.userNumber && <span className="text-red-500 text-xs">*{errors.userNumber}*</span>}
                                    </div>

                                </div>
                            </div>

                            {/* Employment Information */}
                            <div className='mt-5'>
                                <h2 className='text-lg font-semibold text-gray-600 text-center'>Employment Information</h2>
                                <span className='block w-full h-[2px] bg-gray-300 mb-2'></span>
                                <div className='grid sm:grid-cols-2 grid-col-1 gap-5 mx-4'>
                                    <div className='flex flex-col gap-1'>
                                        <label htmlFor="position" className='font-semibold text-sm text-gray-600'>Position<span className='text-red-600'>*</span></label>
                                        <input type="text" id='position' name='position' value={user.position} onChange={handleInputChange} placeholder='Job Position' className='text-sm bg-gray-200 sm:p-3 p-2 rounded-md outline-none cursor-pointer text-gray-600 font-semibold px-4 shadow-sm group-focus:outline-2 focus:outline-indigo-600' />
                                        {errors.position && <span className="text-red-500 text-xs">*{errors.position}*</span>}
                                    </div>
                                    <div className='flex flex-col gap-1'>
                                        <label htmlFor="department" className='font-semibold text-sm text-gray-600'>Department<span className='text-red-600'>*</span></label>
                                        <input type="text" id='department' name='department' value={user.department} onChange={handleInputChange} placeholder='Department' className='text-sm bg-gray-200 sm:p-3 p-2 rounded-md outline-none cursor-pointer text-gray-600 font-semibold px-4 shadow-sm group-focus:outline-2 focus:outline-indigo-600' />
                                        {errors.department && <span className="text-red-500 text-xs">*{errors.department}*</span>}
                                    </div>
                                    <div className='flex flex-col gap-1'>
                                        <label htmlFor="startDate" className='font-semibold text-sm text-gray-600'>Start Date<span className='text-red-600'>*</span></label>
                                        <input type="date" id='startDate' name='startDate' value={user.startDate} onChange={handleInputChange} className='text-sm bg-gray-200 sm:p-3 p-2 rounded-md outline-none cursor-pointer text-gray-600 font-semibold px-4 shadow-sm group-focus:outline-2 focus:outline-indigo-600' />
                                        {errors.startDate && <span className="text-red-500 text-xs">*{errors.startDate}*</span>}
                                    </div>
                                    <div className='flex flex-col gap-1'>
                                        <label htmlFor="employeeId" className='font-semibold text-sm text-gray-600'>Employee ID<span className='text-red-600'>*</span></label>
                                        <input type="text" id='employeeId' name='employeeId' value={user.employeeId} onChange={handleInputChange} placeholder='Employee ID' className='text-sm bg-gray-200 sm:p-3 p-2 rounded-md outline-none cursor-pointer text-gray-600 font-semibold px-4 shadow-sm group-focus:outline-2 focus:outline-indigo-600' />
                                        {errors.employeeId && <span className="text-red-500 text-xs">*{errors.employeeId}*</span>}
                                    </div>
                                    <div className='flex flex-col gap-1'>
                                        <label htmlFor="salary" className='font-semibold text-sm text-gray-600'>Salary<span className='text-red-600'>*</span></label>
                                        <input type="text" id='salary' name='salary' value={user.salary} onChange={handleInputChange} placeholder='Annual Salary' className='text-sm bg-gray-200 sm:p-3 p-2 rounded-md outline-none cursor-pointer text-gray-600 font-semibold px-4 shadow-sm group-focus:outline-2 focus:outline-indigo-600' />
                                        {errors.salary && <span className="text-red-500 text-xs">*{errors.salary}*</span>}
                                    </div>
                                </div>
                            </div>
                            {/* Submit Button */}
                            <div className='mt-8 flex justify-center'
                            >
                                <button type="submit"

                                    className='bg-indigo-500 text-white px-6 py-2 rounded-md shadow-md hover:bg-indigo-600 transition duration-300'>
                                    Submit Registration
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
