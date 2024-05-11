import { useContext, useEffect, useState } from "react";
import Profile from "./Profile";
import UserPosts from "./UserPosts";
import { UserContext } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_APP_BASE_URL;

const UserDashboard = () => {
  const [profileData, setProfileData] = useState({});
  const [userPosts, setUserPosts] = useState([]);
  const [tab, setTab] = useState("posts");

  const { isLoggedIn } = useContext(UserContext);

  const token = isLoggedIn;

  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/auth/sign-in");
    }

    const getUserDeatils = async () => {
      try {
        const userResponse = await axios.get(`${BASE_URL}/users/profile`, {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (userResponse.status === 200) {
          setProfileData(userResponse.data.data);
        }
      } catch (err) {
        console.log(`Error getting user data: ${err}`);
      }
    };

    const getUserPosts = async () => {
      try {
        const postResponse = await axios.get(
          `${BASE_URL}/users/get-user-posts`,
          {
            withCredentials: true,
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (postResponse.status === 200) {
          setUserPosts(postResponse.data.data);
        }
      } catch (err) {
        console.log(`Error getting user posts: ${err}`);
      }
    };

    getUserDeatils();
    getUserPosts();
  }, [token, navigate]);

  return (
    <div className="container py-[30px]">
      <div className=" max-w-[200px] mx-auto flex justify-between mb-[20px]">
        <button
          onClick={() => setTab("posts")}
          className={`px-3.5 py-2 text-[16px] border border-[#2d6ab4] rounded ${
            tab === "posts"
              ? "text-white bg-[#2d6ab4]"
              : "text-[#2d6ab4] bg-white"
          }`}
        >
          Posts
        </button>
        <button
          onClick={() => setTab("profile")}
          className={`px-3.5 py-2 text-[16px] border border-[#2d6ab4] rounded ${
            tab === "profile"
              ? "text-white bg-[#2d6ab4]"
              : "text-[#2d6ab4] bg-white"
          }`}
        >
          Profile
        </button>
      </div>

      {tab === "posts" && <UserPosts userPosts={userPosts} />}
      {tab === "profile" && <Profile profileData={profileData} />}
    </div>
  );
};

export default UserDashboard;
