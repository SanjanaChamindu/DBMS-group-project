import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();
let pid;

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  const login = async (inputs) => {
    console.log(inputs);
    const res = await axios.post("/auth/login", inputs);
    pid = res.data.permission_level_id
    setCurrentUser(res.data);
  };

  const logout = async (inputs) => {
    console.log("logout called")
    await axios.post("/auth/logout");
    setCurrentUser(null);
  };

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(currentUser));
  }, [currentUser]);

  return (
    <AuthContext.Provider value={{ currentUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const getPermissionLevel = () => {
  return pid;
}
