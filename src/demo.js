import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Slider from "@material-ui/core/Slider";
import LockIcon from "@material-ui/icons/Lock";
import LockOpenIcon from "@material-ui/icons/LockOpen";

const useStyles = makeStyles({
  root: {
    width: 200
  }
});

export default function ContinuousSlider({
  label,
  value,
  onChange,
  lock,
  onLock,
  max
}) {
  const classes = useStyles();

  const handleChange = (event, newValue) => {
    onChange(newValue);
  };

  const renderLock = () => {
    return lock ? <LockIcon /> : <LockOpenIcon />;
  };

  return (
    <div className={classes.root}>
      <Typography id="continuous-slider" gutterBottom>
        {label}
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs>
          <Slider
            disabled={lock}
            value={value}
            onChange={handleChange}
            aria-labelledby="continuous-slider"
            valueLabelDisplay="auto"
            step={10}
            marks
            min={0}
            max={max}
          />
        </Grid>
        <Grid item onClick={() => onLock(!lock)}>
          {renderLock()}
        </Grid>
      </Grid>
    </div>
  );
}
