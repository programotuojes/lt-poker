import React from 'react';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  root: {
    minHeight: '100%',
  },
}));

function Loading() {
  const classes = useStyles();

  return (
    <Grid
      container
      className={classes.root}
      justify={'center'}
      alignItems={'center'}>
      <Grid item>
        <CircularProgress />
      </Grid>
    </Grid>
  );
}

export default Loading;
