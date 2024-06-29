// joinService.js
export const createJoin = async (data) => {
  const response = await fetch("http://localhost:5000/joins", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("access_token")}`,
    },
    body: JSON.stringify(data),
  });

  if (response.ok) {
    return await response.json();
  } else {
    throw new Error("Failed to create join");
  }
};

export const getJoinsByStudent = async (student_id) => {
  const response = await fetch(`http://localhost:5000/joins?student_id=${student_id}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("access_token")}`,
    },
  });

  if (response.ok) {
    return await response.json();
  } else {
    throw new Error("Failed to fetch joins");
  }
};


export const deleteJoin = async (join_id) => {
  const response = await fetch(`http://localhost:5000/joins/${join_id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("access_token")}`,
    },
  });

  if (response.ok) {
    return await response.json();
  } else {
    throw new Error("Failed to delete join");
  }
};

export const getJoins = async (student_id) => {
  const response = await fetch(`http://localhost:5000/joins/student/${student_id}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("access_token")}`,
    },
  });

  if (response.ok) {
    return await response.json();
  } else {
    throw new Error("Failed to fetch joins");
  }
};

export const getJoinsForTutor = async () => {
  const response = await fetch("http://localhost:5000/tutor/joins", {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("access_token")}`,
    },
  });

  if (response.ok) {
    return await response.json();
  } else {
    throw new Error("Failed to fetch joins");
  }
};

