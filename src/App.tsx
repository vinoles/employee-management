import React, { useState, useEffect } from "react";
import { FaEdit, FaTrash, FaSearch } from "react-icons/fa";

const App = () => {
  const [employees, setEmployees] = useState([]);
  const [newEmployee, setNewEmployee] = useState({
    name: "",
    last_name: "",
    position: "",
    dni: "",
    age: "",
    address: "",
  });
  const [editing, setEditing] = useState(false);
  const [editedEmployee, setEditedEmployee] = useState(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const storedEmployees = JSON.parse(localStorage.getItem("employees"));
    if (storedEmployees) {
      setEmployees(storedEmployees);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("employees", JSON.stringify(employees));
  }, [employees]);

  const addEmployee = () => {
    if (newEmployee.name && newEmployee.last_name) {
      setEmployees([...employees, newEmployee]);
      setNewEmployee({
        name: "",
        last_name: "",
        position: "",
        dni: "",
        age: "",
        address: "",
      });
    }
  };

  const editEmployee = (index) => {
    setEditing(true);
    setEditedEmployee(index);
    setNewEmployee(employees[index]);
  };

  const updateEmployee = () => {
    const updatedEmployees = [...employees];
    updatedEmployees[editedEmployee] = newEmployee;
    setEmployees(updatedEmployees);
    setNewEmployee({
      name: "",
      last_name: "",
      position: "",
      dni: "",
      age: "",
      address: "",
    });
    setEditing(false);
    setEditedEmployee(null);
  };

  const deleteEmployee = (index) => {
    const updatedEmployees = employees.filter((_, i) => i !== index);
    setEmployees(updatedEmployees);
  };

  const filteredEmployees = employees.filter(
    (employee) =>
      employee.name.toLowerCase().includes(search.toLowerCase()) ||
      employee.last_name.toLowerCase().includes(search.toLowerCase()) ||
      employee.position.toLowerCase().includes(search.toLowerCase()) ||
      employee.dni.includes(search) ||
      employee.age.includes(search) ||
      employee.address.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container mx-auto mt-5">
      <h1 className="text-2xl font-bold mb-3">Employee Management</h1>
      <div className="mb-4">
        <div className="flex">
          <input
            type="text"
            placeholder="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="p-2 border rounded w-3/4"
          />
          {editing ? (
            <button
              onClick={updateEmployee}
              className="p-2 bg-blue-500 text-white ml-2"
            >
              Update
            </button>
          ) : (
            <button
              onClick={addEmployee}
              className="p-2 bg-green-500 text-white ml-2"
            >
              Add
            </button>
          )}
        </div>
      </div>
      <div className="mb-4">
        <label>Name:</label>
        <input
          type="text"
          value={newEmployee.name}
          onChange={(e) =>
            setNewEmployee({ ...newEmployee, name: e.target.value })
          }
        />
        <label>Last Name:</label>
        <input
          type="text"
          value={newEmployee.last_name}
          onChange={(e) =>
            setNewEmployee({ ...newEmployee, last_name: e.target.value })
          }
        />
        <label>Position:</label>
        <input
          type="text"
          value={newEmployee.position}
          onChange={(e) =>
            setNewEmployee({ ...newEmployee, position: e.target.value })
          }
        />
        <label>DNI:</label>
        <input
          type="text"
          value={newEmployee.dni}
          onChange={(e) =>
            setNewEmployee({ ...newEmployee, dni: e.target.value })
          }
        />
        <label>Age:</label>
        <input
          type="text"
          value={newEmployee.age}
          onChange={(e) =>
            setNewEmployee({ ...newEmployee, age: e.target.value })
          }
        />
        <label>Address:</label>
        <input
          type="text"
          value={newEmployee.address}
          onChange={(e) =>
            setNewEmployee({ ...newEmployee, address: e.target.value })
          }
        />
      </div>
      <ul>
        {filteredEmployees.map((employee, index) => (
          <li
            key={index}
            className="flex justify-between items-center border p-2 mb-2"
          >
            <div>
              <p>
                <strong>Name:</strong> {employee.name} {employee.last_name}
              </p>
              <p>
                <strong>Position:</strong> {employee.position}
              </p>
              <p>
                <strong>DNI:</strong> {employee.dni}
              </p>
              <p>
                <strong>Age:</strong> {employee.age}
              </p>
              <p>
                <strong>Address:</strong> {employee.address}
              </p>
            </div>
            <div>
              <button
                onClick={() => editEmployee(index)}
                className="p-1 text-blue-500 mr-2"
              >
                <FaEdit />
              </button>
              <button
                onClick={() => deleteEmployee(index)}
                className="p-1 text-red-500"
              >
                <FaTrash />
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
