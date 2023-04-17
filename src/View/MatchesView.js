import React, { useContext} from "react";
import { AuthContext } from "../contexts/AuthContext.js";
import { MatchContext } from "../contexts/MatchContext.js";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function MatchesView() {
  const { matches ,getMatches, createMatch, matchError } = useContext(MatchContext);
  const {user} = useContext(AuthContext); 
  const navigate = useNavigate();

  const handleMatch = (match) => {
    console.log(match._id);
    navigate(`/matches/${match._id}`);
    
  };
  useEffect(() => {  
    getMatches();
}, [])

 return (
    <div>
      {
        user === false && <p>Vous devez être connecté pour accéder à cette page</p>
      }
      {user !== false && 
      <div>
          <button onClick={getMatches}>Rafraichir</button>
      <button onClick={createMatch}>Créer une partie</button>
       { matchError && <p>{matchError.message}</p> }
      </div>
   
      }  
      {user !== false && matches.map(
        (match) =>
            <div key={match._id}>
              {match.user2  ? (
                    <h3>{match.user1 && match.user1.username}  VS {match.user2 && match.user2.username}</h3>
            ) : (<h3> En attente d'un adversire</h3>)}
              <button onClick={() => handleMatch(match)}>Rejoindre</button>
            </div>
    
      )} { user !== false&& matches.length === 0 && <p>Vous n'avez pas de partie</p>}
    </div>
  );
}
