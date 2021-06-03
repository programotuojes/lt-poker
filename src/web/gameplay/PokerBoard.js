import React, { useEffect, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import PlayerView from './PlayerView';
import CombinationInput from './CombinationInput';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import { useParams } from 'react-router-dom';

const useStyles = makeStyles(() => ({
  root: {
    marginTop: 20,
  },
  button: {
    textAlign: 'center',
  },
  matchID: {
    position: 'fixed',
    bottom: '0%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  },
}));

function PokerBoard({ G, ctx, moves, events, isActive, matchData }) {
  const classes = useStyles();
  const { matchID } = useParams();

  const [allConnected, setAllConnected] = useState(false);

  useEffect(() => {
    setAllConnected(matchData.map((player) => player.name).filter((x) => x !== undefined).length === matchData.length);
  }, [matchData]);

  return (
    <>
      <Grid container justify={'center'} spacing={4} className={classes.root}>
        {Object.entries(G.players).map(([key, player]) => (
          <Grid item zeroMinWidth xs={12} sm={6} key={key}>
            <PlayerView
              playerID={key}
              player={player}
              playerMatchData={matchData[key]}
              isActive={ctx.currentPlayer === key}
              showCards={allConnected}
              won={ctx.gameover && player.cardCount < 5}
            />
          </Grid>
        ))}

        {isActive && ctx.phase === 'second' && (
          <Grid item xs={12}>
            <CombinationInput previousCall={G.previousCall} raise={moves.raise} callBluff={moves.callBluff} />
          </Grid>
        )}

        {allConnected && isActive && ctx.phase !== 'second' && (
          <Grid item xs={12} className={classes.button}>
            <Button variant={'contained'} color={'primary'} onClick={() => events.endPhase()}>
              {(ctx.phase === 'first' && 'Start') || 'Continue'}
            </Button>
          </Grid>
        )}
      </Grid>

      {!allConnected && (
        <Typography className={classes.matchID} align={'center'} variant={'h4'}>
          <b>Invite others! Match ID:</b>
          <br />
          {matchID}
        </Typography>
      )}
    </>
  );
}

export default PokerBoard;
