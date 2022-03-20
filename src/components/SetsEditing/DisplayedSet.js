import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../Firebase/firebase";
import styles from "./styles.module.css";

export default function DisplayedSet() {
  const params = useParams();

  const [currentSet, setCurrentSet] = useState({});
  const [isAddingNew, setIsAddingNew] = useState(false);

  const setDoc = doc(db, "sets", `${params.set}`);

  useEffect(() => {
    const loadData = async () => {
      let data = await getDoc(setDoc);
      data = data.data();
      setCurrentSet(data);
    };

    loadData();
  }, []);

  const handleSetInput = (e, index) => {
    let tempSet = currentSet;
    tempSet.questions[index] = e.target.value;
    setCurrentSet(tempSet);
  };

  const handleAddNewItem = (value) => {
    setIsAddingNew(false);
    let tempSet = currentSet;
    tempSet.questions.push(value);
    setCurrentSet(tempSet);
    console.log(tempSet);
  };

  const handleObjDelete = (index) => {
    let tempSet = currentSet;
    tempSet.questions.splice(index, 1);
    setCurrentSet({ title: tempSet.title, questions: tempSet.questions });
  };

  const uploadNewSet = async () => {
    await updateDoc(setDoc, { questions: [...currentSet.questions] });
  };

  if (Object.keys(currentSet)?.length > 0) {
    return (
      <div key={currentSet.title}>
        <h2>{currentSet.title}</h2>

        {currentSet.questions.map((setVal, index) => (
          <div key={`${setVal}${index}`}>
            <input
              key={setVal}
              defaultValue={setVal}
              onChange={(event) => handleSetInput(event, index)}
            ></input>
            <button onClick={() => handleObjDelete(index)}>DELETE</button>
          </div>
        ))}
        {isAddingNew ? (
          <>
            <input onChange={(e) => handleAddNewItem(e.target.value)}></input>
            <br />
          </>
        ) : null}
        <button onClick={() => setIsAddingNew(true)}>Add new item</button>
        <button onClick={() => uploadNewSet()}>Save all</button>
      </div>
    );
  } else {
    return <div>Loading...</div>;
  }
}
