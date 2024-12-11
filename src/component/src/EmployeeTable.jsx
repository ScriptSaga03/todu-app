import { useState, useEffect, useContext } from "react";
import { UserValidation } from '../service/validation/UserValidation';


const EmployeeTable = () => {
  const [userData, setUserData] = useState([]);
  const { handleEdit } = useContext(UserValidation);  // Access the handleEdit function from context

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("userData")) || [];
    setUserData(storedData);
  }, []);

  const handleDelete = (id) => {
    const updatedData = userData.filter((user) => user.employeeId !== id);
    setUserData(updatedData);
    localStorage.setItem("userData", JSON.stringify(updatedData));
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold text-center text-blue-600 mb-6">User Data Table</h2>
      {userData.length > 0 ? (
        <div className="overflow-x-auto shadow-md rounded-lg">
          <table className="min-w-full bg-white divide-y divide-gray-200">
            <thead className="bg-blue-500 text-white">
              <tr>
                <th className="px-4 py-2 text-left">Emp ID</th>
                <th className="px-4 py-2 text-left">First Name</th>
                <th className="px-4 py-2 text-left">Middle Name</th>
                <th className="px-4 py-2 text-left">Last Name</th>
                <th className="px-4 py-2 text-left">Marital Status</th>
                <th className="px-4 py-2 text-left">DOB</th>
                <th className="px-4 py-2 text-left">Email</th>
                <th className="px-4 py-2 text-left">Phone</th>
                <th className="px-4 py-2 text-left">Position</th>
                <th className="px-4 py-2 text-left">Department</th>
                <th className="px-4 py-2 text-left">Start Date</th>
                <th className="px-4 py-2 text-left">Salary</th>
                <th className="px-4 py-2 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {userData.map((user) => (
                <tr key={user.employeeId}>
                  <td className="px-4 py-2">{user.employeeId}</td>
                  <td className="px-4 py-2">{user.firstName}</td>
                  <td className="px-4 py-2">{user.midName}</td>
                  <td className="px-4 py-2">{user.lastName}</td>
                  <td className="px-4 py-2">{user.maritalStatus}</td>
                  <td className="px-4 py-2">{user.dob}</td>
                  <td className="px-4 py-2">{user.userGmail}</td>
                  <td className="px-4 py-2">{user.userNumber}</td>
                  <td className="px-4 py-2">{user.position}</td>
                  <td className="px-4 py-2">{user.department}</td>
                  <td className="px-4 py-2">{user.startDate}</td>
                  <td className="px-4 py-2">{user.salary}</td>
                  <td className="px-4 py-2 flex justify-center items-center gap-2">
                    <button
                      onClick={() => handleEdit(user)}  // Trigger edit when clicked
                      className="px-3 py-1 bg-yellow-500 text-white text-sm rounded hover:bg-yellow-600"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(user.employeeId)}
                      className="px-3 py-1 bg-red-500 text-white text-sm rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-center text-gray-500 mt-6">
          No user data available. Please submit the form.
        </p>
      )}
    </div>
  );
};

export default EmployeeTable;
