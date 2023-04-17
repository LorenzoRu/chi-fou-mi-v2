import React, { useContext, useEffect, useState } from "react";
import { MatchContext } from "../contexts/MatchContext.js";
import { useParams } from "react-router-dom";
import { API_BASE_URL } from "../lib/constante.js";
import { newFetch } from "../lib/fetch.js";

export default function MatchView() {
  const { getMatch, match } = useContext(MatchContext);
  const { id } = useParams();
  const [error, setError] = useState(null);
  let i = 1;

  useEffect(() => {
    getMatch(id);
  }, [id]);

 async function handleRock() {
  try {
    const response = await fetch(`${API_BASE_URL}/matches/${id}/turns/${i}`, {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({
        "move": "rock",
      }),
    });
    if (response.status === 202) {
      const data = await response.text();
      console.log(data);
      i++;
      console.log(i);
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
    <div>
      <h3>
        Match: {match.user1 && match.user1.username} VS{" "}
        {match.user2 && match.user2.username}{" "}
      </h3>
      <button onClick={handleRock}>Pierre</button>
      <button>Papier</button>
      <button>Ciseaux</button>
      <p>Match ID: {match._id}</p>
      <p>Winner: {match.winner && match.winner.username}</p>
      <p>Turns: {match.turns && match.turns.length}</p>
      {error && <p>{error}</p>}
    </div>
  );
}
