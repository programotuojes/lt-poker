import { makeStyles } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import { Hands } from '../../../constants/Hands';
import CardView from './CardView';
import './PlayerCard.css';
import Username from './Username';

const useStyles = makeStyles(() => ({
  playerText: {
    height: 130,
  },
}));

function PlayerCard({ player, playerID, isActive, showCards, won, playerMatchData }) {
  const classes = useStyles();

  const calledHand = player.call && Hands[player.call.handIdx].name.toLowerCase();
  const calledModifier =
    player.call && Hands[player.call.handIdx].modifiers[player.call.modifierIdx].name.toLowerCase();

  return (
    <Card raised>
      <CardContent>
        {(playerMatchData.name === undefined && (
          <Typography className={'loading ' + classes.playerText} align={'center'} variant={'h4'}>
            Waiting for player
          </Typography>
        )) || (
          <Grid container direction={'column'}>
            <Grid item className={classes.playerText}>
              <Username playerID={playerID} player={player} name={playerMatchData.name} isActive={isActive} />

              {player.call && (
                <Typography align={'center'}>
                  Called{' '}
                  <i>
                    {calledHand}, {calledModifier}
                  </i>
                </Typography>
              )}

              {player.isCorrect !== undefined && (
                <Typography style={{ color: (player.isCorrect && 'green') || 'red' }} align={'center'}>
                  {(player.isCorrect && 'Correctly called bluff') || 'Called bluff incorrectly'}
                </Typography>
              )}

              {won && (
                <Typography style={{ color: 'green' }} align={'center'} variant={'h5'}>
                  Winner!
                </Typography>
              )}
            </Grid>

            {showCards && (
              <Grid item>
                <CardView cards={player.deck} cardCount={player.cardCount} />
              </Grid>
            )}
          </Grid>
        )}
      </CardContent>
    </Card>
  );
}

export default PlayerCard;
