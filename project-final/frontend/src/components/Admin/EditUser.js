import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getUserById, updateUser } from "../../services/userService";
import "../style/EditUserAdmin.css"; 

const EditUserAdmin = () => {
  const navigate = useNavigate();
  const { user_id } = useParams();
  const [editUser, setEditUser] = useState({
    username: "",
    email: "",
    full_name: "",
    user_type: "",
    password: "",
  });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await getUserById(user_id);
        setEditUser(userData);
      } catch (error) {
        console.error("Failed to fetch user", error);
      }
    };

    fetchUser();
  }, [user_id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateUser(user_id, editUser);
      navigate("/adminhome");
    } catch (error) {
      console.error("Failed to update user", error);
    }
  };

  return (
    <div className="edits">
      <h2>Edit User</h2>
      <form onSubmit={handleSubmit}>
        <p className="name">Full Name:</p>
        <input
          type="text"
          placeholder="Your Name"
          name="full_name"
          value={editUser.full_name}
          onChange={handleChange}
        />
        <p className="name">Email:</p>
        <input
          type="email"
          placeholder="Your Email"
          name="email"
          value={editUser.email}
          onChange={handleChange}
        />
        <p className="name">Username:</p>
        <input
          type="text"
          placeholder="Your Username"
          name="username"
          value={editUser.username}
          onChange={handleChange}
        />
        <p className="name">Password:</p>
        <input
          type="password"
          placeholder="Leave blank to keep unchanged"
          name="password"
          onChange={handleChange}
        />
        
        <div className="button-group">
          <button className="save-buttons" type="submit">
            Update User
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditUserAdmin;
