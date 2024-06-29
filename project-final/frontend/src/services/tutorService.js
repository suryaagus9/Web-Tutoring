// tutorService.js
export const getTutorProfile = async () => {
    const response = await fetch('http://localhost:5000/tutor/profile', {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('access_token')}`
      }
    });
  
    if (response.ok) {
      return await response.json();
    } else {
      throw new Error('Failed to fetch tutor profile');
    }
  };

  export const updateTutorProfile = async (tutor_id, data) => {
    const response = await fetch(`http://localhost:5000/tutors/${tutor_id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('access_token')}`
      },
      body: JSON.stringify(data)
    });
  
    if (response.ok) {
      return await response.json();
    } else {
      throw new Error('Failed to update tutor profile');
    }
  };
  
  // joinService.js
export const getJoinsByStudent = async (student_id) => {
  const response = await fetch(`http://localhost:5000/joins/student/${student_id}`, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('access_token')}`
    }
  });

  if (response.ok) {
    return await response.json();
  } else {
    throw new Error('Failed to fetch joins');
  }
};

  