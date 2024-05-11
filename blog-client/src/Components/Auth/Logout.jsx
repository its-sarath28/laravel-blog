import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";

const Logout = () => {
  const { setIsLoggedIn, setRole } = useContext(UserContext);

  const navigate = useNavigate();

  useEffect(() => {
    setRole(null);
    setIsLoggedIn(null);

    navigate("/auth/sign-in");
  }, [navigate, setIsLoggedIn, setRole]);

  return null;
};

export default Logout;
