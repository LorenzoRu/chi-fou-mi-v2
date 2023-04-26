import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import Login from "../components/identify/Login";
import Register from "../components/identify/Register";
import rubik from "../img/rubik.png";

export default function Identify() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [toRegister, setToRegister] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line eqeqeq
    if (user !== false) return navigate("/matches");
  }, [user, navigate]);

  if (user !== false) return <></>;

  return (
    <div style={{minHeight: "90vh"}} className="identify-container">
     <div className="form-container">
      <div className="image">
        <img src={rubik} alt="rubik" className="rubik" />
      </div>
      <div className="form">
        {toRegister === false && 
        <><h3>Se Connecter</h3>
        <Login /> 
        <p className="info">Pas encore de compte ? <span onClick={() => setToRegister(true)}>Créer en un</span></p>
        </>
        }
        {toRegister === true && 
        <><h3>S'inscrire</h3>
        <Register /> 
        <p className="info">Déjà inscrit ? <span onClick={() => setToRegister(false)}>Se connecter</span></p>
        </>
        }
        
      </div>
     </div>
    </div>
  );
}
