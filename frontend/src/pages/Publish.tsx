import axios from "axios";
import { BACKEND_URL } from "../config";
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import { ChangeEvent, useState, useEffect } from "react";
import { toast } from 'react-toastify';
import gsap from 'gsap';
import 'react-toastify/dist/ReactToastify.css';
import withAuth from "../hooks/hoc";

const Publish = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    gsap.fromTo('.publish-section', { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 1, ease: 'power3.out' });
    gsap.fromTo('.publish-form', { opacity: 0, x: -50 }, { opacity: 1, x: 0, duration: 1, delay: 0.5, ease: 'power3.out' });
  }, []);

  useEffect(() => {
    setIsFormValid(title.trim() !== "" && description.trim() !== "");
  }, [title, description]);

  const handlePublish = async () => {
    try {
      const response = await axios.post(`${BACKEND_URL}/blog/create`, {
        title,
        content: description
      }, {
        headers: {
          Authorization: localStorage.getItem("token")
        }
      });
      toast.success('Post published successfully!');
      navigate(`/blog/${response.data.id}`);
    } catch (error) {
      toast.error('An error occurred. Please try again.');
      console.error("Error:", error);
    }
  };

  return (
    <div className=" h-[100vh]">
      {/* <Appbar /> */}
      <button 
                onClick={() => navigate(-1)} 
                className="absolute top-24 left-10 p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors shadow-lg z-10"
            >
                <FaArrowLeft className="text-gray-700 text-xl" />
            </button>
      <div className="publish-section flex justify-center  text-center w-full pt-8 lg:w-[50%] mx-auto ">
        <div className="max-w-screen-lg w-full publish-form my-auto">
          <input
            onChange={(e) => setTitle(e.target.value)}
            type="text"
            className="w-full mb-4 bg-gray-50 border border-gray-500 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
            placeholder="Title"
          />
          <TextEditor onChange={(e) => setDescription(e.target.value)} />
          <button
            onClick={handlePublish}
            type="submit"
            disabled={!isFormValid}
            className="mt-4 inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Publish post
          </button>
        </div>
      </div>
    </div>
  );
};

export default withAuth(Publish);

function TextEditor({ onChange }: { onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void }) {
  return (
    <div className="mt-2">
      <div className="w-full mb-4">
        <div className="flex items-center justify-between border border-gray-600 rounded-lg">
          <div className="my-2 bg-white rounded-b-lg w-full">
            <label className="sr-only">Publish post</label>
            <textarea
              onChange={onChange}
              id="editor"
              rows={8}
              className="focus:outline-none block w-full px-0 text-sm text-gray-800 bg-white border-0 pl-2"
              placeholder="Write an article..."
              required
            />
          </div>
        </div>
      </div>
    </div>
  );
}