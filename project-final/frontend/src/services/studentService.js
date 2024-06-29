// employerService.js
export const getStudentProfile = async () => {
    const response = await fetch('http://localhost:5000/student/profile', {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('access_token')}`
      }
    });
  
    if (response.ok) {
      return await response.json();
    } else {
      throw new Error('Failed to fetch student profile');
    }
  };
  export const updateStudentProfile = async (student_id, data) => {
    const response = await fetch(`http://localhost:5000/students/${student_id}`, {
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
      throw new Error('Failed to update student profile');
    }
  };