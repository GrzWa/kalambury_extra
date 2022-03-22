import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { db } from "../Firebase/firebase";
import { collection, getDocs, doc, setDoc } from "firebase/firestore";
import styles from "./styles.module.css";
import main from "../main.module.css";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";
import Button from "@mui/material/Button";
import { createTheme } from "@mui/material/styles";
import { ThemeProvider } from "@emotion/react";
import { IconButton } from "@mui/material";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import HelpScreen from "./HelpScreen";
import _ from "lodash";

export default function Navigation() {
  const [set, setSet] = useState("");
  const [allSets, setAllSets] = useState([]);
  const [allGames, setAllGames] = useState({});
  const [startRound, setStartRound] = useState(false);
  const [newGameID, setNewGameID] = useState("");
  const [help, setHelp] = useState(false);
  const [setButtons, setSetButtons] = useState([]);

  const setsCollectionRef = collection(db, "sets");
  const gamesCollectionRef = collection(db, "games");

  useEffect(() => {
    // --------------- Get all questions sets ---------------
    const getList = async () => {
      try {
        let data = await getDocs(setsCollectionRef);
        let tempAllSets;
        data.docs.forEach((doc) => {
          const tempID = doc.id;
          const tempData = { ...doc.data() };
          tempAllSets = { ...tempAllSets, [tempID]: tempData };
        });

        setAllSets(tempAllSets);
        let tempActiveSet = Object.entries(tempAllSets).find(
          (el) => el[1].disabled === false
        );
        setSet(tempActiveSet[0]);
      } catch (e) {
        console.log(e);
      }
    };
    // --------------- Get games data ---------------
    const getGames = async () => {
      let data = await getDocs(gamesCollectionRef);
      let tempGame;
      data.docs.forEach((doc) => {
        const tempID = doc.id;
        const tempData = { ...doc.data() };
        tempGame = { ...tempGame, [tempID]: tempData };
        setAllGames(tempGame);
      });
    };

    getList();
    getGames();
  }, []);

  const handleButtonStart = async () => {
    let tempAllGames = Object.entries(allGames);

    // ---------------- Create new game ID ----------------
    let tempGameID;
    if (tempAllGames.length === 0) {
      tempGameID = "game0001";
      setNewGameID(tempGameID);
    } else {
      let newGameNumber = (
        +tempAllGames[tempAllGames.length - 1][0].slice(-4) + 1
      ).toString(10);
      while (newGameNumber.length < 4) {
        newGameNumber = "0" + newGameNumber;
      }
      tempGameID = "game" + newGameNumber;
      setNewGameID(tempGameID);
    }

    // ---------------- Add new game to firestore ----------------
    const newGameDoc = doc(db, "games", tempGameID);
    await setDoc(newGameDoc, {
      activeSet: set,
      activeTeam: 0,
      currentRound: 1,
      questionsLeft: allSets[set].questions,
      teamPoints: [0, 0],
    });

    setStartRound(true);
  };

  function handelButtonSet(name) {
    setSet(name);
  }

  const theme = createTheme({
    status: {
      danger: "#e53e3e",
    },
    palette: {
      primary: {
        main: "#aaa",
        darker: "#333",
      },
      start: {
        main: "#6474aB",
        contrastText: "#fff",
      },
      light: {
        main: "#eee",
        darker: "#ddd",
        contrastText: "#777",
      },
    },
  });

  const handleCreateNewSet = async () => {
    const newSetDoc = doc(db, "sets", "set0001");
    await setDoc(newSetDoc, {
      disabled: false,
      questions: ["first question"],
      title: "First set",
    });
  };

  if (startRound) {
    return <Redirect to={`round/${newGameID}`} />;
  }

  return (
    <ThemeProvider theme={theme}>
      {help ? <HelpScreen setHelp={setHelp} /> : null}
      <IconButton
        color="secondary"
        aria-label="add an alarm"
        id={styles.helpButton}
        onClick={() => setHelp(true)}
      >
        <HelpOutlineIcon />
      </IconButton>
      <div className={main.background2}>
        <div className={styles.align}>
          <Button
            variant="contained"
            onClick={() => handleButtonStart()}
            className={styles.main}
            color="start"
            disabled={_.isEmpty(allSets)}
          >
            START NEW GAME
          </Button>
        </div>

        {/* ------------------- QUESTION SETS ------------------------ */}
        {_.isEmpty(allSets) ? (
          <div className={styles["sets-list"]}>
            <div className={styles.align}>
              <Link to="/admin/edit_sets/set0001">
                <Button
                  variant="contained"
                  id={styles.sets}
                  color="success"
                  onClick={() => {
                    handleCreateNewSet();
                  }}
                >
                  Create new set
                </Button>
              </Link>
            </div>
          </div>
        ) : (
          <>
            <p className={styles.align}>Choose question set:</p>
            <div className={styles["sets-list"]}>
              {setButtons.map((obj) => obj)}
              {Object.entries(allSets).map((obj, index) =>
                !obj[1].disabled ? (
                  <div className={styles.align} key={`${obj[0]}${index}`}>
                    <Button
                      variant="contained"
                      id={styles.sets}
                      color={obj[0] === set ? "success" : "primary"}
                      onClick={() => {
                        handelButtonSet(obj[0]);
                      }}
                    >
                      {allSets[obj[0]].title}
                    </Button>
                    <br />
                  </div>
                ) : null
              )}
            </div>
          </>
        )}

        <br />
        <div className={styles.align} id={styles.bottom}>
          <Link to="/admin">
            <Button variant="contained" color="light">
              Admin page
            </Button>
          </Link>
          <Link to="/spectate">
            <Button variant="contained" color="light">
              Spectator mode
            </Button>
          </Link>
        </div>
      </div>
    </ThemeProvider>
  );
}
