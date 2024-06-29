import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getClassById } from "../../services/classService";
import { getJoins, createJoin } from "../../services/joinService";
import "../style/Detail.css";
import Navbar from "./Navbar";

export const DetailClass = () => {
  const { class_id } = useParams();
  const [Class, setClass] = useState(null);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState("");
  const [joinedClass, setJoinedClass] = useState([]);
  const navigate = useNavigate();

  const user_type = localStorage.getItem("user_type");

  const getRandomImageUrl = (id) => `https://picsum.photos/seed/${id}/1500/300`;

  useEffect(() => {
    const fetchClass = async () => {
      try {
        const data = await getClassById(class_id);
        setClass(data);
      } catch (error) {
        setError("Failed to fetch class");
      }
    };

    const fetchJoinedClasses = async () => {
      try {
        const student_id = localStorage.getItem("student_id");
        if (student_id) {
          const joinedClasses = await getJoins(student_id);
          setJoinedClass(joinedClasses.map((join) => join.class_id));
        }
      } catch (error) {
        setError("Failed to fetch joined classes");
      }
    };

    fetchClass();
    fetchJoinedClasses();
  }, [class_id]);

  if (error) {
    return <p>{error}</p>;
  }

  if (!Class) {
    return <p>Loading...</p>;
  }

  const handleJoinClass = async (class_id) => {
    try {
      const student_id = localStorage.getItem("student_id");
      if (!student_id) {
        setError("You must be logged in to join the class");
        return;
      }

      const joinData = {
        class_id: class_id,
        student_id: student_id,
        status: "Student Has Joined Class",
      };

      await createJoin(joinData);
      setMessage("Join submitted successfully");
      setJoinedClass([...joinedClass, class_id]);
      setTimeout(() => {
        navigate('/joinedclass');
      }, 1000);
    } catch (error) {
      setError("Failed to join the class");
    }
  };

  const lessonTopics = Class.lesson.split("\n");

  return (
    <div>
      <Navbar />
      <div className="detail">
        <div className="class-header">
          <div className="class-category">{Class.class_type}</div>
          <h1 className="class-title">{Class.title}</h1>
          <div className="class-image">
            <img src={getRandomImageUrl(Class.class_id)} alt={class_id} />
          </div>
        </div>
        <div className="class-body">
          <div className="class-description">
            <h2>Description</h2>
            <p>{Class.description}</p>
          </div>
          <div className="class-topic">
            <h2>Topic Class</h2>
            <ul>
              {lessonTopics.map((topic, index) => (
                <li key={index}>{topic}</li>
              ))}
            </ul>
          </div>
        </div>
        {!joinedClass.includes(Class.class_id) && (
          <button
            className="btn btn-join"
            onClick={(e) => {
              e.stopPropagation();
              handleJoinClass(Class.class_id);
            }}
          >
            Join Class
          </button>
        )}
        {message && <p>{message}</p>}
      </div>
    </div>
  );
};

export default DetailClass;
