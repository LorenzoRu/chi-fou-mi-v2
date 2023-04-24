import React, { useContext, useEffect, useState } from "react";
import { MatchContext } from "../contexts/MatchContext.js";
import { createMemoryRouter, useParams } from "react-router-dom";
import { API_BASE_URL } from "../lib/constante.js";
import { AuthContext } from "../contexts/AuthContext.js";
import { EventContext } from "../contexts/EventContext.js";
import Cards from "../components/Cards.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHand, faHandFist, faHandScissors } from "@fortawesome/free-solid-svg-icons";
export default function MatchView() {
  const { user } = useContext(AuthContext);
  const { getMatch ,getMatches, match } = useContext(MatchContext);
  const { id } = useParams();
  const [error, setError] = useState(null);
  const { playerMessage, turn } = useContext(EventContext);


  useEffect(() => {
    getMatch(id);
  }, [id]);
  useEffect(() => {
    getMatch(id);
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
        await response.text();
        getMatches(id);
      } else {
        const errorData = await response.json();
        const error = errorData.match || errorData.user || errorData.turn;
        throw new Error(error);
      }
    } catch (error) {
      setError(error.message);
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
        <div className="board"></div>

        <div className="game-info">
          <span>{playerMessage}</span>
          accéder
          accéder
          a
          accéder
          
        </div>
        <div className="hand">
          <Cards onClick={() => handleTurn("rock")} move={<FontAwesomeIcon icon={faHandFist} color="var(--color-secondary)"/>}/>
          <Cards onClick={() => handleTurn("paper")} move={<FontAwesomeIcon icon={faHand } color="var(--color-secondary)"/>}/>
          <Cards onClick={() => handleTurn("scissors")} move={<FontAwesomeIcon icon={faHandScissors} color="var(--color-secondary)"/>}/>
        </div>
          <p>Winner: {match.winner && match.winner.username}</p>
          <p>Turns: {match.turns && match.turns.length}</p>
          {error && <p>{error}</p>} 
        </div>
      )}
    </>
  );
}
