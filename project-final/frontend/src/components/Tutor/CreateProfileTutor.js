import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../style/CreateClass.css';  
import Navbar from "../Tutor/NavTutor";

const CreateProfileTutor = () => {
    const navigate = useNavigate();
    const [formProfile, setFormProfile] = useState({
        tutor_phone: '',
        tutor_description: '',
        experience: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormProfile(prevState => ({
            ...prevState,
            [name]: value
        }));
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
            const response = await fetch('http://localhost:5000/tutors', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('access_token')}`
            },
            body: JSON.stringify(formProfile)
        });
    
        if (response.ok) {
            navigate('/tutorprofile');  
        } else {
            const data = await response.json();
            alert(data.message);
        }
        } catch (error) {
            console.error('Error:', error);
            alert('Something went wrong. Please try again later.');
        }
    };

    return (
    <div>
        <Navbar/>
        <div className='create'>
            <form onSubmit={handleSubmit}>
                <h2>Create Tutor Profile</h2>
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
                <button type="submit">Create Profile</button>
            </form>
        </div>
    </div>
    );


};

export default CreateProfileTutor;
