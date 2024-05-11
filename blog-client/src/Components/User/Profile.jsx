import { useContext, useState } from "react";
import axios from "axios";
import { UserContext } from "../../context/UserContext";
import toast from "react-hot-toast";
import Loader from "../Loader";

const BASE_URL = import.meta.env.VITE_APP_BASE_URL;

const Profile = ({ profileData }) => {
  const [editableProfileData, setEditableProfileData] = useState(profileData);
  const [errors, setErrors] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });

  const handleInputChange = (e) => {
    setEditableProfileData({
      ...editableProfileData,
      [e.target.name]: e.target.value,
    });
  };

  const [isLoading, setIsLoading] = useState(false);

  const { isLoggedIn } = useContext(UserContext);

  const token = isLoggedIn;

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    console.log(editableProfileData);

    try {
      setIsLoading(true);
      const response = await axios.put(
        `${BASE_URL}/users/update-profile`,
        editableProfileData,
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        toast.success(response.data.message);
      }
    } catch (err) {
      console.log(`Error updating profile: ${err}`);

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
    <div className="container py-[30px]">
      <form
        onSubmit={handleUpdateProfile}
        className="my-[15px] max-w-[500px] mx-auto"
      >
        <div className="my-[10px]">
          <input
            type="text"
            placeholder="First name"
            className="form-input w-full"
            name="first_name"
            value={editableProfileData.first_name}
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
            value={editableProfileData.last_name}
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
            value={editableProfileData.email}
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
            value={editableProfileData.password}
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
            value={editableProfileData.password_confirmation}
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
            {isLoading ? <Loader size={25} color="#fff" /> : `Update profile`}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Profile;
