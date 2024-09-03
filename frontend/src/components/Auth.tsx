import { ChangeEvent, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { SignupInput } from "@boss109/sedium-common";
import { useAuth } from "../hooks/aaaa"; // Adjust the import path accordingly
import { toast } from 'react-toastify';
import gsap from 'gsap';

// Import CSS for react-toastify
import 'react-toastify/dist/ReactToastify.css';

export const Auth = ({ type }: { type: "signup" | "signin" }) => {
  const navigate = useNavigate();
  const { signup, signin } = useAuth();
  const [postInputs, setPostInputs] = useState<SignupInput>({
    email: "",
    username: "",
    password: "",
  });

  useEffect(() => {
    gsap.fromTo('.auth-section', { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 1, ease: 'power3.out' });
    gsap.fromTo('.auth-form', { opacity: 0, x: -50 }, { opacity: 1, x: 0, duration: 1, delay: 0.5, ease: 'power3.out' });
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      if (type === "signup") {
        signup(postInputs);
        toast.success('Sign up successful!');
      } else {
       signin(postInputs);
        toast.success('Sign in successful!');
      }
      navigate("/home");
    } catch (error) {
      toast.error('An error occurred. Please try again.');
      console.error("Error:", error);
    }
  }

  return (
    <div className="auth-section h-[70vh] bg-slate-700 flex justify-center flex-col w-[80%] text-white rounded-l-md">
      <div className="flex justify-center">
        <div>
          <div className="px-20">
            <div className="text-3xl font-bold">{type === "signup"?`Create an account`:`Login into your Account`  }</div>
          </div>
          <div className="flex flex-col">
            <form className="auth-form pt-8 flex flex-col gap-[1vh]" onSubmit={handleSubmit}>
              {type === "signup" && (
                <LabelledInput
                  label="Username"
                  placeholder="boss123"
                  onChange={(e) => {
                    setPostInputs({
                      ...postInputs,
                      username: e.target.value,
                    });
                  }}
                />
              )}
              <LabelledInput
                label="Email"
                placeholder="abcd@gmail.com"
                type="email"
                onChange={(e) => {
                  setPostInputs({
                    ...postInputs,
                    email: e.target.value,
                  });
                }}
               
              />
              <LabelledInput
                label="Password"
                type="password"
                placeholder="123456"
                onChange={(e) => {
                  setPostInputs({
                    ...postInputs,
                    password: e.target.value,
                  });
                }}
              />
              <button
                type="submit"
                className="mt-8  text-white bg-gray-800 hover:bg-[#3AA5A9] focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5  mb-2 dark:bg-gray-800 dark:hover:bg-[#3AA5A9] dark:focus:ring-gray-700 dark:border-gray-700 w-[50%] mx-auto"
              >
                {type === "signup" ? "Sign up" : "Sign in"}
              </button>
            </form>
          </div>
          <div className="text-slate-300 font-medium">
            {type === "signin"
              ? "Don't have an account?"
              : "Already have an account?"}
            <Link
              className="pl-2 underline text-gray-400 font-semibold hover:text-[#3AA5A9]"
              to={type === "signin" ? "/signup" : "/signin"}
            >
              {type === "signin" ? "Sign up" : "Sign in"}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

interface LabelledInputType {
  label: string;
  placeholder: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  type?: string;
}

function LabelledInput({
  label,
  placeholder,
  onChange,
  type,
}: LabelledInputType) {
  return (
    <div>
      <label className="block mb-2 text-lg text-slate-300 font-semibold pt-4">
        {label}
      </label>
      <input
        onChange={onChange}
        type={type || "text"}
        id="first_name"
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-[#3AA5A9] block p-2.5 w-[80%] mx-auto"
        placeholder={placeholder}
        required
      />
    </div>
  );
}