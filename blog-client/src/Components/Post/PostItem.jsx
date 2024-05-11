import { Link } from "react-router-dom";
import { formatDate } from "../../utils/formatData";

const truncateContent = (content, maxLength) => {
  if (content.length > maxLength) {
    return content.substring(0, maxLength) + "...";
  }
  return content;
};

const PostItem = ({
  id,
  title,
  description,
  created_at,
  image_url,
  creator,
}) => {
  return (
    <div className="px-3 py-4 rounded">
      <figure className="h-[12rem] w-full">
        <img
          src={image_url}
          alt={title}
          className="h-full w-full object-cover rounded"
        />
      </figure>

      <h4 className="my-[15px] text-[20px] font-[700]">
        {truncateContent(title, 30)}
      </h4>

      <p className="my-[15px] text-[15px]">
        {truncateContent(description, 100)}
      </p>

      <div className="flex justify-between items-center my-[15px]">
        <p className="flex flex-col">
          <span>
            By <span className="font-semibold">{creator.first_name}</span>
          </span>

          <span>{formatDate(created_at)}</span>
        </p>

        <Link
          to={`/posts/${id}`}
          className="bg-[#2d6ab4] text-white px-2.5 py-2 rounded-md "
        >
          View
        </Link>
      </div>
    </div>
  );
};

export default PostItem;
