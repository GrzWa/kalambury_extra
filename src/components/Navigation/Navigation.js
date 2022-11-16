import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { db } from "../Firebase/firebase";
import { collection, getDocs, doc, setDoc } from "firebase/firestore";
import styles from "./styles.module.css";
import main from "../main.module.css";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";
import Button from "@mui/material/Button";
import { ThemeProvider } from "@emotion/react";
import { IconButton } from "@mui/material";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import HelpScreen from "./HelpScreen";
import _ from "lodash";
import { useAuth } from "../../contexts/AuthContext";
import { getAuth } from "firebase/auth";
import Navbar from "../Navbar/Navbar";
import MUItheme from "../../utils/MUItheme";
import clsx from 'clsx'

export default function Navigation() {
  const [set, setSet] = useState("");
  const [allSets, setAllSets] = useState([]);
  const [allGames, setAllGames] = useState({});
  const [startRound, setStartRound] = useState(false);
  const [newGameID, setNewGameID] = useState("");
  const [help, setHelp] = useState(false);
  const [listScrolled, setListScrolled] = useState(false)

  const setsCollectionRef = collection(db, "sets");
  const gamesCollectionRef = collection(db, "games");

  const clsSetsList = clsx(
    styles['sets-list'],
    !listScrolled && styles['sets-list-scrolled']
  )

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
  // eslint-disable-next-line react-hooks/exhaustive-deps
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

  const theme = MUItheme

  const handleCreateNewSet = async () => {
    const newSetDoc = doc(db, "sets", "set0001");
    await setDoc(newSetDoc, {
      disabled: false,
      questions: ["first question"],
      title: "First set",
    });
  };

  const handleScroll = (e) => {
    const bottom = e.target.scrollHeight - e.target.scrollTop - e.target.clientHeight < 10
    // console.log('--------------------')
    // console.log(e.target.scrollHeight - e.target.scrollTop)
    // console.log(e.target.clientHeight)
    // console.log('--------------------')
    if (bottom) {
      setListScrolled(true)
    } else if (listScrolled) {
      setListScrolled(false)
    }
  }

  if (startRound) {
    return <Redirect to={`/round/${newGameID}`} />;
  }

  return (
    <ThemeProvider theme={theme}>
      <Navbar />
      {/* ------------------- Help screen ------------------- */}
      {help ? <HelpScreen setHelp={setHelp} /> : null}

      {/* ------------------- Help button ------------------- */}
        <div className={main['background-checkered']}></div>
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
          <div className={styles.content}>
            <p className={styles.choose}>Choose question set:</p>
            {/* <div className={styles['sets-list-container']}> */}
              <div className={styles['sets-list']} onScroll={e => handleScroll(e)}>
                {Object.entries(allSets).map((obj, index) => {
                  const setId = obj[0];
                  const setData = obj[1];

                  return !setData.disabled ? (
                    <div key={`${setId}${index}`}
                      className={setId === set ? `${styles['set-button']} ${styles.selected}` : styles['set-button']}
                      onClick={() => {handelButtonSet(setId)}}>
                        {allSets[setId].title}
                    </div>
                  ) : null;
                })}

              </div>
              {/* <div className={styles['sets-list-overlay']}></div> */}
            {/* </div> */}

            <div className={styles['new-game']} onClick={() => handleButtonStart()}>
                START
            </div>
          </div>
        )}

    
      {/* </div> */}
    </ThemeProvider>
  );
}
