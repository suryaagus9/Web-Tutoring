// JoinedStudent.js
import React, { useEffect, useState } from "react";
import Navbar from "../Tutor/NavTutor";
import { Row } from "react-bootstrap";
import { deleteJoin } from "../../services/joinService";
import "../style/JoinedStudent.css"; 

const JoinedStudent = () => {
  const [joins, setJoins] = useState([]);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    const fetchJoins = async () => {
      try {
        const response = await fetch("http://localhost:5000/tutor/joins", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        });
        if (response.ok) {
          const data = await response.json();
          setJoins(data);
        } else {
          console.error("Failed to fetch joins");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchJoins();
  }, []);

  const handleDelete = async (join_id) => {
    try {
      await deleteJoin(join_id);
      setMessage("Join deleted successfully");
      setJoins(joins.filter((app) => app.join_id !== join_id));
    } catch (error) {
      setError("Failed to delete join");
    }
  };


  return (
    <div className="joined-student">
      <Navbar />
      <h1>Students Joined</h1>
      <Row>
        <div className="content">
          {joins.map((join) => (
            <div key={join.join_id} className="profile-card">
              <h3>Name: 
                <p>{join.student_name}</p>
                </h3>
              <h3>Email: 
                <p>{join.student_email}</p>
                <p>{join.student_phone}</p>
              </h3>
              <h3>Class Title: 
                <p>{join.class_title}</p>
              </h3>
              <h3>Joined at: 
                <p>{join.joined_at}</p>
              </h3>
              <button className="delete--button" onClick={() => handleDelete(join.join_id)}>Delete Join</button>
            </div>
          ))}
        </div>
      </Row>
    </div>
  );
};

export default JoinedStudent;
