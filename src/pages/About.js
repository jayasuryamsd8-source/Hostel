import React from "react";
import image from "../assets/hostel3.jpg";
import "../styles/About.css";
import Navbar from "../components/Navbar";

function About() {
  return (
    <>
     <Navbar/>
    <div className="about">
   
      <div
        className="aboutTop"
        style={{ backgroundImage: `url(${image})` }}
      ></div>
      <div className="aboutBottom">
        <h1> ABOUT US</h1>
        <p>
        NGM College, Pollachi provides on-campus hostel accommodation that supports a disciplined and comfortable student lifestyle. Situated within the college’s 25-acre green campus, the hostels offer separate, well-maintained facilities for students with a focus on safety, hygiene, and convenience. Rooms are designed to meet everyday student needs, and common amenities such as recreation rooms and gym facilities encourage physical activity and relaxation beyond academics. The hostel premises are regularly maintained, contributing to a clean and organized living environment that many students rate positively. With annual hostel fees kept under ₹25,000, the college ensures affordable accommodation without compromising basic facilities. The hostels also benefit from close proximity to academic blocks, libraries, and campus services, allowing students easy access to college resources. Photographs and updates related to hostel life and infrastructure can be found on the official NGM College website, the college’s Instagram page (@ngmc_pollachi), and reputable education platforms such as Collegedunia.
        </p>
        <a href="https://www.ngmc.org/" target="_blank" rel="noopener noreferrer">
          <button>More about the College</button>
        </a>
      </div>
    </div>
    </>
  );
}

export default About;




