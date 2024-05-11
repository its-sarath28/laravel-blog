import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CiMenuFries } from "react-icons/ci";
import { IoMdClose } from "react-icons/io";
import { UserContext } from "../context/UserContext";

const Navbar = () => {
  const [toggleMenu, setToggleMenu] = useState(false);

  const handleToggle = () => {
    setToggleMenu(!toggleMenu);
  };

  const { isLoggedIn } = useContext(UserContext);

  const token = isLoggedIn;

  useEffect(() => {
    const handleScroll = () => {
      const navbar = document.getElementById("navbar");
      if (navbar) {
        if (window.scrollY > 80) {
          navbar.classList.add("sticky-navbar");
        } else {
          navbar.classList.remove("sticky-navbar");
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      id="navbar"
      className="h-[10vh] px-[10px] md:px-[30px] mx-auto flex w-full items-center justify-between bg-white"
    >
      <Link to={"/"}>Blogiee</Link>

      {/* Desktop Links */}
      <div className="hidden md:flex items-center gap-4">
        <Link to={"/"}>Home</Link>
        {token && <Link to={"/posts/create-post"}>Add post</Link>}
        {token && <Link to={"/users/profile"}>Profile</Link>}
        {token ? (
          <Link
            to={"/auth/logout"}
            className="bg-[#333] p-3 text-white rounded"
          >
            Logout
          </Link>
        ) : (
          <Link
            to={"/auth/sign-in"}
            className="bg-[#2d6ab4] p-3 text-white rounded"
          >
            Sign in
          </Link>
        )}
      </div>

      {/* Toggle Button */}
      <button onClick={handleToggle} className="md:hidden z-20">
        {/* {toggleMenu ? ( */}
        {/* <IoMdClose className="text-[22px]" /> */}
        {/* ) : ( */}
        <CiMenuFries className="text-[22px]" />
        {/* )} */}
      </button>

      {/* Fullscreen Mobile Menu */}
      {toggleMenu && (
        <div className="fixed inset-0 bg-white/75 flex flex-col items-center justify-center z-50">
          <button onClick={handleToggle} className="absolute top-5 right-5">
            <IoMdClose className="text-[22px]" />
          </button>
          <Link to={"/"} onClick={handleToggle} className="p-4 text-lg">
            Home
          </Link>
          {token && (
            <Link
              to={"/posts/create-post"}
              onClick={handleToggle}
              className="p-4 text-lg"
            >
              Add post
            </Link>
          )}
          <Link
            to={"/auth/logout"}
            onClick={handleToggle}
            className="p-4 text-lg"
          >
            Logout
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
