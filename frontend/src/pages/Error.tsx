import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import gsap from 'gsap';

interface ErrorProps {
  message: string;
}

const Error: React.FC<ErrorProps> = ({ message }) => {
  useEffect(() => {
    const tl = gsap.timeline({ defaults: { duration: 1, ease: 'power3.out' } });

    tl.fromTo('.error-container', { opacity: 0, scale: 0.5 }, { opacity: 1, scale: 1 })
      .fromTo('.error-title', { opacity: 0, y: -50 }, { opacity: 1, y: 0 }, '-=0.5')
      .fromTo('.nav-link', { opacity: 0, x: -100 }, { opacity: 1, x: 0, stagger: 0.2 }, '-=0.5');
  }, []);

  return (
    <div className="error-container h-[80vh] bg-black text-white p-6 text-center">
      <h1 className="error-title text-red-500 text-[8vh] mb-[8vh]">{message}</h1>
      <NavLink to="/home" className="nav-link text-white text-[5vh] mr-[5vw] no-underline">Home</NavLink>
      <NavLink to="/contact" className="nav-link text-white text-[5vh] no-underline">Contact Us</NavLink>
    </div>
  );
};

export default Error;