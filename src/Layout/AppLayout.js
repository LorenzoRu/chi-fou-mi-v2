import React, { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { Link, Outlet } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHandScissors, faHouse, faPlugCircleXmark, faUser } from "@fortawesome/free-solid-svg-icons";
import Buttons from "../components/Buttons";



export default function AppLayout() {
  const { user, logout } = useContext(AuthContext);
  return (
    <div>
      <nav className="navbar-desktop">
        <div className="links">
        <Link to="/"><FontAwesomeIcon icon={faHouse} className="nav-icon"/>Home</Link>
        <Link to="/matches"><FontAwesomeIcon icon={faHandScissors } className="nav-icon"/>Jouer</Link>
        {!user && <Link to="/identify"><FontAwesomeIcon icon={faUser} className="nav-icon"/>Login</Link>}
        </div>
        {user && <Buttons text={"Se déconnecter"} onClick={logout} color={"var(--color-tertiary)"} startIcon={<FontAwesomeIcon icon={faPlugCircleXmark}/>}/>}
      </nav>
      <Outlet />
    </div>
  );
}
