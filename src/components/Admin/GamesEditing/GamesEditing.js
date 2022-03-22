import React, { useEffect, useState } from "react";
import { getDocs, collection } from "firebase/firestore";
import { db } from "../../Firebase/firebase";
import { Link } from "react-router-dom";
import styles from "./style.module.css";

export default function GamesEditing() {
  const [allGames, setAllGames] = useState({});

  const gamesCollectionRef = collection(db, "games");

  useEffect(() => {
    const loadData = async () => {
      const data = await getDocs(gamesCollectionRef);
      let tempGame;
      data.docs.forEach((doc) => {
        const tempID = doc.id;
        const tempData = { ...doc.data() };
        tempGame = { ...tempGame, [tempID]: tempData };
        setAllGames(tempGame);
      });
    };
    loadData();
  }, []);

  return (
    <>
      {Object.keys(allGames).length ? (
        Object.entries(allGames).map((obj, index) => {
          const gameId = obj[0];
          return (
            <div
              key={gameId}
              className={index % 2 === 0 ? styles.darkbg : styles.lightbg}
            >
              <div>Game ID: {gameId}</div>
              <Link to={`/admin/edit_games/${gameId.replace(/\s/g, "")}`}>
                <button>Edit</button>
              </Link>
            </div>
          );
        })
      ) : (
        <div>Loading</div>
      )}
    </>
  );
}
