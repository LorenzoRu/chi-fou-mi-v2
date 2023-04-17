import React, { useContext, useEffect } from "react";
import { MatchContext } from "../contexts/MatchContext.js";
import { useParams } from "react-router-dom";

export default function MatchView() {
  const { getMatch, match } = useContext(MatchContext);
  const { id } = useParams();
  

useEffect(() => {
    getMatch(id);
}, []);
console.log( match.turns && match.turns.winner );

 
  return (
    <div>
      <h3>Match: {match.user1 && match.user1.username} VS {match.user2 && match.user2.username}  </h3>
      <p>Match ID: {match._id}</p>
   
    </div>
  );
}
