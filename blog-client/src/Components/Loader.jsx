import HashLoader from "react-spinners/HashLoader";

const Loader = ({ size, color }) => {
  return (
    <div className="flex justify-center items-center">
      <HashLoader size={size} color={color} />
    </div>
  );
};

export default Loader;
