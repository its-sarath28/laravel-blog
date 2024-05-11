import { createContext, useEffect, useState } from "react";

export const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(
    JSON.parse(localStorage.getItem("token"))
  );
  const [role, setRole] = useState(JSON.parse(localStorage.getItem("role")));
  const [userId, setUserId] = useState(
    JSON.parse(localStorage.getItem("userId"))
  );

  useEffect(() => {
    localStorage.setItem("token", JSON.stringify(isLoggedIn));
    localStorage.setItem("role", JSON.stringify(role));
    localStorage.setItem("userId", JSON.stringify(userId));
  }, [isLoggedIn, role]);

  return (
    <UserContext.Provider
      value={{ isLoggedIn, setIsLoggedIn, role, setRole, userId, setUserId }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
