import React, { useContext, useEffect } from "react";
import { API_BASE_URL } from "../lib/constante.js";
import { newFetch } from "../lib/fetch.js";
import { AuthContext } from "../contexts/AuthContext.js";

export default function MatchesView() {
  const {user} = useContext(AuthContext); 
  const [matches, setMatches] = React.useState([]);
  const [error, setError] = React.useState(null);
  async function getMatches() {
    try {
      const response = await fetch(`${API_BASE_URL}/matches`, {
        method: "GET",
        newFetch
      });

      if (response.status === 200) {
        const data = await response.json();
        console.log(data);
        setMatches(data);
      } else {
        console.log(response.status);
        throw new Error("Erreur lors de la connexion");
      }
    } catch (error) {
      console.error(error);
    }
}
async function createMatch() {
  try {
    const response = await fetch(`${API_BASE_URL}/matches`, {
      method: "POST",
      newFetch
    })
    if (response.status === 201){
      const data = await response.json();
      console.log(data);
      getMatches();
    }else {
      const errorData = await response.json();
      const error = JSON.stringify(errorData);
      throw new Error(error);
    }
  } catch (error) {
    setError(error);
  }

}
  useEffect(() => {
    getMatches();
  }, []);

 return (
    <div>
      {
        user === false && <p>Vous devez être connecté pour accéder à cette page</p>
      }
      {user !== false && 
      <div>
          <button onClick={getMatches}>Rafraichir</button>
      <button onClick={createMatch}>Créer une partie</button>
       { error && <p>{error.message}</p> }
      </div>
   
      }  
      {user !== false && matches.map(
        (match) =>
            <div key={match._id}>
              {match.user2  ? (
                    <h3>{match.user1 && match.user1.username}  VS {match.user2 && match.user2.username}</h3>
            ) : (<h3> En attente d'un adversire</h3>)}
              
            </div>
    
      )} { user !== false&& matches.length === 0 && <p>Vous n'avez pas de partie</p>}
    </div>
  );
}
