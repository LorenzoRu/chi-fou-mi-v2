import React, { useContext, useEffect, useState } from "react";
import { MatchContext } from "../contexts/MatchContext.js";
import {  useParams } from "react-router-dom";
import { API_BASE_URL } from "../lib/constante.js";
import { AuthContext } from "../contexts/AuthContext.js";
import { EventContext } from "../contexts/EventContext.js";
import Cards from "../components/Cards.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faExclamationCircle,
  faHand,
  faHandFist,
  faHandScissors,
} from "@fortawesome/free-solid-svg-icons";
import WinnerModal from "../components/WinnerModal.js";
export default function MatchView() {
  const { user } = useContext(AuthContext);
  const { getMatch, match} = useContext(MatchContext);
  const { id } = useParams();
  const [error, setError] = useState(null);
  const { playerMessage, turn } = useContext(EventContext);
  const [showMessage, setShowMessage] = useState(true);


  useEffect(() => {
    getMatch(id);
     // eslint-disable-next-line
  }, [id]);
  useEffect(() => {
    getMatch(id);
     
     setShowMessage(true); 
     const timeoutId = setTimeout(() => {
       setShowMessage(false); 
     }, 10000);
     return () => clearTimeout(timeoutId);
     // eslint-disable-next-line
  }, [turn]);



  async function handleTurn(move) {
    try {
      const response = await fetch(
        `${API_BASE_URL}/matches/${id}/turns/${match.turns.length + 1}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            move,
          }),
        }
      );
   
      if (response.status === 202) {

      } else {
        const errorData = await response.json();
        const error = errorData.match || errorData.user || errorData.turn;
        throw new Error(error);
      }
    } catch (error) {
      setError(error.message); 
        const timeoutId = setTimeout(() => {
        setError(null); 
      }, 5000);
      return () => clearTimeout(timeoutId);
    }
  }

  return (
    <>
      {user === false && (
        <p>Vous devez être connecté pour accéder à cette page</p>
      )}
      {user !== false && (
        <div className="game-container">
          {match.user2 ? (
            <h3>
              {match.user1 && match.user1.username} VS{" "}
              {match.user2 && match.user2.username}
            </h3>
          ) : (
            <h3>Recherche d'adversaire</h3>
          )}
          <div className="board">
            <div className="cards-content">
              <Cards bgColor="var(--color-tertiary)" />
              <Cards bgColor="var(--color-tertiary)"/>
            </div> 
            <div className="game-info">
            <span className="turn-display">Manche : {match.turns && match.turns.length}</span>
            {showMessage && <span className="live-msg">{playerMessage}</span>}
            {error && <p className="error"><FontAwesomeIcon icon={faExclamationCircle} className="err" />{error}</p>}
          </div>
          </div>

         
          <div className="hand">
            <Cards
              onClick={() => handleTurn("rock")}
              move={
                <FontAwesomeIcon
                  icon={faHandFist}
                  color="var(--color-secondary)"
                />
              }
              card="card"
              border={"6px solid var(--color-secondary)"}
            />
            <Cards
              onClick={() => handleTurn("paper")}
              move={
                <FontAwesomeIcon icon={faHand} color="var(--color-secondary)" />
              }
              card="card"
              border={"6px solid var(--color-secondary)"}
            />
            <Cards
              onClick={() => handleTurn("scissors")}
              move={
                <FontAwesomeIcon
                  icon={faHandScissors}
                  color="var(--color-secondary)"
                />
              }
              card="card"
              border={"6px solid var(--color-secondary)"}
            />
          </div>
          {match.winner  && <WinnerModal text={"remporte la victoire"} winner={match.winner && match.winner.username} />}
          {match.winner === null   && <WinnerModal  winner={"Draw"} />}
        

        </div>
      )}
    </>
  );
}
