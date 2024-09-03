import { Auth } from "../components/Auth";
import { ChangeEvent, useState, useEffect } from "react";
import { Quote } from "../components/Quote"
import gsap from 'gsap';

export const Signup = () => {
  useEffect(() => {
    gsap.fromTo('.auth-section', { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 1, ease: 'power3.out' });
    gsap.fromTo('.auth-form', { opacity: 0, x: -50 }, { opacity: 1, x: 0, duration: 1, delay: 0.5, ease: 'power3.out' });
  }, []);
  return (
    <div className=" h-[87vh] flex items-center justify-center text-center">
  <div className="grid grid-cols-1 lg:grid-cols-2 w-full">
    <div className="flex items-center justify-end">
      <Auth type="signup" />
    </div>
    <div className="hidden auth-section lg:flex items-center justify-start">
      <Quote />
    </div>
  </div>
</div>

  );
};
