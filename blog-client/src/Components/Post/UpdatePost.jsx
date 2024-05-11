import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/UserContext";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import Loader from "../Loader";

const BASE_URL = import.meta.env.VITE_APP_BASE_URL;

const UpdatePost = () => {
  const [postData, setPostData] = useState({
    title: "",
    description: "",
    image_url: "",
    created_at: "",
    user: {},
  });

  const handleInputChange = (e) => {
    setPostData({ ...postData, [e.target.name]: e.target.value });
  };

  const [pageLoading, setPageLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { postId } = useParams();

  const { isLoggedIn } = useContext(UserContext);

  const token = isLoggedIn;

  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/auth/sign-in");
    }

    const getPostDetail = async () => {
      try {
        setPageLoading(true);
        const response = await axios.get(`${BASE_URL}/posts/${postId}`);

        if (response.status === 200) {
          setPostData(response.data.data);
          console.log(response.data.data);
        }
      } catch (err) {
        console.log(`Error getting post detail: ${err}`);
      } finally {
        setPageLoading(false);
      }
    };

    getPostDetail();
  }, [token, navigate]);

  const updatePostHandler = async (e) => {
    e.preventDefault();

    try {
      setIsLoading(true);
      const response = await axios.put(
        `${BASE_URL}/posts/${postId}/update-post`,
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
      console.log(`Error updating post: ${err}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {pageLoading && (
        <div className="flex justify-center items-center h-[90vh]">
          <Loader size={25} color="#333" />
        </div>
      )}

      {!pageLoading && (
        <div className="flex flex-col justify-center items-center h-[90vh]">
          <h1 className="text-[28px] font-[600]">Update Post</h1>
          <form
            onSubmit={updatePostHandler}
            className="w-full max-w-[800px] p-5"
          >
            <div className="mb-3">
              <input
                type="text"
                placeholder="Title"
                className="form-input w-full"
                name="title"
                value={postData.title}
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-3">
              <input
                type="url"
                placeholder="Image URL"
                className="form-input w-full"
                name="image_url"
                value={postData.image_url}
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
                className="bg-[#2d6ab4] text-white px-2.5 py-2 w-full lg:w-fit rounded-md "
                disabled={isLoading}
              >
                {isLoading ? <Loader size={25} color="#fff" /> : `Update post`}
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default UpdatePost;
