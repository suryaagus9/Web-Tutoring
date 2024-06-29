
import axios from 'axios';

const API_URL = 'http://localhost:5000';

export const getUsers = async () => {
  const response = await fetch('http://localhost:5000/users', {
      headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`
      }
  });

  if (response.ok) {
      return await response.json();
  } else {
      throw new Error('Failed to fetch users');
  }
};

export const getUserById = async (user_id) => {
  const response = await fetch(`http://localhost:5000/users/${user_id}`, {
      headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`
      }
  });

  if (response.ok) {
      return await response.json();
  } else {
      throw new Error('Failed to fetch user');
  }
};

export const updateUser = async (user_id, data) => {
  const response = await fetch(`http://localhost:5000/users/${user_id}`, {
      method: 'PUT',
      headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
      },
      body: JSON.stringify(data),
  });

  if (response.ok) {
      return await response.json();
  } else {
      throw new Error('Failed to update user');
  }
};

export const deleteUser = async (user_id) => {
  try {
      const response = await axios.delete(`${API_URL}/users/${user_id}`, {
        method : "DELETE",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("access_token")}`
        }
      });
      if (response.status === 200) {
          return response.data;
      } else {
          throw new Error(response.data.message || 'Failed to delete user');
      }
  } catch (error) {
      console.error('Error in deleteUser:', error.response ? error.response.data : error.message);
      throw error.response ? error.response.data : error;
  }
};

