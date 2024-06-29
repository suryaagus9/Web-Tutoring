import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import '../style/Profile.css';

const Profile = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [hasProfile, setHasProfile] = useState(false);
  const [error, setError] = useState(null);

  // Fetch profile
  const fetchProfile = async () => {
    try {
      const response = await fetch('http://localhost:5000/student/profile', {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        setProfile(data);
        setHasProfile(true);
      } else if (response.status === 404) {
        setHasProfile(false);
      } else {
        throw new Error('Failed to fetch profile');
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
      if (error.response && error.response.status === 401) {
        navigate('/');
      }
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleEditProfile = () => {
    navigate(`/profile/editprofile/${profile.student_id}`);
  };

  if (!hasProfile) {
    return (
      <div>
        <Navbar />
        <div className='container'>
          <div className='profile'>
            <h1>Profile</h1>
            <p>You have not created a profile yet.</p>
            <button className="create-profile" onClick={() => navigate('/profile/createprofile')}>Create Profile</button>
          </div>
        </div>
      </div>
    );
  }

  if (!profile) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Navbar />
      <div className='container'>
        <div className='profile'>
          <h1>Profile</h1>
          <h4>Phone Number:</h4>
          <p>{profile.student_phone}</p>
          <h4>Age:</h4>
          <p>{profile.age}</p>
          <h4>Education:</h4>
          <p>{profile.education}</p>
          <button className="edit-profile" onClick={handleEditProfile}>Edit Profile</button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
