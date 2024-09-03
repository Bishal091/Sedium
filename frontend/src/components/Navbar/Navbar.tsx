import { useState, useEffect } from "react";
import { useAuth } from "../../hooks/aaaa";
import { NavLink, useLocation, Link } from "react-router-dom";
import navItems from "./navItems";
import { FaBars, FaTimes } from "react-icons/fa";

interface NavItem {
  title: string;
  url: string;
  icon: string;
}

interface User {
  username: string;
  isAdmin: boolean;
}

interface AuthContext {
  user: User;
  isLoggedIn: boolean;
}

const Navbar = () => {
  const { user, isLoggedIn } = useAuth() as AuthContext;
  // const { user, isLoggedIn } = {
  //   user: { username: "guest", isAdmin: false },
  //   isLoggedIn: false,
  // } as AuthContext; // Mock data for example
  const location = useLocation();
  // const [activeMenu, setActiveMenu] = useState(0);
  const [filteredNavItems, setFilteredNavItems] = useState<NavItem[]>([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    if (isLoggedIn) {
      if (user.isAdmin) {
        setFilteredNavItems(
          navItems.filter(
            (item) => item.title !== "SignUp" && item.title !== "SignIn"
          )
        );
      } else {
        setFilteredNavItems(
          navItems.filter(
            (item) =>
              item.title !== "SignIn" &&
              item.title !== "SignUp" &&
              item.title !== "Admin"
          )
        );
      }
    } else {
      setFilteredNavItems(
        navItems.filter(
          (item) =>
            item.title !== "Admin" &&
            item.title !== "Logout" &&
            item.title !== "Transfer"&&
            item.title !== "My Blogs"

        )
      );
    }
  }, [isLoggedIn]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className=" bg-[#262323] text-white flex flex-col lg:flex-row justify-between items-center lg:py-0 py-[1.5vh] p-2.5 sticky top-0 text-xl h-auto lg:h-[6.5vh] z-50">
      <div className="w-full lg:w-1/4 text-center flex justify-between lg:justify-start items-center">
        <div className="flex items-center lg:gap-[0.8vw] gap-[3vw]">
          {isLoggedIn && (
            <div className="w-10 h-10 lg:w-10 lg:h-10 rounded-full flex bg-[#2B7A78]">
              <div className="m-auto">
                {user.username ? (
                  <p className="text-[2.5vh] lg:text-[3vh] m-auto">
                    {user.username.charAt(0).toUpperCase()}
                  </p>
                ) : (
                  <p className="text-[5vh] lg:text-[6vh] m-auto">-</p>
                )}
              </div>
            </div>
          )}
          <Link
            className="text-[2.5vh] lg:text-[4vh] my-auto ml-[1vw] font-semibold tracking-widest text-[#f9fffd]"
            to="/home"
          >
            SEDIUM
          </Link>
        </div>
        <button
          className="lg:hidden text-[2vh] mr-[3vw]"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>
      <div
        className={`w-full lg:flex ${
          isMenuOpen
            ? "flex mt-[2vh] gap-[3vw] lg:gap-[4vh] justify-between px-[3vw] lg:items-end items-center border-t-2 pt-[1vh] lg:border-none"
            : "hidden lg:flex gap-[3vw] justify-end"
        }`}
      >
        {filteredNavItems.map((item, index) => (
          <NavLink
            key={index}
            to={item.url}
            className={
              location.pathname === item.url
                ? "border-b-3 border-white text-[#3AA5A9] no-underline font-semibold p-1 transition duration-300 text-[2vh] lg:text-[2.4vh] flex flex-row items-center justify-center lg:gap-[0.1vw] gap-[0.5vw]"
                : "no-underline text-[#f9fffd] font-semibold p-1 hover:text-[#3AA5A9] transition duration-200 text-[2.3vh] lg:text-[2.8vh] flex flex-row items-center justify-center lg:gap-[0.1vw] gap-[0.5vw]"
            }
            onClick={() => setIsMenuOpen(false)}
          >
            <i className={`${item.icon} text-[2vh]`}></i>
            <span> </span>
            <span className="font-josefin text-[2vh]">{item.title}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;
