import { EventSourcePolyfill } from "event-source-polyfill";
import { createContext, useContext, useEffect, useState } from "react";
import { API_BASE_URL } from "../lib/constante";
import { useParams } from "react-router-dom";

export const EventContext = createContext();

export default function EventProvider({ children }) {
  const { id } = useParams();
  const [events, setEvents] = useState([]);
  const [playerMessage, setPlayerMessage] = useState("");
  const [turn, setTurn] = useState(0);
  console.log(turn);
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
        console.log("player join");
        setPlayerMessage(` ${eventData.payload.user} a rejoint la partie`);
      }
     
      if (eventData.type === "NEW_TURN") {
        console.log("new turn" + eventData.payload.turnId);
        setTurn(eventData.payload.turnId);
      }
      if (eventData.type === "PLAYER1_MOVED" || eventData.type === "PLAYER1_MOVED" ) {
        console.log("player moved");
        setPlayerMessage('Votre adversaire a joué');
      }
      if (eventData.type === "TURN_ENDED") {
        console.log("turn ended");
        setPlayerMessage(`${eventData.payload.winner} a gagné le tour ! Le tour ${eventData.payload.newTurnId} commence`);
        setTurn(eventData.payload.newTurnId);
        console.log(eventData.payload.newTurnId);
      }

      setEvents((prevEvents) => [...prevEvents, eventData]);
    };

    return () => {
      eventSource.close();
    };
  }, [id]);

  return (
    <EventContext.Provider value={{ events, playerMessage, turn, }}>
      {children}
    </EventContext.Provider>
  );
}
