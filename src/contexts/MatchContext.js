import { createContext, useEffect, useState } from "react";
import { API_BASE_URL } from "../lib/constante.js";
import { newFetch } from "../lib/fetch.js";

export const MatchContext = createContext();

export default function MatchProvider({ children }) {
const [matches, setMatches] = useState([]);
const [error, setError] = useState(null);
const [match, setMatch] = useState([]);
async function getMatches() {
    try {
      const response = await fetch(`${API_BASE_URL}/matches`, {
        method: "GET",
        newFetch
      });

      if (response.status === 200) {
        const data = await response.json();

        setMatches(data);
      } else {
        console.log(response.status);
        throw new Error("Erreur lors de la connexion");
      }
    } catch (error) {
      console.error(error);
    }
}

async function getMatch(_id) {
    try {
      const response = await fetch(`${API_BASE_URL}/matches/${_id}`, {
        method: "GET",
        newFetch
      });
  
      if (response.status === 200) {
        const data = await response.json();
        setMatch(data);
     

      } else {
        console.log(response.status);
        throw new Error("Erreur lors de la récupération des informations du match");
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



  return (
    <MatchContext.Provider value={{matches, getMatches, createMatch, error, getMatch, match}}>{children}</MatchContext.Provider>
  );
}