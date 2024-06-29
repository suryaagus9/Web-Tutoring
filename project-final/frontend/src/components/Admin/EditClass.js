import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getClassById, updateClass } from "../../services/classService";
import "../style/EditClassAdmin.css"; 

const classTypes = [
  "Language",
  "Mathematics",
  "Science",
  "Technology",
  "Art and Design",
  "Business and Finance",
  "Music and Entertainment",
  "Life Skills",
  "Test Preparation",
  "Special Education",
  "Health and Wellness",
];

const EditClassAdmin = () => {
  const { class_id } = useParams();
  const [editClass, setEditClass] = useState({
    title: "",
    class_type: "",
    description: "",
    lesson: "",
    price: "",
  });
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [preview, setPreview] = useState([]);

  useEffect(() => {
    const fetchClass = async () => {
      try {
        const data = await getClassById(class_id);
        setEditClass(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching class:", error);
      }
    };

    fetchClass();
  }, [class_id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditClass({
      ...editClass,
      [name]: value,
    });
    setPreview(value.split("\n"));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateClass(class_id, editClass);
      navigate("/adminhome");
    } catch (error) {
      console.error("Error updating class:", error);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="edits">
      <h2>Edit Class</h2>
      <form onSubmit={handleSubmit}>
        <p className="name">Title:</p>
        <input
          type="text"
          placeholder="Your class title"
          name="title"
          value={editClass.title}
          onChange={handleChange}
        />
        <p className="name">Description:</p>
        <textarea
          placeholder="Enter your class description"
          name="description"
          value={editClass.description}
          onChange={handleChange}
        />
        <p className="name">Class Type:</p>
        <select
          name="class_type"
          value={editClass.class_type}
          onChange={handleChange}
        >
          <option value="">Select class type</option>
          {classTypes.map((type, index) => (
            <option key={index} value={type}>
              {type}
            </option>
          ))}
        </select>
        <p className="name">Lesson:</p>
        <textarea
          placeholder="What is primarily taught in your class?"
          name="lesson"
          value={editClass.lesson}
          onChange={handleChange}
        />
        <div className="lesson-preview">
          <h4>Lesson Preview:</h4>
          <ul>
            {preview.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
        <p className="name">Price:</p>
        <input
          type="text"
          placeholder="Enter class price"
          name="price"
          value={editClass.price}
          onChange={handleChange}
        />
        <div className="button-group">
          <button className="save-buttons" type="submit">
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditClassAdmin;
