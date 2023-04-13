import React, { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { Link, Outlet } from "react-router-dom";

export default function AppLayout() {
  const { user, logout } = useContext(AuthContext);
  return (
    <div>
      AppLayout
      <br />
      <Link to="/">Home</Link> {' '}
      {!user && <Link to="/identify">Login</Link>}{' '}
      <Link to="/matches">Jouer</Link>{' '}
      {user && <button onClick={logout}>Logout</button>}
      <Outlet />
    </div>
  );
}
