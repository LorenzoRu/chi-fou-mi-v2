import { EventSourcePolyfill } from "event-source-polyfill";
import { createContext, useContext, useEffect, useState } from "react";
import { API_BASE_URL } from "../lib/constante";
import { useParams } from "react-router-dom";
import { MatchContext } from "./MatchContext";

export const EventContext = createContext();

export default function EventProvider({ children }) {
  const { id } = useParams();
  const [events, setEvents] = useState([]);
  const [playerMessage, setPlayerMessage] = useState("");
  const [turn, setTurn] = useState(0);
  const { match } = useContext(MatchContext);
  useEffect(() => {
    const eventSource = new EventSourcePolyfill(
      `${API_BASE_URL}/matches/${id}/subscribe`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    eventSource.onmessage = (e) => {
      const eventData = JSON.parse(e.data);

      if (
        eventData.type === "PLAYER1_JOIN" ||
        eventData.type === "PLAYER2_JOIN"
      ) {
        setPlayerMessage(` ${eventData.payload.user} a rejoint la partie`);
      }
     
      if (eventData.type === "NEW_TURN") {
        setTurn(eventData.payload.turnId);
      }
      if (eventData.type === "PLAYER1_MOVED" || eventData.type === "PLAYER1_MOVED" ) {
        setPlayerMessage('Un joueur a joué');
      }
      if (eventData.type === "TURN_ENDED") {
        if (eventData.payload.winner === "draw") {
          setPlayerMessage(`Match nul !`);
        }else {
          const winPlayer = eventData.payload.winner === "user1" ? match.user1 &&  match.user1.username : match.user2 &&  match.user2.username ;
    setPlayerMessage(`${winPlayer} a gagné le tour ! `);
        }
        
        setTurn(eventData.payload.newTurnId);
      }

      if (eventData.type === "MATCH_ENDED") { 
        if (eventData.payload.winner === "draw") {
          setPlayerMessage(`Match nul !`);
        } else {
          setPlayerMessage(`${eventData.payload.winner} a gagné ! `);
        }
       
      }

    

      setEvents((prevEvents) => [...prevEvents, eventData]);
    };

    return () => {
      eventSource.close();
    };
    // eslint-disable-next-line
  }, [id]);

  return (
    <EventContext.Provider value={{ events, playerMessage, turn}}>
      {children}
    </EventContext.Provider>
  );
}
