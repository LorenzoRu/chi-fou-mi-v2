import React from "react";

import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

export default function WinnerModal({ winner,text }) {
  const navigate = useNavigate();
  return (
    <div className="modal-container">
      <div className="modal-details">
        <FontAwesomeIcon
          className="return"
          icon={faArrowLeft}
          onClick={() => navigate("/matches")}
        />
        <h3>Partie terminée</h3>
        <div className="modal-body">
          <p className="winner">
            <span className="winner-name">{winner}</span> {text}{" "}
          </p>
          <button className="btn-modal" onClick={() => navigate("/matches")}>Nouvelle partie</button>
        </div>
      </div>
    </div>
  );
}
