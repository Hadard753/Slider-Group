import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import ContinuousSlider from "./demo";

export const Config = () => {
  const [configDictionary, setConfigDictionary] = useState({
    Subspecialty: { value: 33, lock: false },
    Location: { value: 33, lock: false },
    TAT: { value: 34, lock: false }
  });

  const [numOfUnLocks, setNumOfUnLocks] = useState(3);
  const [reminder, setReminder] = useState(100);

  const setValue = (newValue, field) => {
    const newDic = { ...configDictionary };

    Object.keys(configDictionary).forEach(key => {
      if (key !== field && !newDic[key].lock) {
        let val = (reminder - newValue) / (numOfUnLocks - 1);
        newDic[key].value = val;
      }
    });

    newDic[field].value = newValue;
    setConfigDictionary(newDic);
  };

  const setLock = (newState, field) => {
    const newDic = { ...configDictionary };

    if (newState && numOfUnLocks === 2) {
      Object.keys(configDictionary).forEach(key => {
        newDic[key].lock = true;
      });
      setNumOfUnLocks(0);
    } else if (!newState && numOfUnLocks === 0) {
      let counter = 0;
      Object.keys(configDictionary).forEach(key => {
        counter++;
        newDic[key].lock = false;
      });
      setReminder(100);
      setNumOfUnLocks(counter);
    } else {
      if (newState) {
        setNumOfUnLocks(numOfUnLocks - 1);
        setReminder(reminder - newDic[field].value);
      } else {
        setNumOfUnLocks(numOfUnLocks + 1);
        setReminder(reminder + newDic[field].value);
      }
      newDic[field].lock = newState;
    }

    setConfigDictionary(newDic);
  };

  return (
    <Grid container>
      {Object.keys(configDictionary).map(key => (
        <Grid key={key} item xs={12}>
          <ContinuousSlider
            label={`${key} ${
              configDictionary[key].lock
                ? ": " + configDictionary[key].value + "%"
                : ""
            }`}
            value={configDictionary[key].value}
            lock={configDictionary[key].lock}
            onChange={newValue => setValue(newValue, key)}
            onLock={newState => setLock(newState, key)}
            max={reminder}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default Config;
