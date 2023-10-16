import React, { useState, useEffect } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import Navbar from "./components/menu/Navbar";

interface Employee {
  name: string;
  last_name: string;
  position: string;
  dni: string;
  age?: number;
  description: string;
}

const App: React.FC = () => {
  const [newEmployee, setNewEmployee] = useState<Employee>({
    name: "",
    last_name: "",
    position: "",
    dni: "",
    age: 0,
    description: "",
  });
  const [editing, setEditing] = useState(false);
  const [editedEmployee, setEditedEmployee] = useState<number | null>(null);
  const [search, setSearch] = useState("");

  const [employees, setEmployees] = useState<Employee[]>(() => {
    const storedEmployees = window.localStorage.getItem("employees");
    if (storedEmployees) return JSON.parse(storedEmployees);
    return Array(9).fill(null);
  });

  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(
    null
  );

  useEffect(() => {
    window.localStorage.setItem("employees", JSON.stringify(employees));
  }, [employees]);

  const addEmployee = () => {
    if (newEmployee.name && newEmployee.last_name) {
      setEmployees([...employees, newEmployee]);
      setNewEmployee({
        name: "",
        last_name: "",
        position: "",
        dni: "",
        age: 0,
        description: "",
      });
    }
  };

  const editEmployee = (index: number) => {
    setEditing(true);
    setEditedEmployee(index);
    setNewEmployee(employees[index]);
  };

  const updateEmployee = () => {
    if (editedEmployee !== null) {
      const updatedEmployees = [...employees];
      updatedEmployees[editedEmployee] = newEmployee;
      setEmployees(updatedEmployees);
      setNewEmployee({
        name: "",
        last_name: "",
        position: "",
        dni: "",
        age: 0,
        description: "",
      });
      setEditing(false);
      setEditedEmployee(null);
    }
  };

  const deleteEmployee = (index: number) => {
    const updatedEmployees = employees.filter((_, i) => i !== index);
    setEmployees(updatedEmployees);
  };

  const filteredEmployees = employees.filter(
    (employee) =>
      employee.name.toLowerCase().includes(search.toLowerCase()) ||
      employee.last_name.toLowerCase().includes(search.toLowerCase()) ||
      employee.position.toLowerCase().includes(search.toLowerCase()) ||
      employee.dni.includes(search)
  );

  const openModal = (employee: Employee) => {
    setSelectedEmployee(employee);
  };

  const closeModal = () => {
    setSelectedEmployee(null);
  };

  const resetForm = () => {
    setNewEmployee({
      name: "",
      last_name: "",
      position: "",
      dni: "",
      age: 0,
      description: "",
    });
    setEditing(false);
    setEditedEmployee(null);
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto m-10 ">
        <div className="flex ml-10 mt-10 justify-between flex-wrap">
          <div className="form-control ">
            <label className="label">
              <span className="label-text font-bold">Nombre</span>
            </label>
            <input
              type="text"
              placeholder="Ej: David"
              className="input input-bordered input-primary"
              value={newEmployee.name}
              onChange={(e) =>
                setNewEmployee({ ...newEmployee, name: e.target.value })
              }
            />
          </div>
          <div className="form-control ">
            <label className="label">
              <span className="label-text font-bold">Apellido</span>
            </label>
            <input
              type="text"
              placeholder="Ej: Rojas"
              className="input input-bordered input-primary"
              value={newEmployee.last_name}
              onChange={(e) =>
                setNewEmployee({ ...newEmployee, last_name: e.target.value })
              }
            />
          </div>

          <div className="form-control ">
            <label className="label">
              <span className="label-text font-bold">Cargo</span>
            </label>
            <input
              type="text"
              placeholder="Ej: Jefe de personal"
              className="input input-bordered input-primary"
              value={newEmployee.position}
              onChange={(e) =>
                setNewEmployee({ ...newEmployee, position: e.target.value })
              }
            />
          </div>

          <div className="form-control ">
            <label className="label">
              <span className="label-text font-bold">Cédula</span>
            </label>
            <input
              type="text"
              placeholder="Ej: 19021783"
              className="input input-bordered input-primary"
              value={newEmployee.dni}
              onChange={(e) =>
                setNewEmployee({ ...newEmployee, dni: e.target.value })
              }
            />
          </div>

          <div className="form-control ">
            <label className="label">
              <span className="label-text font-bold">Edad</span>
            </label>
            <input
              type="number"
              placeholder="Ej: 23"
              className="input input-bordered input-primary"
              value={newEmployee.age}
              maxLength={2}
              onChange={(e) =>
                setNewEmployee({
                  ...newEmployee,
                  age: parseInt(e.target.value) || 0,
                })
              }
            />
          </div>
        </div>
        <div className="flex ml-10 pt-2  mt-2">
          <div className="form-control flex-auto ">
            <label className="label">
              <span className="label-text font-bold">
                Descripcion del cargo e historial
              </span>
            </label>
            <textarea
              placeholder="Ej: Puedes colocar datos relevantes del cargo y algun tipo de historial del empleado."
              className="textarea textarea-bordered textarea-lg w-full"
              value={newEmployee.description}
              onChange={(e) =>
                setNewEmployee({ ...newEmployee, description: e.target.value })
              }
            ></textarea>
          </div>
          <div className="flex">
            {editing ? (
              <button
                onClick={updateEmployee}
                className="btn p-2 bg-blue-500 text-white m-20"
              >
                Guardar
              </button>
            ) : (
              <button
                onClick={addEmployee}
                className="btn p-4 bg-primary text-white mt-20 ml-10 rounded-full"
              >
                Guardar
              </button>
            )}
            <button
              onClick={resetForm}
              className="btn p-4 bg-gray-300 text-gray-800 mt-20 ml-2 rounded-full"
            >
              Resetear
            </button>
          </div>
        </div>
        <div className="flex  pt-2  mt-10 ">
          <div className="form-control flex-auto ">
            <input
              type="text"
              placeholder="Buscar por, nombre, apellido, cedula "
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="input input-bordered input-primary w-2/4"
            />
          </div>
        </div>

        <div className="flex mt-2 overflow-x-auto">
          <table className="table xs:table-xs md:table-md">
            <thead>
              <tr>
                <th>Edad / Nombre / Apellido</th>
                <th>Cédula</th>
                <th>Cargo</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filteredEmployees.map((employee, index) => (
                <tr key={index}>
                  <td>
                    <div className="flex items-center space-x-3">
                      <div className="avatar placeholder">
                        <div className="bg-neutral-focus text-neutral-content rounded-full w-12">
                          <span> {employee.age}</span>
                        </div>
                      </div>
                      <div>
                        <div className="font-bold">
                          {employee.name} {employee.last_name}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td>{employee.dni}</td>
                  <td> {employee.position}</td>
                  <th>
                    {/* <a className="btn">open modal</a> */}
                    <a
                      className="btn btn-ghost btn-xs "
                      href="#my_modal_8"
                      onClick={() => openModal(employee)}
                    >
                      details
                    </a>
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
                  </th>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="modal " id="my_modal_8">
        <div className="modal-box w-11/12 max-w-5xl">
          <h3 className="font-bold text-lg"> Detalles del Empleado!</h3>

          <div className="flex">
            {selectedEmployee && (
              <div className="flex flex-col justify-start gap-2 mt-5">
                <span>
                  <strong>Nombre / Apellido / Edad:</strong>{" "}
                  {selectedEmployee.name} {selectedEmployee.last_name},{" "}
                  {selectedEmployee.age}
                </span>
                <span>
                  <strong>Cargo:</strong> {selectedEmployee.position}
                </span>
                <span>
                  <strong>Cédula:</strong> {selectedEmployee.dni}
                </span>
                <span>
                  <strong>Detalles:</strong> {selectedEmployee.description}
                </span>
              </div>
            )}
          </div>
          <div className="modal-action">
            <a href="#" className="btn" onClick={closeModal}>
              cerrar
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
