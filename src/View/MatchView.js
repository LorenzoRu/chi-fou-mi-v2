import React, { useContext, useEffect, useState } from "react";
import { MatchContext } from "../contexts/MatchContext.js";
import { useParams } from "react-router-dom";
import { API_BASE_URL } from "../lib/constante.js";
import { AuthContext } from "../contexts/AuthContext.js";

export default function MatchView() {
  const { user } = useContext(AuthContext);
  const { getMatch, match } = useContext(MatchContext);
  const { id } = useParams();
  const [error, setError] = useState(null);
  const turn = match.turns && match.turns.length + 1;
  console.log(turn);

  useEffect(() => {
    getMatch(id);
  }, [id]);

  async function handleRock() {
    try {
      const response = await fetch(
        `${API_BASE_URL}/matches/${id}/turns/${match.turns.length + 1}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            move: "rock",
          }),
        }
      );
      if (response.status === 202) {
        await response.text();
        getMatch(id);
      } else {
        const errorData = await response.json();
        const error = errorData.match || errorData.user || errorData.turn;
        throw new Error(error);
      }
    } catch (error) {
      setError(error.message);
    }
  }
  async function handlePaper() {
    try {
      const response = await fetch(
        `${API_BASE_URL}/matches/${id}/turns/${turn}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            move: "paper",
          }),
        }
      );
      if (response.status === 202) {
        await response.text();
        getMatch(id);
      } else {
        const errorData = await response.json();
        const error = errorData.match || errorData.user || errorData.turn;
        throw new Error(error);
      }
    } catch (error) {
      setError(error.message);
    }
  }
  async function handleScissors() {
    try {
      const response = await fetch(
        `${API_BASE_URL}/matches/${id}/turns/${turn}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            move: "scissors",
          }),
        }
      );
      if (response.status === 202) {
        await response.text();
        getMatch(id);
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
        <div>
          <h3>
            Match: {match.user1 && match.user1.username} VS{" "}
            {match.user2 && match.user2.username}{" "}
          </h3>
          <button onClick={handleRock}>Pierre</button>
          <button onClick={handlePaper}>Papier</button>
          <button onClick={handleScissors}>Ciseaux</button>
          <p>Match ID: {match._id}</p>
          <p>Winner: {match.winner && match.winner.username}</p>
          <p>Turns: {match.turns && match.turns.length}</p>
          {error && <p>{error}</p>}
        </div>
      )}
    </>
  );
}
