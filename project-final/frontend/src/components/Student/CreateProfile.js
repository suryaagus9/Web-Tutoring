import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../style/CreateClass.css';  
import Navbar from "./Navbar";

const CreateProfile = () => {
    const navigate = useNavigate();
    const [formProfile, setFormProfile] = useState({
        student_phone: '',
        age: '',
        education: ''
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
            const response = await fetch('http://localhost:5000/students', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('access_token')}`
            },
            body: JSON.stringify(formProfile)
        });
    
        if (response.ok) {
            navigate('/profile');  
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
                <h2>Create Student Profile</h2>
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
                <button type="submit">Create Profile</button>
            </form>
        </div>
    </div>
    );
};

export default CreateProfile;
