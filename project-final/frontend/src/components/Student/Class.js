import React, { useEffect, useState } from "react";
import { Row } from "react-bootstrap";
import "../style/Class.css";
import { useNavigate } from "react-router-dom";
import { getAllClasses } from "../../services/classService";
import Navbar from "../Student/Navbar";

const Class = () => {
  const [classes, setClasses] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const getRandomImageUrl = (id) => `https://picsum.photos/seed/${id}/200/300`;

  useEffect(() => {
    const getClasses = async () => {
      try {
        const data = await getAllClasses();
        setClasses(data);
      } catch (error) {
        setError("Failed to fetch classes");
      }
    };

    getClasses();
  }, []);

  const handleCardClick = (classId) => {
    navigate(`/class/${classId}`);
  };

  return (
  <div>
    <Navbar/>
    <div className="classes">
      <h1>Class</h1>
      {error && <p>{error}</p>}
      <Row>
        <div className="content">
          {classes.map((cls) => (
            <div
              key={cls.class_id}
              className="card"
              onClick={() => handleCardClick(cls.class_id)}
            >
              <div className="card-image-container">
                <img src={getRandomImageUrl(cls.class_id)} alt={cls.title} />
              </div>
              <p className="card-category">{cls.class_type}</p>
              <p className="card-name">
                <span>{cls.title}</span>
              </p>
              <p className="card-desc">{cls.description}</p>
              <p>Price: {cls.price}</p>
            </div>
          ))}
        </div>
      </Row>
    </div>
  </div>
  );
};

export default Class;
