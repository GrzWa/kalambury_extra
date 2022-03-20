import { doc, onSnapshot } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { db } from "../Firebase/firebase";
import styles from "./styles.module.css";
import main from "../main.module.css";

export default function SpectatorGame() {
  const params = useParams();
  const [currentGame, setCurrentGame] = useState({});

  const gameDoc = doc(db, "games", params.gameID);

  useEffect(() => {
    onSnapshot(gameDoc, (snapshot) => {
      setCurrentGame(snapshot.data());
    });
  }, []);

  return (
    <>
      <div className={main.background2}>
        {currentGame?.teamPoints ? (
          <>
            <div className={styles.round}>
              <Link to="/spectate/">
                <button className={main.topback}>&lt;</button>
              </Link>
              {currentGame.currentRound > 3
                ? "THE END"
                : `Current round: ${currentGame.currentRound}`}
            </div>
            {/* --------------------------------------------------------- */}
            <div className={main.row}>
              <div className={main.column} id={main.team0}>
                {currentGame.activeTeam === 0 && currentGame.currentRound < 4
                  ? ">Team 1<"
                  : "Team 1"}
                <div id={main.points}>{currentGame.teamPoints[0]}</div>
              </div>

              {/* --------------------------------------------------------- */}
              <div className={main.column} id={main.team1}>
                {currentGame.activeTeam === 1 && currentGame.currentRound < 4
                  ? ">Team 2<"
                  : "Team 2"}
                <div id={main.points}>{currentGame.teamPoints[1]}</div>
              </div>
            </div>
          </>
        ) : (
          <div className={styles.loading}>Waiting...</div>
        )}
      </div>
    </>
  );
}
