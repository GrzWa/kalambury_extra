import React, { useEffect, useState } from "react";
import { getDocs, collection } from "firebase/firestore";
import { db } from "../Firebase/firebase";
import { Link } from "react-router-dom";

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
        Object.entries(allGames).map((obj) => (
          <div key={obj[0]}>
            <div>Game ID: {obj[0]}</div>
            <Link to={`/admin/edit_games/${obj[0].replace(/\s/g, "")}`}>
              <button>Edit</button>
            </Link>
            {/* <button>Remove game</button> */}
          </div>
        ))
      ) : (
        <div>Loading</div>
      )}
    </>
  );
}
