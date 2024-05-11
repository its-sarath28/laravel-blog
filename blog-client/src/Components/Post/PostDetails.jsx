import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { formatDate } from "../../utils/formatData";
import DeletePost from "./DeletePost";
import { UserContext } from "../../context/UserContext";

const BASE_URL = import.meta.env.VITE_APP_BASE_URL;

const PostDetails = () => {
  const [postData, setPostData] = useState({
    title: "",
    description: "",
    image_url: "",
    created_at: "",
    user: {},
  });

  const { isLoggedIn } = useContext(UserContext);

  const token = isLoggedIn;

  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  const { postId } = useParams();

  useEffect(() => {
    const getPostDetail = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/posts/${postId}`);

        if (response.status === 200) {
          setPostData(response.data.data);
          console.log(response.data.data);
        }
      } catch (err) {
        console.log(`Error getting post detail: ${err}`);
      }
    };

    getPostDetail();
  }, []);

  const handleDeletePost = async () => {
    try {
      const response = await axios.delete(
        `${BASE_URL}/posts/${postId}/delete-post`,
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
      console.log(err);
    }
  };

  return (
    <div className="max-w-[1000px] mx-auto py-[40px]">
      <div className="bg-[#ececec] rounded-lg px-[30px] py-[40px] mx-[30px]">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-[30px]">
          <div className=" flex gap-4 justify-end order-1 sm:order-2">
            <Link
              to={`/posts/${postId}/update-post`}
              className="bg-[#2d6ab4] text-white px-2.5 py-2 rounded-md "
            >
              Edit
            </Link>
            <button
              onClick={toggleOpen}
              className="border border-1 border-solid border-red-600 px-2.5 py-1.5 rounded-md bg-red-600 text-white hover:bg-transparent hover:text-red-600"
            >
              Delete
            </button>
            <DeletePost isOpen={isOpen} toggleOpen={toggleOpen}>
              <div className="flex flex-col">
                <p className="font-[600] max-w-[300px] text-center">
                  Are you sure that you want to delete this post?
                </p>

                <div className="mt-5 flex justify-center gap-4">
                  <button className=" bg-slate-500 text-white px-3 py-2 rounded-md cursor-pointer">
                    Cancel
                  </button>
                  <button
                    onClick={handleDeletePost}
                    className="bg-red-600 text-white px-3 py-2 rounded-md cursor-pointer"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </DeletePost>
          </div>

          <div className="order-2 sm:order-1 flex flex-col">
            <p className="">
              By{" "}
              <span className="font-[500] ">
                {postData?.user && postData.user.first_name}
              </span>
            </p>
            <p>On {formatDate(postData.created_at)}</p>
          </div>
        </div>

        <figure className="h-[20rem] w-full">
          <img
            src={postData.image_url}
            alt={postData.title}
            className="w-full h-full object-fill aspect-video rounded-md"
          />
        </figure>
        <h1 className="text-2xl font-bold text-start my-[25px]">
          {postData.title}
        </h1>

        <p className="text-[18px]">{postData.description}</p>
      </div>
    </div>
  );
};

export default PostDetails;
