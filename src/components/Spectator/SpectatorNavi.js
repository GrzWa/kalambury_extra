import React, { useEffect, useState } from "react";
import { getDocs, collection, onSnapshot } from "firebase/firestore";
import { db } from "../Firebase/firebase";
import { Link } from "react-router-dom";
import styles from "./styles.module.css";
import gstyles from "../gstyles.module.css";

export default function SpectatorNavi() {
  const [allGames, setAllGames] = useState({});

  const gamesCollectionRef = collection(db, "games");

  useEffect(() => {
    const unsubscribe = onSnapshot(gamesCollectionRef, (snapshot) => {
      let tempGame;
      snapshot.docs.forEach((doc) => {
        let tempID = doc.id;
        let tempData = { ...doc.data() };
        tempGame = { ...tempGame, [tempID]: tempData };
        setAllGames(tempGame);
      });
    });
    return () => unsubscribe();
  }, []);

  return (
    <>
      <div className={gstyles.background2}>
        <div className={styles.topblur}>
          <Link to="/">
            <button className={gstyles.topback}>&lt;</button>
          </Link>
          <div id={styles.round}>Choose a game to spectate:</div>
          {Object.keys(allGames).length ? (
            Object.entries(allGames).map((obj, index) => (
              <div
                key={obj[0]}
                className={styles.list}
                id={index % 2 === 0 ? gstyles.team0 : gstyles.team1}
              >
                <div style={{ fontSize: "1.5rem" }}>
                  Game ID: {+obj[0].slice(4)}
                </div>

                <div>
                  {obj[1].currentRound > 3 ? (
                    "Game ended."
                  ) : (
                    <Link to={`/spectate/${obj[0].replace(/\s/g, "")}`}>
                      <button>Spectate</button>
                    </Link>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div>Loading</div>
          )}
        </div>
      </div>
    </>
  );
}
