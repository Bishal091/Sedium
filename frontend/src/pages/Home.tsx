import { FaPlus, FaArrowUp } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { Blogs } from "./Blogs";
import gsap from "gsap";
import { useEffect, useRef, useState } from "react";
import { useAuth } from "../hooks/aaaa";

interface AuthContext {
  isLoggedIn: boolean;
}

const Home = () => {
  const createPostButtonRef = useRef<HTMLButtonElement | null>(null);
  const { isLoggedIn } = useAuth() as AuthContext;
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    gsap.from(createPostButtonRef.current, {
      opacity: 1, // Keep opacity constant
      y: 50,
      duration: 1,
      ease: "power3.in",
    });

    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);

    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      <div className="p-2">
        {isLoggedIn && (
          <div className="text-right mr-[3vw] my-[2vh]">
            <Link to={`/publish`}>
              <button
                ref={createPostButtonRef}
                type="button"
                className="fixed top-4 right-4 flex items-center text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-[2vh]  md:py-1.5 text-center md:px-4 md:me-2  transition-all duration-300 shadow-md hover:shadow-lg"
              >
                <span className="hidden md:inline">Create New Post</span>
                <FaPlus className="inline size-8 md:size-5 bg-black rounded-full md:mb-1 md:p-[0.1rem] md:ml-2" />
              </button>
            </Link>
          </div>
        )}

        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Welcome to Sedium</h1>
          <p className="text-xl text-gray-600">Discover insightful stories, ideas, and perspectives from writers around the world.</p>
        </div>

        <div className="relative">
          <Blogs />
        </div>

        {isVisible && (
          <button
            onClick={scrollToTop}
            className="fixed bottom-4 right-4 text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-[2vh] px-4 py-1.5 text-center me-2 transition-all duration-300 shadow-md hover:shadow-lg"
          >
            <FaArrowUp className="inline size-5" />
          </button>
        )}
      </div>
    </>
  );
};

export default Home;
