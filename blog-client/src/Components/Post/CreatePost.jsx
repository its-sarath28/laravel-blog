import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const BASE_URL = import.meta.env.VITE_APP_BASE_URL;

const CreatePost = () => {
  const [postData, setPostData] = useState({
    title: "",
    image_url: "",
    description: "",
  });

  const handleInputChange = (e) => {
    setPostData({ ...postData, [e.target.name]: e.target.value });
  };

  const { isLoggedIn } = useContext(UserContext);

  const token = isLoggedIn;

  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/auth/sign-in");
    }
  }, [token, navigate]);

  const handleAddPost = async (e) => {
    e.preventDefault();

    console.log(postData);

    try {
      const response = await axios.post(
        `${BASE_URL}/posts/create-post`,
        postData,
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        navigate("/");
        toast.success(response.data.message);
      }
    } catch (err) {
      console.log(`Error adding post: ${err}`);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center h-[90vh]">
      <h1 className="text-[28px] font-[600]">Create Post</h1>
      <form onSubmit={handleAddPost} className="w-full max-w-[800px] p-5">
        <div className="mb-3">
          <input
            type="text"
            name="title"
            placeholder="Title"
            className="form-input w-full"
            value={postData.title}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-3">
          <input
            type="url"
            name="image_url"
            placeholder="Image URL"
            className="form-input w-full"
            value={postData.imageURL}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <textarea
            name="description"
            rows={5}
            className="form-input w-full"
            placeholder="Description"
            value={postData.description}
            onChange={handleInputChange}
          >
            {postData.description}
          </textarea>
        </div>
        <div className="text-center mt-5">
          <button
            type="submit"
            className="bg-[#2d6ab4] text-white px-2.5 py-2 rounded-md "
          >
            Add Post
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreatePost;
