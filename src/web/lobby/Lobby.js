import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core';
import CreateCard from './components/CreateCard';
import JoinCard from './components/JoinCard';

const useStyles = makeStyles(() => ({
  root: {
    minHeight: '100%',
  },
  form: {
    textAlign: 'center',
  },
  title: {
    marginTop: 20,
    marginBottom: 40
  }
}));

function Lobby() {
  const classes = useStyles();

  return (
    <Grid
      className={classes.root}
      container
      justify={'center'}
      alignItems={'center'}
      direction={'column'}>
      <Grid item xs={12}>
        <Typography variant={'h3'} align={'center'} className={classes.title}>
          Lithuanian poker
        </Typography>
      </Grid>

      <Grid item container justify={'center'} alignItems={'center'} spacing={4}>
        <Grid item xs={12} sm={5}>
          <JoinCard />
        </Grid>

        <Grid item xs={12} sm={'auto'}>
          <Typography variant={'h5'} align={'center'}>OR</Typography>
        </Grid>

        <Grid item xs={12} sm={5}>
          <CreateCard />
        </Grid>
      </Grid>
    </Grid>
  );
}

export default Lobby;
