import { createContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState(null);

  useEffect(() => {
    checkUserLoggedIn();
  }, []);

  const checkUserLoggedIn = async () => {
    const token = localStorage.getItem("token");

    try {
      const res = await fetch(`https://instant-gram-backend.onrender.com/me`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const result = await res.json();

      if (!result.error) {
        if (
          location.pathname === "/login" ||
          location.pathname === "/register"
        ) {
          navigate("/");
          setUser(result);
        } else {
          navigate(location.pathname ? location.pathname : "/");
          setUser(result);
        }
      } else {
        if (
          location.pathname === "/forgot-password" ||
          location.pathname === "/register" ||
          location.pathname.includes("/reset-password")
        ) {
          navigate(location.pathname, { replace: true });
        } else {
          navigate("/login", { replace: true });
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
