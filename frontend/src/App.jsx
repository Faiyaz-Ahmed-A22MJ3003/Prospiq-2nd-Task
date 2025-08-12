import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [employees, setEmployees] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    email_address: "",
    telephone_number: "",
    position: "",
    address: "",
    marital_status: false
  });
  const [editingId, setEditingId] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const API_URL = "http://127.0.0.1:8000/api/employees/";

  // Fetch employees
  useEffect(() => {
    axios.get(API_URL).then(res => setEmployees(res.data));
  }, []);

  // Handle form change
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  // Add employee
  const addEmployee = () => {
    axios.post(API_URL, formData).then(res => {
      setEmployees([...employees, res.data]);
      setFormData({
        name: "",
        email_address: "",
        telephone_number: "",
        position: "",
        address: "",
        marital_status: false
      });
      setShowModal(false);
    });
  };

  // Delete employee
  const deleteEmployee = (id) => {
    axios.delete(`${API_URL}${id}/`)
      .then(() => setEmployees(employees.filter(e => e.id !== id)));
  };

  // Start editing
  const startEditing = (emp) => {
    setEditingId(emp.id);
    setFormData({
      name: emp.name,
      email_address: emp.email_address,
      telephone_number: emp.telephone_number,
      position: emp.position,
      address: emp.address,
      marital_status: emp.marital_status
    });
    setShowModal(true);
  };

  // Save edit
  const saveEdit = () => {
    axios.put(`${API_URL}${editingId}/`, formData).then(res => {
      setEmployees(employees.map(e => e.id === editingId ? res.data : e));
      setEditingId(null);
      setFormData({
        name: "",
        email_address: "",
        telephone_number: "",
        position: "",
        address: "",
        marital_status: false
      });
      setShowModal(false);
    });
  };

  return (
    <div className="container">
      {/* Sidebar now holds the form */}
      <aside className="sidebar">
        <h1>{editingId ? "Edit Employee" : "Add Employee"}</h1>
        <input name="name" value={formData.name} onChange={handleChange} placeholder="Full Name" />
        <input name="email_address" value={formData.email_address} onChange={handleChange} placeholder="Email Address" />
        <input name="telephone_number" value={formData.telephone_number} onChange={handleChange} placeholder="Telephone Number" />
        <input name="position" value={formData.position} onChange={handleChange} placeholder="Position" />
        <textarea name="address" value={formData.address} onChange={handleChange} placeholder="Address"></textarea>
        <label>
          <input type="checkbox" name="marital_status" checked={formData.marital_status} onChange={handleChange} />
          Married?
        </label>
        <div className="form-buttons">
          <button onClick={editingId ? saveEdit : addEmployee}>
            {editingId ? "Save Changes" : "Add Employee"}
          </button>
          {editingId && (
            <button className="cancel-btn" onClick={() => { setEditingId(null); setFormData({ name: "", email_address: "", telephone_number: "", position: "", address: "", marital_status: false }); }}>
              Cancel
            </button>
          )}
        </div>
      </aside>

      {/* Main area for employee list */}
      <main className="employee-section">
        <h1>Employees</h1>
        <ul className="employee-list">
          {employees.map(e => (
            <li key={e.id}>
              <div>
                <strong>{e.name}</strong>
                <div>{e.position}</div>
                <small>{e.email_address || "no email"}</small>
                <div>{e.telephone_number || "no telephone"}</div>
                <div>{e.address || "no address"}</div>
                <div>{e.marital_status ? "Married" : "Single"}</div>
              </div>
              <div>
                <button onClick={() => startEditing(e)}>Edit</button>
                <button className="delete-btn" onClick={() => deleteEmployee(e.id)}>❌</button>
              </div>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );

}

export default App;
