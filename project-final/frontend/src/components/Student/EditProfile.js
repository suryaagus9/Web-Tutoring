import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import '../style/CreateClass.css';
import Navbar from "./Navbar";
import { getStudentProfile, updateStudentProfile } from "../../services/studentService";

const EditProfile = () => {
    const { student_id } = useParams(); 
    const navigate = useNavigate();
    const [formProfile, setFormProfile] = useState({
        student_phone: "",
        age: "",
        education: ""
    });
    
    useEffect(() => {
      const fetchProfile = async () => {
        try {
          const data = await getStudentProfile(student_id);
          setFormProfile(data);
        } catch (error) {
          console.error("Error fetching profile:", error);
        }
      };

        fetchProfile();
    }, [student_id]);

    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormProfile({
        ...formProfile,
        [name]: value,
      });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateStudentProfile(student_id, formProfile);
            navigate("/profile");
        } catch (error) {
            console.error("Error updating student profile:", error);
            alert("Failed to update tutor profile");
        }
    };



  return (
  <div>
    <Navbar/>
    <div className='create'>
    <form onSubmit={handleSubmit}>
      <h2>Edit Profile</h2>
      <p className='name'>Student Phone Number</p>
      <input 
        type="text" 
        placeholder="Your Phone Number" 
        name="student_phone" 
        value={formProfile.student_phone} 
        onChange={handleChange} 
        required 
      />
      <p className='name'>Student Age</p>
      <input 
        type="text"
        placeholder="Your  Age"
        name="age" 
        value={formProfile.age} 
        onChange={handleChange} 
        required 
      />
      <p className='name'>Education</p>
      <textarea 
        placeholder="Your  Education"
        name="education" 
        value={formProfile.education} 
        onChange={handleChange} 
        required 
      />
      <button type="submit">Update</button>
    </form>
    </div>
  </div>
  );
}

export default EditProfile;
