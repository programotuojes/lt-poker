import { IconButton, makeStyles, TextField } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { Edit, Save } from '@material-ui/icons';
import { LobbyClient } from 'boardgame.io/client';
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { BACKEND_URL, CREDENTIALS, PLAYER_ID, USERNAME } from '../../../constants/Constants';
import { checkUsername } from '../../util/Validation';

const useStyles = makeStyles(() => ({
  editButton: {
    position: 'relative',
    bottom: 2,
  },
}));

function Username({ playerID, player, name, isActive }) {
  const classes = useStyles();
  const localPlayerID = localStorage.getItem(PLAYER_ID);
  const { matchID } = useParams();
  const lobbyClient = new LobbyClient({ server: BACKEND_URL });

  const [editing, setEditing] = useState(false);
  const [username, setUsername] = useState(name);
  const [usernameError, setUsernameError] = useState(null);

  function getColor() {
    if (player.cardCount > 4) {
      return 'lightgray';
    }
    if (isActive) {
      return 'green';
    }
    return 'black';
  }

  function handleUsername(event) {
    setUsername(event.target.value);
    setUsernameError(null);
  }

  async function saveUsername(event) {
    event.preventDefault();
    const usernameError = checkUsername(username);

    if (usernameError) {
      setUsernameError(usernameError);
      return;
    }

    await lobbyClient.updatePlayer('lt-poker', matchID, {
      playerID: localPlayerID,
      credentials: localStorage.getItem(CREDENTIALS),
      newName: username,
    });

    setEditing(false);
    localStorage.setItem(USERNAME, username);
  }

  if (editing) {
    return (
      <form autoComplete={'off'}>
        <Grid container justify={'center'} alignItems={'center'}>
          <Grid item xs={7}>
            <TextField
              fullWidth
              label={'New username'}
              value={username}
              onChange={handleUsername}
              error={!!usernameError}
              helperText={usernameError || ' '}
            />
          </Grid>

          <Grid item xs={1}>
            <IconButton type={'submit'} onClick={saveUsername} size={'small'}>
              <Save />
            </IconButton>
          </Grid>
        </Grid>
      </form>
    );
  }

  return (
    <Typography style={{ color: getColor() }} align={'center'} variant={'h4'}>
      <b>{username}</b>
      {playerID === localPlayerID && (
        <IconButton onClick={() => setEditing(true)} size={'small'} className={classes.editButton}>
          <Edit />
        </IconButton>
      )}
    </Typography>
  );
}

export default Username;
