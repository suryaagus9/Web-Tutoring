import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import '../style/Dashboard.css';
import { getUsers, deleteUser } from '../../services/userService';
import { getAllClasses, deleteClass } from '../../services/classService';


const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const [classes, setClasses] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchUsers();
    fetchClasses();
  }, []);

  const fetchUsers = async () => {
    try {
      const users = await getUsers();
      setUsers(users);
    } catch (error) {
      console.error('Failed to fetch users:', error);
    }
  };

  const fetchClasses = async () => {
    try {
      const classes = await getAllClasses();
      setClasses(classes);
    } catch (error) {
      console.error('Failed to fetch classes:', error);
    }
  };

  const handleEditUser = (user_id) => {
    navigate(`/adminhome/edit-user/${user_id}`);
  };

  const handleDeleteUser = async (user_id) => {
    try {
      await deleteUser(user_id); 
      // Jika berhasil menghapus, perbarui daftar user
      const updatedUsers = users.filter((user) => user.user_id !== user_id);
      setUsers(updatedUsers);
      alert("Class deleted successfully");
    } catch (error) {
      console.error("Error deleting class:", error);
      alert(error.message || "Failed to delete class");
    }
  };

  const handleEditClass = (class_id) => {
    navigate(`/adminhome/edit-class/${class_id}`);
  };

  const handleDeleteClass = async (class_id) => {
    try {
      await deleteClass(class_id);
      // Jika berhasil menghapus, perbarui daftar class
      const updatedClass = classes.filter((cls) => cls.class_id !== class_id);
      setClasses(updatedClass);
      alert("Class deleted successfully");
    } catch (error) {
      console.error("Error deleting class:", error);
      alert(error.message || "Failed to delete class");
    }
  };

  const handleAccountClick = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = () => {
    navigate('/');
    localStorage.removeItem('token');
  };

  return (
    <div className="dashboard">
      <div className="account-container">
        <img src="/assets/profile.png" alt="Account Icon" className="account-icon" onClick={handleAccountClick} />
        {isDropdownOpen && (
          <div className="dropdown">
            <button onClick={handleLogout}>Logout</button>
          </div>
        )}
      </div>
      <h1 className='admin-dashboard'>ADMIN DASHBOARD</h1>
      <div className="table-section">
        <h2 className='title-table'>User Table</h2>
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Username</th>
              <th>User Type</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.user_id}>
                <td>{user.full_name}</td>
                <td>{user.email}</td>
                <td>{user.username}</td>
                <td>{user.user_type}</td>
                <td>
                  <button className="edit-btn" onClick={() => handleEditUser(user.user_id)}>Edit</button>
                  <button className="delete-btn" onClick={() => handleDeleteUser(user.user_id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="table-section">
        <h2 className='title-table'>Class Table</h2>
        <table className="table">
          <thead>
            <tr>
              <th>Title</th>
              <th className="description">Description</th>
              <th>Class Type</th>
              <th className="lesson">Lesson</th>
              <th>Price</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {classes.map((cls) => (
              <tr key={cls.class_id}>
                <td>{cls.title}</td>
                <td className="description" title={cls.description}>{cls.description}</td>
                <td>{cls.class_type}</td>
                <td className="lesson" title={cls.lesson}>{cls.lesson}</td>
                <td>{cls.price}</td>
                <td>
                  <button className="edit-btn" onClick={() => handleEditClass(cls.class_id)}>Edit</button>
                  <button className="delete-btn" onClick={() => handleDeleteClass(cls.class_id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
