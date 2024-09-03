import React, { useEffect, useRef } from "react";
// import { useAuth } from "../src/store/auth";
import { useAuth } from "../hooks/aaaa";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Logout: React.FC = () => {
  const navigate = useNavigate();
  const { logoutFunc } = useAuth();
  const hasPromptedRef = useRef(false);

  const handleLogout = async () => {
    //console.log("handleLogout called");
    if (window.confirm("Are you sure you want to Logout?")) {
      try {
        await logoutFunc();
        // updateUserAdminStatus(false); // Uncomment this line if you need to update the user's admin status
        navigate("/signup");
        toast.info("Logged Out Successfully");
      } catch (error) {
        console.error("Error during logout:", error);
        toast.error("An error occurred during logout. Please try again.");
      }
    } else {
      navigate("/home");
      //console.log("Cancel is clicked.");
    }
  };

  useEffect(() => {
    if (!hasPromptedRef.current) {
      hasPromptedRef.current = true;
      handleLogout();
    }
  }, []); 

  return null; // Return null to avoid rendering anything
};

export default Logout;