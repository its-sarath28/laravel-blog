import { Link } from "react-router-dom";

const PostItem = ({ id, title, description, image_url, creator }) => {
  return (
    <div className="px-3 py-4 rounded border">
      <figure className="h-[12rem] w-full">
        <img
          src={image_url}
          alt={title}
          className="h-full w-full object-cover rounded"
        />
      </figure>

      <h4 className="my-[15px] text-[20px] font-semibold">{title}</h4>

      <p className="my-[15px] text-[15px]">{description}</p>

      <div className="my-[15px]">
        <p className="text-[17px]">
          By <span className="font-semibold">{creator.first_name}</span>
        </p>
      </div>

      <Link
        to={`/posts/${id}`}
        className="bg-[#2d6ab4] text-white px-2.5 py-2 rounded-md "
      >
        View
      </Link>
    </div>
  );
};

export default PostItem;
