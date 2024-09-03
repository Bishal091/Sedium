import React, { useState, useEffect } from 'react';
import { useAuth } from '../hooks/aaaa';
import { toast } from 'react-toastify';
import { FaGithub, FaLinkedinIn, FaTwitter } from 'react-icons/fa';
import gsap from 'gsap';
import { BACKEND_URL } from '../config';

// Import CSS for react-toastify
import 'react-toastify/dist/ReactToastify.css';

interface ContactForm {
  username: string;
  email: string;
  content: string;
}

const Contact: React.FC = () => {
  const [contact, setContact] = useState<ContactForm>({
    username: '',
    email: '',
    content: ''
  });
  const [loading, setLoading] = useState<boolean>(false);
  const { user } = useAuth();
  console.log("User data:", user); // This user has all the data of the user
  const [userDataClient, setUserDataClient] = useState<boolean>(true);

  useEffect(() => {
    // Fetch user data only once on component mount
    if (userDataClient && user) {
      console.log("User data:", user); // Debugging log
      setContact({
        username: user.username || '', // Provide a default value
        email: user.email || '', // Provide a default value
        content: ""
      });
  
      // setUserDataClient(false);
    }
    gsap.fromTo('.contact-section', { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 1, ease: 'power3.out' });
    gsap.fromTo('.contact-form', { opacity: 0, x: -50 }, { opacity: 1, x: 0, duration: 1, delay: 0.5, ease: 'power3.out' });
    gsap.fromTo('.contact-info', { opacity: 0, x: 50 }, { opacity: 1, x: 0, duration: 1, delay: 0.5, ease: 'power3.out' });
    gsap.fromTo('.social-icon', { opacity: 0, scale: 0 }, { opacity: 1, scale: 1, duration: 0.5, stagger: 0.2, delay: 1, ease: 'back.out(1.7)' });
  }, [user, userDataClient]);
  // GSAP animations

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const name = e.target.name;
    const value = e.target.value;

    setContact({
      ...contact,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch(`${BACKEND_URL}/sedium/message`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(contact),
      });

      const data = await response.json(); // Get the response data
      if (response.ok) {
        toast.success(data.message || 'Message sent successfully!');
        setContact({
          username: user.username || '', // Provide a default value
          email: user.email || '', // Provide a default value
          content: ""
        });
        setLoading(false);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error('An unexpected error occurred');
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="contact-section bg-gradient-to-br from-gray-600 to-gray-800 bg-[length:200%_200%] animate-gradient-x min-h-screen flex items-start lg:items-center justify-center p-4 sm:p-6 md:p-8 mt-[5vh] lg:mt-0">
      <div className="w-full lg:max-w-6xl max-w-[90vw] mx-auto bg-neutral-800 rounded-2xl h-auto shadow-2xl overflow-hidden">
        <div className="flex flex-col lg:flex-row h-full">
          <div className="contact-info lg:w-2/5 bg-gradient-to-r from-green-500 to-[#409DB9] bg-[length:200%_200%] animate-gradient-x p-6 sm:p-8 flex flex-col justify-between">
            <div className="text-center lg:text-left">
              <h2 className="text-[4vh] sm:text-[4vh] text-white mb-4">Contact Me</h2>
              <p className="text-[2vh] sm:text-[2.2vh] text-white mb-8 italic">
                I'd love to hear from you! Please fill out the form, and I'll be glad to receive your comments.
              </p>
            </div>
            <div className="flex items-center justify-center lg:justify-start space-x-6">
              <a
                href="https://github.com/Bishal091/Graytm"
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon text-white hover:text-gray-300 transition-colors duration-300"
              >
                <FaGithub className="text-[3vh] sm:text-[4vh]" />
              </a>
              <a
                href="https://twitter.com/Bishal234113"
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon text-white hover:text-gray-300 transition-colors duration-300"
              >
                <FaTwitter className="text-[3vh] sm:text-[4vh]" />
              </a>
              <a
                href="https://www.linkedin.com/in/bishal-singh-797129203/"
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon text-white hover:text-gray-300 transition-colors duration-300"
              >
                <FaLinkedinIn className="text-[3vh] sm:text-[4vh]" />
              </a>
            </div>
          </div>
          <div className="contact-form lg:w-3/5 p-6 sm:p-8">
            <form onSubmit={handleSubmit} className="space-y-6 items-stretch flex flex-col">
              <div>
                <label htmlFor="username" className="block text-white mb-2 lg:text-[1.8vh] text-[2.5vh]">
                  Username
                </label>
                <input
                  type="text"
                  placeholder="Your username"
                  id="username"
                  name="username"
                  required
                  autoComplete="off"
                  onChange={handleChange}
                  value={contact.username}
                  className="w-full px-4 py-3 rounded-lg border border-gray-600 bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-green-500 lg:text-[1.8vh] text-[2.5vh]"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-white mb-2 lg:text-[1.8vh] text-[2.5vh]">
                  E-Mail
                </label>
                <input
                  type="email"
                  placeholder="Your email"
                  id="email"
                  name="email"
                  required
                  autoComplete="off"
                  onChange={handleChange}
                  value={contact.email}
                  className="w-full px-4 py-3 rounded-lg border border-gray-600 bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-green-500 lg:text-[1.8vh] text-[2.5vh]"
                />
              </div>
              <div>
                <label htmlFor="content" className="block text-white mb-2 lg:text-[1.8vh] text-[2.5vh]">
                  Message
                </label>
                <textarea
                  placeholder="Your message"
                  autoComplete="off"
                  id="content"
                  name="content"
                  required
                  onChange={handleChange}
                  value={contact.content}
                  className="w-full px-4 py-3 h-[20vh] rounded-lg border border-gray-600 bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-green-500 lg:text-[1.8vh] text-[2.5vh]"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-green-500 to-[#409DB9] text-white px-6 py-3 rounded-lg hover:from-green-600 hover:to-[#3A8DA5] transition-all duration-300 text-[2.2vh]"
              >
                {loading ? (
                  <div className="flex items-center justify-center space-x-2">
                    <span>Sending Message...</span>
                    <svg className="animate-spin lg:h-[1.8vh] lg:w-[1.8vh] h-[2.2vh] w-[2.2vh] text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.96 7.96 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  </div>
                ) : (
                  'Send Message'
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;