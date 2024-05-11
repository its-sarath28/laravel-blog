import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import axios from "axios";
import toast from "react-hot-toast";

const BASE_URL = import.meta.env.VITE_APP_BASE_URL;

const SignIn = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const { setIsLoggedIn, setRole } = useContext(UserContext);

  const navigate = useNavigate();

  const handleSignIn = async (e) => {
    e.preventDefault();

    console.log(formData);

    try {
      const response = await axios.post(`${BASE_URL}/auth/sign-in`, formData);

      if (response.status === 200) {
        const { token, role, message } = response.data;

        setIsLoggedIn(token);
        setRole(role);

        if (role === "USER") {
          navigate("/");
        } else {
          navigate("/admin/dashboard");
        }

        toast.success(message);
      }
    } catch (err) {
      console.log(err.stack);

      if (err.response && err.response.data && err.response.data.errors) {
        const { errors } = err.response.data;

        setErrors({
          email: errors.email || "",
          password: errors.password || "",
        });
      }
    } finally {
    }
  };

  return (
    <div className="h-[90vh] flex items-center justify-center">
      <div className="grid grid-cols-1 lg:grid-cols-2 max-w-[1000px] gap-[30px] place-content-center">
        <div className="">
          <h3 className="text-[36px] text-center font-[900]">Welcome back !</h3>

          <p className="text-center font-[500]">Fill in your details</p>

          <form onSubmit={handleSignIn} className="my-[15px]">
            <div className="my-[10px]">
              <input
                type="email"
                placeholder="Email"
                className="form-input"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
              />
              {errors.email && (
                <small className="text-red-600">{errors.email}</small>
              )}
            </div>

            <div className="my-[10px]">
              <input
                type="password"
                placeholder="Password"
                className="form-input"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
              />
              {errors.password && (
                <small className="text-red-600">{errors.password}</small>
              )}
            </div>

            <div className="text-center mt-[30px]">
              <button
                type="submit"
                className="bg-[#2d6ab4] text-white px-2.5 py-2 w-full lg:w-fit rounded-md "
              >
                Sign In
              </button>
            </div>
          </form>

          <div className="h-[2px] rounded bg-[#bdbdbd]"></div>

          <div className="text-center mt-[20px]">
            <p className="font-[500]">
              Don't have an account?{" "}
              <Link to={"/auth/sign-up"} className="text-[#2d6ab4]">
                Sign Up
              </Link>
            </p>
          </div>
        </div>

        <figure className="hidden lg:block">
          <div className=""></div>
          <img
            src="https://images.unsplash.com/photo-1508780709619-79562169bc64?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDN8fGJsb2d8ZW58MHx8MHx8fDA%3D"
            alt=""
            className="h-full object-cover rounded-e-md"
          />
        </figure>
      </div>
    </div>
  );
};

export default SignIn;
