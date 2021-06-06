import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles, TextField } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import { checkMatchID, checkUsername } from '../../util/Validation';
import { LobbyClient } from 'boardgame.io/client';
import {
  BACKEND_URL,
  CREDENTIALS,
  PLAYER_ID,
  USERNAME,
} from '../../../constants/Constants';

const useStyles = makeStyles(() => ({
  title: {
    marginTop: 8,
    marginBottom: 8,
  },
  center: {
    textAlign: 'center',
  },
}));

function JoinCard() {
  const classes = useStyles();
  const history = useHistory();
  const lobbyClient = new LobbyClient({ server: BACKEND_URL });

  const [username, setUsername] = useState('');
  const [usernameError, setUsernameError] = useState(null);

  const [matchID, setMatchID] = useState('');
  const [matchIDError, setMatchIDError] = useState(null);

  function handleUsername(event) {
    setUsername(event.target.value);
    localStorage.setItem(USERNAME, event.target.value);
    setUsernameError(null);
  }

  function handleMatchID(event) {
    setMatchID(event.target.value);
    setMatchIDError(null);
  }

  async function handleJoin(event) {
    event.preventDefault();

    const usernameError = checkUsername(username);
    const matchIDError = await checkMatchID(matchID, true);

    if (usernameError || matchIDError) {
      setUsernameError(usernameError);
      setMatchIDError(matchIDError);
      return;
    }

    const { players } = await lobbyClient.getMatch('lt-poker', matchID);
    const playerID = players
      .find((player) => player.name === undefined)
      .id.toString();
    const { playerCredentials } = await lobbyClient.joinMatch(
      'lt-poker',
      matchID,
      {
        playerID: playerID,
        playerName: username,
      }
    );

    localStorage.setItem(PLAYER_ID, playerID);
    localStorage.setItem(CREDENTIALS, playerCredentials);
    history.push(`/match/${matchID}`);
  }

  useEffect(() => {
    setUsername(localStorage.getItem(USERNAME));
  }, []);

  return (
    <Card raised>
      <CardContent>
        <form autoComplete={'off'}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography
                className={classes.title}
                align={'center'}
                variant={'h5'}>
                Join a match
              </Typography>
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                variant={'outlined'}
                label={'Username'}
                value={username}
                onChange={handleUsername}
                error={!!usernameError}
                helperText={usernameError || ' '}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                variant={'outlined'}
                label={'Match ID'}
                value={matchID}
                onChange={handleMatchID}
                error={!!matchIDError}
                helperText={matchIDError || ' '}
              />
            </Grid>

            <Grid item xs={12} className={classes.center}>
              <Button
                type={'submit'}
                variant={'contained'}
                color={'primary'}
                onClick={handleJoin}>
                Join
              </Button>
            </Grid>
          </Grid>
        </form>
      </CardContent>
    </Card>
  );
}

export default JoinCard;
