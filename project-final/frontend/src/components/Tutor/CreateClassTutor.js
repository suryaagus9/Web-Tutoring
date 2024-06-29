import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../style/CreateClass.css";
import Navbar from "./NavTutor";

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

const CreateClassTutor = () => {
  const [classTitle, setClassTitle] = useState("");
  const [classType, setClassType] = useState("");
  const [classDescription, setClassDescription] = useState("");
  const [classLesson, setClassLesson] = useState("");
  const [classPrice, setClassPrice] = useState("");
  const [preview, setPreview] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLessonChange = (e) => {
    const value = e.target.value;
    setClassLesson(value);
    setPreview(value.split("\n"));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const tutor_id = localStorage.getItem("tutor_id");
    const classData = {
      tutor_id: tutor_id,
      title: classTitle,
      class_type: classType,
      description: classDescription,
      lesson: classLesson,
      price: classPrice,
    };

    try {
      const response = await fetch("http://localhost:5000/classes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
        body: JSON.stringify(classData),
      });

      if (response.ok) {
        navigate("/tutorprofile");
      } else {
        const data = await response.json();
        setError(data.message || "Failed to create class");
      }
    } catch (error) {
      console.error("Error creating class:", error);
      setError("Failed to create class");
    }
  };

  return (
    <div>
      <Navbar />
      <div className="create">
        <h2>Class</h2>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <form onSubmit={handleSubmit}>
          <p className="name">Title</p>
          <input
            type="text"
            placeholder="Your class title"
            value={classTitle}
            onChange={(e) => setClassTitle(e.target.value)}
            required
          />
          <p className="name">Descriptions</p>
          <textarea
            placeholder="Enter your class descriptions"
            value={classDescription}
            onChange={(e) => setClassDescription(e.target.value)}
            required
          />
          <p className="name">Class Type</p>
          <select
            value={classType}
            onChange={(e) => setClassType(e.target.value)}
            required
          >
            <option value="">Select...</option>
            {classTypes.map((type, index) => (
              <option key={index} value={type}>
                {type}
              </option>
            ))}
          </select>
          <p className="name">Class Lesson</p>
          <textarea
            placeholder="What is primarily taught in your Class?"
            value={classLesson}
            onChange={handleLessonChange}
            required
          />
          <div className="lesson-preview">
            <h4>Lesson Preview:</h4>
            <ul>
              {preview.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
          <p className="name">Price</p>
          <input
            type="text"
            placeholder="Rp.xxx.xxx"
            value={classPrice}
            onChange={(e) => setClassPrice(e.target.value)}
            required
          />
          <button type="submit">Save</button>
        </form>
      </div>
    </div>
  );
};

export default CreateClassTutor;
