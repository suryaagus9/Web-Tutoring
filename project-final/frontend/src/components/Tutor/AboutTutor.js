import React from 'react';
import '../style/About.css';
import Navbar from "../Tutor/NavTutor";

const AboutTutor = () => {
    return (
    <div>
        <Navbar/>
        <div className='about' id='about'>
            <div className='about-us-container'>
                <div className='about-us'>
                    <h1>About Us</h1>
                    <p>Welcome to BrightPath, your gateway to the best learning opportunities around the globe. Established in 2024, BrightPath is dedicated to providing top-notch e-learning experiences in various fields. Our mission is to empower students with the knowledge and skills they need to succeed in today’s fast-paced world.
                    At BrightPath, we offer a wide range of courses designed to enhance your understanding and mastery of key subjects. Our experienced instructors and comprehensive curriculum ensure that you receive the best education possible, tailored to your needs and goals.
                    Join us at BrightPath and take the next step towards a brighter future. Strengthen your skills and expand your horizons with our innovative and engaging e-learning programs.</p>
                </div>
                <div className='image-container'>
                    <img src="/assets/abt1.png" alt='About Us' className='right-image' />
                </div>
            </div>
            <div className='features-container'>
                <div className='image-container'>
                    <img src="/assets/features.png" alt='Features' className='left-image' />
                </div>
                <div className='features'>
                    <h1>Features</h1>
                    <p>Our e-learning platform offers a comprehensive and diverse course catalog across various fields, ensuring up-to-date content designed by experts. 
                    Engage in interactive learning through video lectures, quizzes, and practical assignments, supported by multimedia formats for an enhanced experience. 
                    Access courses on the go with our mobile-friendly design. Easily search for classes using our advanced search feature, allowing you to find the perfect course for your needs. 
                    Join classes effortlessly and manage your enrollments with the option to delete joined classes if needed. Create and customize your profile to reflect your learning journey, and update your profile anytime to keep your information current.
                    Enjoy a secure, reliable learning environment that prioritizes your data privacy.</p>
                </div>
            </div>
        </div>  
    </div>
    );
}

export default AboutTutor;
