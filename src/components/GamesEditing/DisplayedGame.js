import {
  collection,
  doc,
  getDoc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { db } from "../Firebase/firebase";
import styles from "./style.module.css";
import _ from "lodash";
import chunk from "lodash/chunk";

export default function DisplayedGame() {
  const params = useParams();
  const [currentGame, setCurrentGame] = useState({});
  const [allSets, setAllSets] = useState({});
  const [backupData, setBackupData] = useState({});

  const gameDoc = doc(db, "games", params.game);
  const setsCollectionRef = collection(db, "sets");

  useEffect(() => {
    const loadData = async () => {
      let data = await getDoc(gameDoc);
      data = data.data();
      setCurrentGame(data);

      let data2 = await getDocs(setsCollectionRef);
      let tempSets;
      data2.docs.forEach((doc) => {
        const tempID = doc.id;
        const tempData = { ...doc.data() };
        tempSets = { ...tempSets, [tempID]: tempData };
        setAllSets(tempSets);
        const dataBackup = _.cloneDeep(data);
        const data2Backup = _.cloneDeep(data2);
        setBackupData({ gameData: dataBackup, setsData: data2Backup });
      });
    };

    loadData();
  }, []);

  // useEffect(() => {
  //   console.log(backupData);
  // }, [backupData.gameData]);

  const {
    currentRound,
    activeTeam,
    questionsLeft,
    activeSet,
    teamPoints,
  } = currentGame;

  const handleRoundChange = (operation) => {
    if (operation === "add" && currentRound < 3) {
      setCurrentGame((prev) => {
        return { ...prev, currentRound: currentRound + 1 };
      });
    } else if (operation === "subtract" && currentRound > 1) {
      setCurrentGame((prev) => {
        return { ...prev, currentRound: currentRound - 1 };
      });
    }
  };

  const handleTeamChange = () => {
    if (activeTeam) {
      setCurrentGame((prev) => {
        return { ...prev, activeTeam: 0 };
      });
    } else if (!activeTeam) {
      setCurrentGame((prev) => {
        return { ...prev, activeTeam: 1 };
      });
    }
  };

  const handlePointsChange = (team, operation) => {
    let tempGame = currentGame;
    if (operation === "add") {
      tempGame.teamPoints[team]++;
      setCurrentGame((prev) => {
        return { ...prev, teamPoints: tempGame.teamPoints };
      });
    } else if (operation === "subtract") {
      tempGame.teamPoints[team]--;
      setCurrentGame((prev) => {
        return { ...prev, teamPoints: tempGame.teamPoints };
      });
    }
  };

  const handleChangeSet = (newSet) => {
    let tempCurrentGame = currentGame;
    tempCurrentGame.activeSet = newSet;
    setCurrentGame((prev) => {
      return {
        ...prev,
        activeSet: newSet,
        questionsLeft: [...allSets[newSet].questions],
      };
    });
    console.log(allSets[newSet].questions);
  };

  const handleQuestionsLeft = (question) => {
    let questionsLeft = currentGame.questionsLeft;
    const index = currentGame.questionsLeft.indexOf(question);

    if (questionsLeft.includes(question)) {
      questionsLeft.splice(index, 1);
      setAllSets((prev) => {
        return { ...prev, questionsLeft: questionsLeft };
      });
    } else {
      questionsLeft.push(question);
      setAllSets((prev) => {
        return { ...prev, questionsLeft: questionsLeft };
      });
    }
  };

  const saveData = async () => {
    await updateDoc(gameDoc, currentGame);
    const dataBackup = _.cloneDeep(currentGame);
    setBackupData({ gameData: dataBackup });
  };

  const restoreData = () => {
    console.log(backupData.gameData);
    setCurrentGame(backupData.gameData);
  };

  return (
    <>
      <br />
      <button onClick={() => saveData()}>Save</button>
      <button onClick={() => restoreData()}>Restore</button>
      {/* ------------ ROUND ------------ */}
      <div>
        <p>
          Current round: {currentRound}
          <button onClick={() => handleRoundChange("add")}>+</button>
          <button onClick={() => handleRoundChange("subtract")}>-</button>
        </p>
      </div>
      <br />
      {/* ------------ TEAMS ------------ */}
      <div>
        Turn of team: {activeTeam}
        <button onClick={() => handleTeamChange()}>Change</button>
      </div>
      <br />
      {/* ------------ POINTS ------------ */}
      {currentGame?.teamPoints ? (
        <>
          <div>
            Points of team 0: {teamPoints[0]}
            <button onClick={() => handlePointsChange(0, "add")}>+</button>
            <button onClick={() => handlePointsChange(0, "subtract")}>-</button>
          </div>
          <div>
            Points of team 1: {teamPoints[1]}
            <button onClick={() => handlePointsChange(1, "add")}>+</button>
            <button onClick={() => handlePointsChange(1, "subtract")}>-</button>
          </div>
          <br />
        </>
      ) : null}
      {/* ------------ ACTIVE SET ------------ */}
      <div>
        Current Set: {allSets[activeSet]?.title}
        <br />
        Choose new set:
        <br />
        {Object.entries(allSets).map((obj) => (
          <div key={obj[0]} onClick={() => handleChangeSet(obj[0])}>
            {obj[1].title}
          </div>
        ))}
      </div>
      <br />
      {/* ------------ QUESTIONS LEFT ------------ */}
      <div>Questions left:</div>
      {allSets[activeSet]?.questions?.map((obj, index) => (
        <div key={`${index}${obj}`}>
          <button
            className={questionsLeft.includes(obj) ? styles.active : styles.dis}
            onClick={() => {
              handleQuestionsLeft(obj, index);
            }}
          >
            {obj}
          </button>
        </div>
      ))}
    </>
  );
}
