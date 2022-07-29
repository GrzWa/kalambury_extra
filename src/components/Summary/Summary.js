import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { db } from "../Firebase/firebase";
import { doc, getDoc } from "firebase/firestore";
import styles from "./styles.module.css";
import main from "../main.module.css";
import HomeLogo from "../HomeLogo/HomeLogo";

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
      <HomeLogo />
      <div className={main.background}>
        {round > 3 ? (
          <div className={main.topbar}>THE END</div>
        ) : (
          <>
            <div className={main.topbar}>Round {round}</div>
          </>
        )}
        <div className={main.row}>
          <div className={main.column} id={main.team0}>
            <div id={main.team}>Team 1</div>
            <div className={main.points}>{points[0]}</div>
            {activeTeam === 0 && round <= 3 ? (
              <div style={{ fontSize: "5vw" }}>Going next</div>
            ) : null}
          </div>
          <div className={main.column} id={main.team1}>
            <div id={main.team}>Team 2</div>
            <div className={main.points}>{points[1]}</div>
            {activeTeam === 1 && round <= 3 ? (
              <div>Going next</div>
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
          <button id={main.back}>Back to start</button>
        </Link>
      </div>
    </>
  );
}
