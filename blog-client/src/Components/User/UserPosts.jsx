import React from "react";
import PostItem from "../Post/PostItem";

const UserPosts = ({ userPosts }) => {
  return (
    <div className="container">
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {userPosts?.length > 0 &&
          userPosts.map((post) => (
            <PostItem
              key={post.id}
              id={post.id}
              title={post.title}
              description={post.description}
              image_url={post.image_url}
              creator={post.user}
            />
          ))}
      </div>
      {userPosts.length === 0 && (
        <div className="flex items-center justify-center h-[50vh]">
          <p className="text-[32px] font-[600]">No Posts...!</p>
        </div>
      )}
    </div>
  );
};

export default UserPosts;
