import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import {
  FormHelperText,
  InputLabel,
  makeStyles,
  MenuItem,
  Select,
  TextField,
} from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import { checkUsername } from '../validation/Validation';
import { LobbyClient } from 'boardgame.io/client';
import {
  BACKEND_URL,
  CREDENTIALS,
  PLAYER_ID,
  USERNAME,
} from '../../constants/Constants';
import FormControl from '@material-ui/core/FormControl';

const useStyles = makeStyles(() => ({
  title: {
    marginTop: 8,
    marginBottom: 8,
  },
  center: {
    textAlign: 'center',
  },
}));

function CreateCard() {
  const classes = useStyles();
  const history = useHistory();
  const lobbyClient = new LobbyClient({ server: BACKEND_URL });

  const [playerCount, setPlayerCount] = useState(2);
  const [username, setUsername] = useState('');
  const [usernameError, setUsernameError] = useState(null);

  function handleUsername(event) {
    setUsername(event.target.value);
    localStorage.setItem(USERNAME, event.target.value);
    setUsernameError(null);
  }

  async function handleCreate() {
    const usernameError = checkUsername(username);

    if (usernameError) {
      setUsernameError(usernameError);
      return;
    }

    const { matchID } = await lobbyClient.createMatch('lt-poker', {
      numPlayers: playerCount,
    });
    const { playerCredentials } = await lobbyClient.joinMatch(
      'lt-poker',
      matchID,
      {
        playerID: '0',
        playerName: username,
      }
    );

    localStorage.setItem(PLAYER_ID, '0');
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
                Create a match
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
              <FormControl variant='outlined' fullWidth>
                <InputLabel id='player-count-label'>Player count</InputLabel>
                <Select
                  labelId='player-count-label'
                  id='player-count'
                  value={playerCount}
                  onChange={(e) => setPlayerCount(e.target.value)}
                  label='Player count'>
                  <MenuItem value={2}>2</MenuItem>
                  <MenuItem value={3}>3</MenuItem>
                  <MenuItem value={4}>4</MenuItem>
                  <MenuItem value={5}>5</MenuItem>
                  <MenuItem value={6}>6</MenuItem>
                </Select>
                <FormHelperText> </FormHelperText>
              </FormControl>
            </Grid>

            <Grid item xs={12} className={classes.center}>
              <Button
                variant={'contained'}
                color={'primary'}
                onClick={handleCreate}>
                Create
              </Button>
            </Grid>
          </Grid>
        </form>
      </CardContent>
    </Card>
  );
}

export default CreateCard;
