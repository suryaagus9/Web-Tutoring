import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Row, Col } from "react-bootstrap";
import { getAllClasses } from "../../services/classService";
import "../style/home.css";
import Navbar from "../Tutor/NavTutor";

const Home = () => {
  const navigate = useNavigate();
  const [classes, setClasses] = useState([]);
  const [error, setError] = useState(null);
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

  const handleExploreClasses = () => {
    navigate("/tutorclass");
  };

  const handleCardClick = (classId) => {
    navigate(`/tutorclass/${classId}`);
  };

  return (
  <div>
    <Navbar/>
    <div className="bg">
      <div className="header-container">
        <div className="custom-container">
          <div className="text-container">
            <h1 className="custom-text">
              The <span className="title">Clear Path </span> To <br /> A{" "}
              <span className="title">Brighter</span> <br /> Tomorrow
            </h1>
            <p className="custom-paragraph">
            "Welcome to BrightPath! We are committed to providing an interactive and enjoyable learning experience. 
              Explore various courses and materials specifically designed to enhance your knowledge and skills. 
              Let's start your learning journey with us and reach your full potential!"
            </p>
          </div>
          <div className="image-container">
            <img
              src="/assets/tutor.png"
              alt="BrightPath"
              className="right-image"
            />
          </div>
        </div>
      </div>
      <h1>Class Listings</h1>
      {error && <p>{error}</p>}
      <Row>
        <div className="contents">
          {classes.slice(0, 3).map((cls) => (
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
      <Row className="explore-button-container">
        <Col md="auto">
          <button
            className="btn btn-light explore-button"
            onClick={handleExploreClasses}
          >
            Explore All Classes
          </button>
        </Col>
      </Row>
    </div>
  </div>
  );
};

export default Home;
