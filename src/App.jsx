import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    address: '',
    gender: '',
    age: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);

    try {
      const response = await axios.post("http://localhost:8080/api/users", formData);
      alert("User saved successfully: " + JSON.stringify(response.data));
    } catch (error) {
      console.error("Error saving user", error);
      alert("Failed to save user!");
    }
  };

  return (
    <div style={{ padding: '30px', maxWidth: '500px', margin: '0 auto' }}>
      <h2 style={{ textAlign: 'center' }}> Basic Form</h2>
      <form onSubmit={handleSubmit}>
        {[ 
          { label: 'Name', type: 'text', name: 'name' },
          { label: 'Email', type: 'email', name: 'email' },
          { label: 'Password', type: 'password', name: 'password' },
          { label: 'Phone', type: 'tel', name: 'phone' },
          { label: 'Address', type: 'text', name: 'address' },
          { label: 'Age', type: 'number', name: 'age' }
        ].map((field) => (
          <div key={field.name} style={{ display: 'flex', marginBottom: '12px' }}>
            <label style={{ flex: '1', fontWeight: 'bold' }}>{field.label}:</label>
            <input
              type={field.type}
              name={field.name}
              value={formData[field.name]}
              onChange={handleChange}
              style={{ flex: '2', padding: '6px' }}
            />
          </div>
        ))}

        <div style={{ display: 'flex', marginBottom: '12px' }}>
          <label style={{ flex: '1', fontWeight: 'bold' }}>Gender:</label>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            style={{ flex: '2', padding: '6px' }}
          >
            <option value="">Select</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <button type="submit" style={{ padding: '10px 20px' }}>Submit</button>
        </div>
      </form>
    </div>
  );
}

export default App;