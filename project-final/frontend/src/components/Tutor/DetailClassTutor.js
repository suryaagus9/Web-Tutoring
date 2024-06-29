import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getClassById } from "../../services/classService";
import "../style/Detail.css";
import Navbar from "./NavTutor";

export const DetailClassTutor = () => {
  const { class_id } = useParams();
  const [Class, setClass] = useState(null);
  const [error, setError] = useState(null);
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

    fetchClass();
  }, [class_id]);

  if (error) {
    return <p>{error}</p>;
  }

  if (!Class) {
    return <p>Loading...</p>;
  }

  const lessonTopics = Class.lesson.split('\n');

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
    </div>
  );
};

export default DetailClassTutor;
