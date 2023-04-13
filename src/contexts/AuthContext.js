import { createContext, useEffect, useState } from "react";
import { API_BASE_URL } from "../lib/constante";

export const AuthContext = createContext(localStorage.getItem("auth") || false);

export default function AuthProvider  ({ children })  {
  const [user, setUser] = useState(false);
  useEffect(() => {
    const token = localStorage.getItem("token");
    const id = localStorage.getItem("id");
    if (token) {
      setUserFromToken(token);
    }else if (id){
      setUser(id);
    } else {
      setUser(false);
    }
  }, []);

  function setUserFromToken(token) {
    const payload = token.split(".")[1];
    setUser(JSON.parse(atob(payload)));
  }

  async function register(username, password) {
    const response = await fetch(`${API_BASE_URL}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });
    if (response.status === 201) {
      const data = await response.json();
      setUser(data);
      localStorage.setItem("id", data._id);
    } else {
      throw new Error("Erreur lors de l'inscription");
    }
  }

  async function login(username, password) {
    const response = await fetch(`${API_BASE_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });
    if (response.status === 200) {
      const data = await response.json();
      localStorage.setItem("token", data.token);
      setUserFromToken(data.token);
    } else {
      throw new Error("Erreur lors de la connexion");
    }
  }

  async function logout() {
    setUser(false);
    localStorage.removeItem("token");
    localStorage.removeItem("id");
  }
  return (
    <AuthContext.Provider value={{user, register, login, logout}}>
      {children}
    </AuthContext.Provider>
  );
};
