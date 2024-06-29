import React, { useEffect, useState } from "react";
import { Row } from "react-bootstrap";

import { getJoins, deleteJoin } from "../../services/joinService";
import Navbar from "./Navbar";
import "../style/JoinedClass.css";


const JoinedClass = () => {
  const [joins, setJoins] = useState([]);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);


  useEffect(() => {
    const fetchJoins = async () => {
      try {
        const student_id = localStorage.getItem("student_id");
        if (student_id) {
          const joins = await getJoins(student_id);
          setJoins(joins);
        }
      } catch (error) {
        setError("Failed to fetch joins");
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
    <div className="joined-classes">
      <Navbar />
      <h1>Class Joined</h1>
      {error && <p>{error}</p>}
      {message && <p>{message}</p>}
      <Row>
        <div className="content">
          {joins.map((join) =>
            join.class ? (
              <div key={join.join_id} className="profile-card">
                <p className="category">{join.class.class_type}</p>
                <h4>{join.class.title}</h4>
                <p className="desc">{join.class.description}</p>
                <p>
                  <strong>Price:</strong> {join.class.price}
                </p>
                <button className="delete--button" onClick={() => handleDelete(join.join_id)}>Delete Join</button>
              </div>
            ) : (
              <div key={join.join_id} className="profile-card">
                <p>Class information not available</p>
                <button className="delete--button" onClick={() => handleDelete(join.join_id)}>Delete Join</button>
              </div>
            )
          )}
        </div>
      </Row>
    </div>
  );
};

export default JoinedClass;
