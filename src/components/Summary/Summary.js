import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { db } from "../Firebase/firebase";
import { doc, getDoc } from "firebase/firestore";
import styles from "./styles.module.css";
import gstyles from "../gstyles.module.css";

export default function Summary() {
  const [round, setRound] = useState(0);
  const [points, setPoints] = useState([0, 0]);
  const [activeTeam, setActiveTeam] = useState(0);

  const params = useParams();

  const currentGameDoc = doc(db, "games", params.gameID);

  //         Load initial data
  useEffect(() => {
    const loadData = async () => {
      let data = await getDoc(currentGameDoc);
      data = data.data();

      setRound(data.currentRound);
      setPoints(data.teamPoints);
      setActiveTeam(data.activeTeam);
    };

    loadData();
  }, []);

  return (
    <>
      <div className={gstyles.background}>
        {round > 3 ? (
          <div className={gstyles.topbar}>THE END</div>
        ) : (
          <>
            <div className={gstyles.topbar}>Round {round}</div>
          </>
        )}
        <div className={gstyles.row}>
          <div className={gstyles.column} id={gstyles.team0}>
            <div id={gstyles.team}>Team 1</div>
            <div id={gstyles.points}>{points[0]}</div>
            {activeTeam === 0 && round <= 3 ? (
              <div style={{ fontSize: "5vw" }}>Going next</div>
            ) : null}
          </div>
          <div className={gstyles.column} id={gstyles.team1}>
            <div id={gstyles.team}>Team 2</div>
            <div id={gstyles.points}>{points[1]}</div>
            {activeTeam === 1 && round <= 3 ? (
              <div style={{ fontSize: "5vw" }}>Going next</div>
            ) : null}
          </div>
        </div>
        {round <= 3 ? (
          <>
            <Link to={`/round/${params.gameID}`}>
              <button className={styles.next}>NEXT</button>
            </Link>
          </>
        ) : null}
        <br />
        <Link to="/">
          <button id={gstyles.back}>Back to start</button>
        </Link>
      </div>
    </>
  );
}
