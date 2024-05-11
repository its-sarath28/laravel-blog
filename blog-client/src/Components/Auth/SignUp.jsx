import axios from "axios";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import toast from "react-hot-toast";
import Loader from "../Loader";

const BASE_URL = import.meta.env.VITE_APP_BASE_URL;

const SignUp = () => {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });

  const [errors, setErrors] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const { setIsLoggedIn, setRole, setUserId } = useContext(UserContext);

  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();

    console.log(formData);

    try {
      setIsLoading(true);
      const response = await axios.post(`${BASE_URL}/auth/sign-up`, formData);

      if (response.status === 200) {
        const { token, role, userId, message } = response.data;

        setIsLoggedIn(token);
        setRole(role);
        setUserId(userId);

        navigate("/");

        toast.success(message);
      }
    } catch (err) {
      console.log(err.stack);

      if (err.response && err.response.data && err.response.data.errors) {
        const { errors } = err.response.data;

        setErrors({
          first_name: errors.first_name || "",
          last_name: errors.last_name || "",
          email: errors.email || "",
          password: errors.password || "",
          password_confirmation: errors.password_confirmation || "",
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-[90vh] flex items-center justify-center">
      <div className="grid grid-cols-1 lg:grid-cols-2 max-w-[1000px] gap-[30px] place-content-center">
        <figure className="hidden lg:block">
          <div className=""></div>
          <img
            src="https://images.unsplash.com/photo-1522199755839-a2bacb67c546?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGJsb2d8ZW58MHx8MHx8fDA%3D"
            alt=""
            className="h-full object-cover rounded-s-md"
          />
        </figure>

        <div>
          <h3 className="text-[36px] text-center font-[900]">
            Getting Started
          </h3>

          <p className="text-center font-[500]">Fill in your details</p>

          <form onSubmit={handleSignUp} className="my-[15px]">
            <div className="my-[10px]">
              <input
                type="text"
                placeholder="First name"
                className="form-input"
                name="first_name"
                value={formData.first_name}
                onChange={handleInputChange}
              />
              {errors.first_name && (
                <small className="text-red-600">{errors.first_name}</small>
              )}
            </div>

            <div className="my-[10px]">
              <input
                type="text"
                placeholder="Last name"
                className="form-input"
                name="last_name"
                value={formData.last_name}
                onChange={handleInputChange}
              />
              {errors.last_name && (
                <small className="text-red-600">{errors.last_name}</small>
              )}
            </div>

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

            <div className="my-[10px]">
              <input
                type="password"
                placeholder="Confirm password"
                className="form-input"
                name="password_confirmation"
                value={formData.password_confirmation}
                onChange={handleInputChange}
              />
              {errors.password_confirmation && (
                <small className="text-red-600">
                  {errors.password_confirmation}
                </small>
              )}
            </div>

            <div className="text-center mt-[30px]">
              <button
                type="submit"
                className="bg-[#2d6ab4] text-white px-2.5 py-2 w-full lg:w-fit rounded-md "
                disabled={isLoading}
              >
                {isLoading ? <Loader size={25} color="#fff" /> : `Sign Up`}
              </button>
            </div>
          </form>

          <div className="h-[2px] rounded bg-[#bdbdbd]"></div>

          <div className="text-center mt-[20px]">
            <p className="font-[500]">
              Already have an account?{" "}
              <Link to={"/auth/sign-in"} className="text-[#2d6ab4]">
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
