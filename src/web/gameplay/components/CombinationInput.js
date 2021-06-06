import { makeStyles } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import React, { useState } from 'react';
import { Hands } from '../../../constants/Hands';
import { isHandValid } from '../../../util/Validation';

const useStyles = makeStyles(() => ({
  buttonContainer: {
    textAlign: 'center',
  },
}));

function CombinationInput({ previousCall, raise, callBluff }) {
  const classes = useStyles();

  const [error, setError] = useState(false);
  const [handIdx, setHandIdx] = useState(0);
  const [modifierIdx, setModifierIdx] = useState(0);

  function handleRaise() {
    if (isHandValid(handIdx, modifierIdx, previousCall.handIdx, previousCall.modifierIdx)) {
      raise({ handIdx, modifierIdx });
    } else {
      setError(true);
    }
  }

  return (
    <Card raised>
      <CardContent>
        <Grid container spacing={4} justify={'center'}>
          <Grid item xs={6}>
            <FormControl variant={'outlined'} fullWidth error={error}>
              <InputLabel id={'hand-label'}>Hand</InputLabel>
              <Select
                labelId={'hand-label'}
                id={'hand'}
                value={handIdx}
                onChange={(e) => setHandIdx(e.target.value)}
                label={'Hand'}>
                {Hands.map((hand, index) => (
                  <MenuItem value={index} key={hand.value}>
                    {hand.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={6}>
            <FormControl variant={'outlined'} fullWidth error={error}>
              <InputLabel id={'modifier-label'}>Modifier</InputLabel>
              <Select
                labelId={'modifier-label'}
                id={'modifier'}
                value={modifierIdx}
                onChange={(e) => setModifierIdx(e.target.value)}
                label={'Modifier'}>
                {Hands[handIdx].modifiers.map((modifier, index) => (
                  <MenuItem value={index} key={modifier.name + modifier.value}>
                    {modifier.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={6} className={classes.buttonContainer}>
            <Button onClick={handleRaise} variant={'contained'} color={'primary'}>
              Raise
            </Button>
          </Grid>

          <Grid item xs={6} className={classes.buttonContainer}>
            <Button
              onClick={() => callBluff()}
              variant={'contained'}
              color={'secondary'}
              disabled={previousCall.handIdx === 0}>
              Call bluff
            </Button>
          </Grid>
        </Grid>

        <Snackbar
          open={error}
          autoHideDuration={4000}
          onClose={() => setError(false)}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
          <MuiAlert onClose={() => setError(false)} severity={'error'} variant={'filled'}>
            Enter a higher combination
          </MuiAlert>
        </Snackbar>
      </CardContent>
    </Card>
  );
}

export default CombinationInput;
