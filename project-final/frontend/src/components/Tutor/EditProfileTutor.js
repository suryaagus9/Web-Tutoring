import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import '../style/CreateClass.css';
import Navbar from "./NavTutor";
import { getTutorProfile, updateTutorProfile } from "../../services/tutorService";

const EditProfileTutor = () => {
    const { tutor_id } = useParams(); 
    const navigate = useNavigate();
    const [formProfile, setFormProfile] = useState({
        tutor_phone: "",
        tutor_description: "",
        experience: ""
    });
    
    useEffect(() => {
      const fetchProfile = async () => {
        try {
          const data = await getTutorProfile(tutor_id);
          setFormProfile(data);
        } catch (error) {
          console.error("Error fetching profile:", error);
        }
      };

        fetchProfile();
    }, [tutor_id]);

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
            await updateTutorProfile(tutor_id, formProfile);
            navigate("/tutorprofile");
        } catch (error) {
            console.error("Error updating tutor profile:", error);
            alert("Failed to update tutor profile");
        }
    };



  return (
  <div>
    <Navbar/>
    <div className='create'>
    <form onSubmit={handleSubmit}>
      <h2>Edit Profile</h2>
      <p className='name'>Tutor Phone Number</p>
      <input 
        type="text" 
        placeholder="Your Phone Number" 
        name="tutor_phone" 
        value={formProfile.tutor_phone} 
        onChange={handleChange} 
        required 
      />
      <p className='name'>Tutor Description</p>
      <textarea placeholder="Your  descriptions"
        name="tutor_description" 
        value={formProfile.tutor_description} 
        onChange={handleChange} 
        required 
      />
      <p className='name'>Experience</p>
      <textarea 
        placeholder="Your  Experience"
        name="experience" 
        value={formProfile.experience} 
        onChange={handleChange} 
        required 
      />
      <button type="submit">Update</button>
    </form>
    </div>
  </div>
  );
}

export default EditProfileTutor;
