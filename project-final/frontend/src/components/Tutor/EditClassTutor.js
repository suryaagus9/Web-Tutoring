import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../style/EditClass.css";
import Navbar from "./NavTutor";
import { getClassById, updateClass, deleteClass } from "../../services/classService";

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

const EditClassTutor = () => {
    const { class_id } = useParams();
    const [cls, setClass] = useState(null);
    const navigate = useNavigate();
    const [preview, setPreview] = useState([]);
    const [editClass, setEditClass] = useState({
        title: "",
        class_type: "",
        description: "",
        lesson: "",
        price: "",
    });

    useEffect(() => {
        const fetchClass = async () => {
            try {
                const data = await getClassById(class_id);
                setClass(data);
                setEditClass(data); // Mengatur formData ke seluruh data kelas
            } catch (error) {
                console.error("Error fetching kelas:", error);
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
            navigate("/tutorprofile");
        } catch (error) {
            console.error("Error updating class:", error);
        }
    };

    const handleDelete = async () => {
        try {
            await deleteClass(class_id);
            navigate("/tutorprofile");
        } catch (error) {
            console.error("Error deleting class:", error);
        }
    };

    return (
        <div>
            <Navbar />
            <div className="edit">
                <h2>Edit Class</h2>
                <form onSubmit={handleSubmit}>
                    <p className="name">Title</p>
                    <input
                        type="text"
                        placeholder="Your class title"
                        name="title"
                        value={editClass.title}
                        onChange={handleChange}
                    />
                    <p className="name">Descriptions</p>
                    <textarea
                        placeholder="Enter your class descriptions"
                        name="description"
                        value={editClass.description}
                        onChange={handleChange}
                    />
                    <p className="name">Class Type</p>
                    <select
                        name="class_type"
                        value={editClass.class_type}
                        onChange={handleChange}
                    >
                        <option value="{editClass.class_type}"></option>
                        {classTypes.map((type, index) => (
                            <option key={index} value={type}>
                                {type}
                            </option>
                        ))}
                    </select>
                    <p className="name">Class Lesson</p>
                    <textarea
                        placeholder="What is primarily taught in your Class?"
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
                    <p className="name">Price</p>
                    <input
                        type="text"
                        placeholder="Rp.xxx.xxx"
                        name="price"
                        value={editClass.price}
                        onChange={handleChange}
                    />
                    <div className="button-group">
                        <button className="delete-button" type="button" onClick={handleDelete}>Delete</button>
                        <button className="save-button" type="submit">Save</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditClassTutor;
