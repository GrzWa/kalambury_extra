import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getDocs, collection, updateDoc, doc } from "firebase/firestore";
import { db } from "../Firebase/firebase";
import Switch from "@mui/material/Switch";
import styles from "./styles.module.css";

export default function SetsEditing() {
  const [allSets, setAllSets] = useState({});

  const setsCollectionRef = collection(db, "sets");

  useEffect(() => {
    const loadData = async () => {
      const data = await getDocs(setsCollectionRef);
      let tempSets;
      data.docs.forEach((doc) => {
        const tempID = doc.id;
        const tempData = { ...doc.data() };
        tempSets = { ...tempSets, [tempID]: tempData };
        setAllSets(tempSets);
      });
    };
    loadData();
  }, []);

  const handleSetSwitch = async (gameId) => {
    let tempAllSets = { ...allSets };

    if (tempAllSets[gameId].disabled) {
      tempAllSets[gameId].disabled = false;
    } else {
      tempAllSets[gameId].disabled = true;
    }
    setAllSets(tempAllSets);

    let setDoc = doc(db, "sets", gameId);
    await updateDoc(setDoc, {
      disabled: tempAllSets[gameId].disabled,
    });
  };

  return (
    <>
      {Object.keys(allSets).length ? (
        Object.entries(allSets).map((obj, index) => {
          const gameId = obj[0];
          const gameData = obj[1];
          return (
            <div
              key={gameId}
              className={index % 2 === 0 ? styles.darkbg : styles.lightbg}
            >
              <div className={styles.sets}>
                <div>{gameData.title}</div>
                <Link to={`/admin/edit_sets/${gameId.replace(/\s/g, "")}`}>
                  <button>Edit</button>
                </Link>
                <Switch
                  onChange={() => handleSetSwitch(gameId)}
                  checked={!gameData.disabled}
                />
              </div>
            </div>
          );
        })
      ) : (
        <div>Loading</div>
      )}

      <button disabled={true}>Add set</button>
    </>
  );
}
