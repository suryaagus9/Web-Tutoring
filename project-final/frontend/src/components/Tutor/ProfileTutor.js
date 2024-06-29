import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../style/ProfileTutor.css';
import Navbar from "../Tutor/NavTutor";
import { getAllClasses } from '../../services/classService';
import { Row } from 'react-bootstrap';

const ProfileTutor = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [classes, setClasses] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const getRandomImageUrl = (id) => `https://picsum.photos/seed/${id}/200/300`;

  const fetchProfile = async () => {
    try {
      const response = await fetch('http://localhost:5000/tutor/profile', {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        setProfile(data);
        return data;
      } else if (response.status === 404) {
        setProfile(null);
      } else {
        throw new Error('Failed to fetch profile');
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
      setError('Failed to fetch profile');
      if (error.response && error.response.status === 401) {
        navigate('/');
      }
    }
  };

  // Fetch all classes and filter based on tutor_id
  const fetchClasses = async (tutorId) => {
    try {
      const allClasses = await getAllClasses();
      const filteredClasses = allClasses.filter(classItem => classItem.tutor_id === tutorId);
      setClasses(filteredClasses);
    } catch (error) {
      console.error('Error fetching classes:', error);
      setError('Failed to fetch classes');
    }
  };

  useEffect(() => {
    const fetchProfileAndClasses = async () => {
      setIsLoading(true); // Start loading
      try {
        const profileData = await fetchProfile();
        if (profileData) {
          await fetchClasses(profileData.tutor_id);
        }
      } finally {
        setIsLoading(false); // End loading
      }
    };

    fetchProfileAndClasses();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!profile) {
    return (
      <div>
        <Navbar />
        <div className='container'>
          <div className='profile'>
            <h1>Tutor Profile</h1>
            <p>You have not created a profile yet.</p>
            <button className="create-class" onClick={() => navigate('/tutorprofile/createprofile')}>Create Profile</button>
          </div>
        </div>
      </div>
    );
  }

  const handleEditProfile = () => {
    navigate(`/tutorprofile/editprofile/${profile.tutor_id}`);
  };

  const handleCreateClass = () => {
    navigate('/tutorprofile/createclass');
  };

  const handleEditClass = (class_id) => {
    navigate(`/tutorprofile/editclass/${class_id}`);
  };

  return (
    <div>
      <Navbar />
      <div className='container'>
        <div className='profile'>
          <h1>Tutor Profile</h1>
          <h4>Tutor Phone:</h4>
          <p>{profile.tutor_phone}</p>
          <h4>Tutor Description:</h4>
          <p>{profile.tutor_description}</p>
          <h4>Experience:</h4>
          <p>{profile.experience}</p>

          <button className="create-class" onClick={handleEditProfile}>Edit Profile</button>
          
          <h3>My Classes</h3>
          {error ? (
            <p>{error}</p>
          ) : (
            <Row>
              <div className="contentss">
                {classes.map((classItem) => (
                  <div key={classItem.class_id} className="profile-card">
                    <div className="card-image">
                      <img src={getRandomImageUrl(classItem.class_id)} alt={classItem.title} />
                    </div>
                    <p className="category">{classItem.class_type}</p>
                    <h4>{classItem.title}</h4>
                    <p className="desc">{classItem.description}</p>
                    <button className="edit-button" onClick={() => handleEditClass(classItem.class_id)}>Edit Class</button>
                  </div>
                ))}
              </div>
            </Row>
          )}
          <button className="create-class" onClick={handleCreateClass}>CREATE CLASS</button>
        </div>
      </div>
    </div>
  );
};

export default ProfileTutor;
