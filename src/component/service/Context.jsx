import { createContext, useState, useCallback } from "react";

export const ServiceProvider = createContext();

const Provider = ({ children }) => {
    const [openModal, setOpenModal] = useState(false);
    const [selectedMaritalStatus, setSelectedMaritalStatus] = useState("Select");
    const [dropDown, setDropDown] = useState(false);

    // State to manage form inputs
    const [user, setUser] = useState({
        firstName: '',
        midName: '',
        lastName: '',
        maritalStatus: 'Single',
        dob: '',
        userGmail: '',
        userNumber: '',
        position: '',
        department: '',
        startDate: '',
        employeeId: '',
        salary: '',
    });
    // handle Input change
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUser((prev) => ({
            ...prev,
            [name]: value,
        }));
    };


    const handleStatusChange = (status) => {
        setSelectedMaritalStatus(status); 
        setDropDown(!dropDown)
        };


    const handleModal = useCallback(() => {
        setOpenModal(prevState => !prevState);
    }, []);

    return (
        <ServiceProvider.Provider value={{
            openModal,
            handleModal,
            handleInputChange,
            user,
            setUser,
            selectedMaritalStatus,
            setSelectedMaritalStatus,
            handleStatusChange,
            setDropDown,
            dropDown
        }}>
            {children}
        </ServiceProvider.Provider>
    );
};

export default Provider;