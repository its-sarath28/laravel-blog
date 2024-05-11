import { useEffect, useState } from "react";
import PostItem from "../Post/PostItem";
import axios from "axios";
import Loader from "../Loader";

const BASE_URL = import.meta.env.VITE_APP_BASE_URL;

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    try {
      setIsLoading(true);
      const getPosts = async () => {
        const response = await axios.get(`${BASE_URL}/posts`);

        console.log("response: ", response.data);

        if (response.status === 200) {
          setPosts(response.data.data);
        }
      };

      getPosts();
    } catch (err) {
      console.log(`Error fetching posts: ${err}`);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return (
    <>
      {isLoading && (
        <div className="h-[90vh] flex items-center justify-center">
          <Loader size={25} color="#333" />
        </div>
      )}

      {!isLoading && (
        <div className="container">
          {posts?.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5 py-[4rem]">
              {posts.map((post) => (
                <PostItem
                  key={post.id}
                  id={post.id}
                  title={post.title}
                  description={post.description}
                  image_url={post.image_url}
                  created_at={post.created_at}
                  creator={post.user}
                />
              ))}
            </div>
          )}

          {posts?.length === 0 && (
            <div className="flex items-center justify-center h-[90vh]">
              <p className="text-[32px] font-[600]">No Posts...!</p>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default Posts;
