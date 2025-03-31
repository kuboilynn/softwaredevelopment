import React from "react";
import '../pages/styles/Home.css';
import image1 from '../assets/images/image1.png';


const Home=()=>{
    
    return(
        <div className="home">
            <div className="banner">
                <img src={image1} alt="Banner" className="banner-image"/>
                <div className="overlay">
                <h2 className="animated-title">Welcome to your DashBoard</h2>
                <p>Your space to manage everything Effortlessly</p>
                <button className="go-button">Get Started</button>
                </div>
            </div>
        </div>
    );
};
export default Home;