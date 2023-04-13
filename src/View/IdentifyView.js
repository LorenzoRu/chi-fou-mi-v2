import React, { useContext, useEffect } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import Login from "../components/identify/Login";
import Register from "../components/identify/Register";

export default function Identify() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    // eslint-disable-next-line eqeqeq
    if (user !== false) return navigate("/");
  }, [user, navigate]);

  if (user !== false) return <></>;

  return (
    <div>
      <h2>Identify</h2>
      <h3>Se connecter</h3>
      <Login />
      <h3>S'inscrire</h3>
      <Register />
    </div>
  );
}
