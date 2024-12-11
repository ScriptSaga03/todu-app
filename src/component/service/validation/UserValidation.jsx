import { createContext, useContext, useState } from "react";
import { ServiceProvider } from "../Context";

export const UserValidation = createContext();

const ValidProvider = ({ children }) => {

  // Import something from ServiceProvider
  const { user, setUser, setSelectedMaritalStatus, handleModal } = useContext(ServiceProvider);

  const {
    firstName,
    midName,
    lastName,
    maritalStatus,
    dob,
    userGmail,
    userNumber,
    position,
    department,
    startDate,
    employeeId,
    salary,
  } = user;

  const [errors, setErrors] = useState({});
  const [editing, setEditing] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);


  // Edit User
  const handleEdit = (user) => {
    setEditing(true);
    setCurrentUser(user);
    handleModal();
    setUser(user);
  };



  // Form sub
  const handleSubmit = (e) => {
    e.preventDefault();

    const formatDate = (date) => {
      const d = new Date(date);
      const day = String(d.getDate()).padStart(2, '0');
      const month = String(d.getMonth() + 1).padStart(2, '0');
      const year = d.getFullYear();
      return `${day}-${month}-${year}`;
    };


    let errors = {};

    // First Name Validation
    if (!firstName) {
      errors.firstName = "This field is required";
    } else if (firstName.length < 3) {
      errors.firstName = "Length must be at least 3 characters";
    } else if (firstName.length > 12) {
      errors.firstName = "Length must be less than 12 characters";
    } else if (/[^A-Za-z]/.test(firstName)) {
      errors.firstName = "First name must only contain letters";
    } else if (!/^[A-Z]/.test(firstName)) {
      errors.firstName = "First name must start with a capital letter";
    }

    // Middle Name Validation
    if (!midName) {
      errors.midName = "This field is required";
    } else if (midName.length < 3) {
      errors.midName = "Length must be at least 3 characters";
    } else if (midName.length > 12) {
      errors.midName = "Length must be less than 12 characters";
    } else if (/[^A-Za-z]/.test(midName)) {
      errors.midName = "Middle name must only contain letters";
    } else if (!/^[A-Z]/.test(midName)) {
      errors.midName = "Middle name must start with a capital letter";
    }

    // Last Name Validation
    if (!lastName) {
      errors.lastName = "This field is required";
    } else if (lastName.length < 3) {
      errors.lastName = "Length must be at least 3 characters";
    } else if (lastName.length > 12) {
      errors.lastName = "Length must be less than 12 characters";
    } else if (/[^A-Za-z]/.test(lastName)) {
      errors.lastName = "Last name must only contain letters";
    } else if (!/^[A-Z]/.test(lastName)) {
      errors.lastName = "Last name must start with a capital letter";
    }

    // Date of Birth Validation
    if (!dob) {
      errors.dob = 'DOB is required';
    }
    // YYYY MM DD format
    // /^(19|20)\d{2}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/
    // DD MM YYYY format
    // /^(0[1-9]|[12][0-9]|3[01]) (0[1-9]|1[0-2]) (19|20)\d{2}$/
    else if (/^(0[1-9]|[12][0-9]|3[01]) (0[1-9]|1[0-2]) (19|20)\d{2}$/.test(dob)) {
      errors.dob = "DOB must be in the format DD-MM_YYYY"
    }

    // Email Validation
    if (!userGmail) {
      errors.userGmail = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userGmail)) {
      errors.userGmail = "Email is invalid";
    }

    // Phone Number Validation
    if (!userNumber) {
      errors.userNumber = "Phone number is required";
    } else if (!/^\d{10}$/.test(userNumber)) {
      errors.userNumber = "Phone number must be exactly 10 digits";
    }

    // Marital Status Validation
    if (!maritalStatus) {
      errors.maritalStatus = "Marital status is required";
    } else if (!["Single", "Married"].includes(maritalStatus)) {
      errors.maritalStatus = "Invalid marital status";
    }

    // Position Validation
    if (!position) {
      errors.position = "Position is required";
    }

    // Department Validation
    if (!department) {
      errors.department = "Department is required";
    }

    // Start Date Validation
    const formattedStartDate = formatDate(startDate); // Convert to DD-MM-YYYY format

    // Start Date Validation
    if (!formattedStartDate) {
      errors.startDate = "Start date is required";
    } else if (!/^\d{2}-\d{2}-\d{4}$/.test(formattedStartDate)) {
      errors.startDate = "Start date must be in the format DD-MM-YYYY";
    }

    // Employee ID Validation
    if (!employeeId) {
      errors.employeeId = "Employee ID is required";
    } else if (!/^\d{5}$/.test(employeeId)) {
      errors.employeeId = "Employee ID must be a 5-digit number";
    }

    // Salary Validation
    if (!salary) {
      errors.salary = "Salary is required";
    } else if (isNaN(salary)) {
      errors.salary = "Salary must be a valid number";
    } else if (salary < 0) {
      errors.salary = "Salary cannot be negative";
    } if (Object.keys(errors).length === 0) {
      setErrors({});
      const updatedUserData = {
        firstName: user.firstName,
        midName: user.midName,
        lastName: user.lastName,
        maritalStatus: user.maritalStatus,
        dob: user.dob,
        userGmail: user.userGmail,
        userNumber: user.userNumber,
        position: user.position,
        department: user.department,
        startDate: user.startDate,
        employeeId: user.employeeId,
        salary: user.salary,
      };

      const storedData = JSON.parse(localStorage.getItem("userData")) || [];

      if (editing) {
        const index = storedData.findIndex((u) => u.employeeId === currentUser.employeeId);
        if (index !== -1) {
          storedData[index] = updatedUserData;
        }
      } else {
        storedData.push(updatedUserData);
      }

      // Save the updated data back to localStorage
      localStorage.setItem("userData", JSON.stringify(storedData));
     
      setUser({}); 
      setSelectedMaritalStatus('');
      handleModal(); 
      setEditing(false); 
      // console.log(updatedUserData);
    } else {
      setErrors(errors);
    }
  };
  return (
    <UserValidation.Provider value={{ errors, handleSubmit, handleEdit }}>
      {children}
    </UserValidation.Provider>
  );
};

export default ValidProvider;
