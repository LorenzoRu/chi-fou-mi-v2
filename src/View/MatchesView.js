import React, { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext.js";
import { MatchContext } from "../contexts/MatchContext.js";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Button from "../components/Button.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faExclamationCircle,
  faMagnifyingGlass,
  faRotate,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";

export default function MatchesView() {
  const { matches, getMatches, createMatch, error } = useContext(MatchContext);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [displayError, setDisplayError] = React.useState(false);

  const handleMatch = (match) => {
    navigate(`/matches/${match._id}`);
  };
  useEffect(() => {
    getMatches();
  }, []);
  
  
  useEffect(() => {
    if (error) {
      setDisplayError(true);
      setTimeout(() => {
        setDisplayError(false);
      }, 5000);
    }
  }, [error])

  return (
    <div>
      {user === false && (
        <p>Vous devez être connecté pour accéder à cette page</p>
      )}
      {user !== false && (
        <div className="btn-box">
          <Button
            color={"var(--color-tertiary)"}
            text={"Actualiser"}
            startIcon={<FontAwesomeIcon icon={faRotate} />}
            onClick={getMatches}
          />
          <Button
            color={"var(--color-tertiary)"}
            text={"Rejoindre un match"}
            startIcon={<FontAwesomeIcon icon={faMagnifyingGlass} />}
            onClick={createMatch}
          />
        </div>
      )}
      <div className="items-container">
        {user !== false &&
          matches.map((match) => (
            <div key={match._id} className="items">
              {match.user2 ? (
                <h3>
                  {match.user1 && match.user1.username} VS{" "}
                  {match.user2 && match.user2.username}
                </h3>
              ) : (
                <h3> En attente d'un adversire</h3>
              )}
              <Button
                color={"var(--color-tertiary)"}
                text={"Rejoindre"}
                startIcon={<FontAwesomeIcon icon={faUsers} />}
                onClick={() => handleMatch(match)}
              />
            </div>
          ))}
        {user !== false && matches.length === 0 && (
          <p>Vous n'avez pas de partie</p>
        )}
      </div>
      <div className="error-container">
        {displayError && <div className="toast">
          <FontAwesomeIcon icon={faExclamationCircle} className="err" />
          <span >Vous êtes en recherche de partie</span></div>}
      </div>
    </div>
  );
}
