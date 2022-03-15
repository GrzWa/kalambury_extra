import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getDocs, collection, updateDoc, doc } from "firebase/firestore";
import { db } from "../Firebase/firebase";
import Switch from "@mui/material/Switch";
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

  const handleSetSwitch = async (obj) => {
    let tempAllSets = { ...allSets };

    if (tempAllSets[obj[0]].disabled) {
      tempAllSets[obj[0]].disabled = false;
    } else {
      tempAllSets[obj[0]].disabled = true;
    }
    setAllSets(tempAllSets);

    let setDoc = doc(db, "sets", obj[0]);
    await updateDoc(setDoc, {
      disabled: tempAllSets[obj[0]].disabled,
    });
  };

  return (
    <>
      {Object.keys(allSets).length ? (
        Object.entries(allSets).map((obj) => (
          <div key={obj[0]}>
            <div>{obj[1].title}</div>
            <Link to={`/admin/edit_sets/${obj[0].replace(/\s/g, "")}`}>
              <button>Edit</button>
            </Link>
            {/* <button>Remove set</button> */}
            <Switch
              onChange={() => handleSetSwitch(obj)}
              checked={!obj[1].disabled}
            />
          </div>
        ))
      ) : (
        <div>Loading</div>
      )}

      <button disabled={true}>Add set</button>
      {/* <button onClick={() => handleSaveButton()}>Save</button> */}
    </>
  );
}
