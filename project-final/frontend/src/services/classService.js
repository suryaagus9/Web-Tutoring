export const getAllClasses = async () => {
  const response = await fetch("http://localhost:5000/classes", {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("access_token")}`,
    },
  });

  if (response.ok) {
    return await response.json();
  } else {
    throw new Error("Failed to fetch classes");
  }
};


export const getClassById = async (class_id) => {
  const response = await fetch(`http://localhost:5000/classes/${class_id}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("access_token")}`,
    },
  });

  if (response.ok) {
    return await response.json();
  } else {
    throw new Error("Failed to fetch class details");
  }
};


export const updateClass = async (class_id, data) => {
  const response = await fetch(`http://localhost:5000/classes/${class_id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("access_token")}`,
    },
    body: JSON.stringify(data),
  });

  if (response.ok) {
    return await response.json();
  } else {
    throw new Error("Failed to update class");
  }
};

export const deleteClass = async (class_id) => {
  const response = await fetch(`http://localhost:5000/classes/${class_id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("access_token")}`,
    },
  });

  if (response.ok) {
    return await response.json();
  } else {
    throw new Error("Failed to delete class");
  }
};
