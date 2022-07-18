import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";
import { db } from "../Firebase/firebase";
import { updateDoc, doc, getDoc } from "firebase/firestore";
import { useParams } from "react-router-dom";
import _ from "lodash";
import styles from "./styles.module.css";
import main from "../main.module.css";
import { getRoundInstructions } from "./utils";
import HomeLogo from "../HomeLogo/HomeLogo";

export default function Round() {
  const [currentQuestion, setCurrentQuestion] = useState("");
  const [skippedQuestions, setSkippedQuestions] = useState([]);
  const [questionsLeft, setQuestionsLeft] = useState([]);
  const [points, setPoints] = useState([0, 0]);
  const [team, setTeam] = useState(0);
  const [round, setRound] = useState(0);
  const [seconds, setSeconds] = useState(30);
  const [finish, setFinish] = useState(false);
  const [allQuestions, setAllQuestions] = useState([]);

  const params = useParams()
  const currentGameDoc = doc(db, "games", params.gameID);

  useEffect(() => {
    const getList = async () => {
      let data = await getDoc(currentGameDoc);
      data = data.data();

      const tempData = _.cloneDeep(data);
      setQuestionsLeft(tempData.questionsLeft);
      setCurrentQuestion(
        data.questionsLeft[
          Math.floor(Math.random() * data.questionsLeft.length)
        ]
      );

      const currentSetDoc = doc(db, "sets", data.activeSet);
      let data2 = await getDoc(currentSetDoc);
      data2 = data2.data();
      setAllQuestions(data2);

      setTeam(data.activeTeam);
      setRound(data.currentRound);
      setPoints(data.teamPoints);
      setSeconds(30);
    };

    getList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    let timer1 = setTimeout(() => {
      if (seconds === 0) {
        console.log("Time out!");

        const teamChange = team ? 0 : 1;
        let combinedQs = [...questionsLeft, ...skippedQuestions];

        setTeam(teamChange);
        updateActiveGame(teamChange, points, combinedQs, false);

        setFinish(true);
        return;
      }
      setSeconds((prev) => prev - 1);
    }, 1000);
    return () => {
      clearTimeout(timer1);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [seconds]);

  function listChanger(val1, val2 = val1, val3 = val1) {
    setQuestionsLeft(val1);
    setCurrentQuestion(val2[Math.floor(Math.random() * val2.length)]);
    if (val3 !== "skip") {
      setSkippedQuestions(val3);
    }
  }

  function addPoint() {
    let temporaryPoints = [...points];
    temporaryPoints[team] += 1;
    setPoints(temporaryPoints);
  }

  const updateActiveGame = async (team, points, qsLeft, changeRound) => {
    let curRound = round;

    if (changeRound) {
      curRound++;
    }

    await updateDoc(currentGameDoc, {
      activeTeam: team,
      currentRound: curRound,
      teamPoints: points,
      questionsLeft: qsLeft,
    });
  };

  function handleButtonNext() {
    if (questionsLeft.length === 1) {
      // ------------------ The last questions overall ------------------
      if (skippedQuestions.length === 0) {
        console.log("KONIEC!!!");
        addPoint();
        const teamChange = team ? 0 : 1;
        setTeam(teamChange);
        let temporaryPoints = [...points];
        temporaryPoints[team] += 1;
        updateActiveGame(
          teamChange,
          temporaryPoints,
          allQuestions.questions,
          true
        );
        setFinish(true);
        return;
      }
      // ------------------ The last questions apart from skipped questions ------------------
      addPoint();
      let temporarySkippedQuestions = [...skippedQuestions];
      listChanger(
        [...temporarySkippedQuestions],
        temporarySkippedQuestions,
        []
      );
      return;
    }
    // ------------------ Several questions left ------------------
    let position = questionsLeft.indexOf(currentQuestion);
    let temporaryList = [...questionsLeft];
    temporaryList.splice(position, 1);
    listChanger([...temporaryList], [...temporaryList], "skip");
    addPoint();
  }

  function handleButtonSkip() {
    if (questionsLeft.length === 1) {
      if (skippedQuestions.length === 0) {
        console.log("Can't skip!");
        return;
      }

      let temporarySkippedQuestions = [...questionsLeft];
      listChanger([...skippedQuestions], skippedQuestions, [
        ...temporarySkippedQuestions,
      ]);

      return;
    }

    if (questionsLeft.length > 1) {
      if (skippedQuestions.length === 0) {
        let temporarySkippedQuestions = [];
        temporarySkippedQuestions.push(currentQuestion);

        let position = questionsLeft.indexOf(currentQuestion);
        let temporaryList = [...questionsLeft];
        temporaryList.splice(position, 1);

        listChanger(temporaryList, temporaryList, temporarySkippedQuestions);
      } else {
        let temporarySkippedQuestions = [...skippedQuestions];
        temporarySkippedQuestions.push(currentQuestion);

        let position = questionsLeft.indexOf(currentQuestion);
        let temporaryList = [...questionsLeft];
        temporaryList.splice(position, 1);

        listChanger(temporaryList, temporaryList, temporarySkippedQuestions);
      }
    } else {
      let temporarySkippedQuestions = [...skippedQuestions, currentQuestion];
      listChanger(temporarySkippedQuestions, skippedQuestions, []);
    }
  }

  if (finish) {
    return <Redirect to={`/summary/${params.gameID}`} />;
  }

  return (
    <>
      <HomeLogo />
      <div className={main.background}>
        <div className={main.topbar}>
          Round: {round}
          <br />
          Team: {team}
        </div>
        <div id={team === 1 ? main.team1 : main.team0}>
          <div className={styles.points_display}>
            <div className={styles.center}>{getRoundInstructions(round)}</div>
            <br />
            <div id={styles.question} className={styles.center}>
              {currentQuestion}
            </div>
          </div>
          <div className={styles.counter}>
            <div className={styles.center}>{seconds}</div>

            <div className={styles.center}>seconds left!</div>
          </div>
          <button onClick={handleButtonNext} className={styles.next_button}>
            Next
          </button>
          <button onClick={handleButtonSkip} className={styles.skip_button}>
            Skip
          </button>
        </div>
      </div>
    </>
  );
}
