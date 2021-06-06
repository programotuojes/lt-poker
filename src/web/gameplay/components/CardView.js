import React from 'react';
import getImage from '../../util/ParseCard';
import { makeStyles } from '@material-ui/core';

const MOVE_BY = -50;

const useStyles = makeStyles(() => ({
  0: {
    position: 'relative',
    left: 0,
  },
  1: {
    boxShadow: '-10px 0 10px -10px gray',
    position: 'relative',
    left: MOVE_BY,
  },
  2: {
    boxShadow: '-10px 0 10px -10px gray',
    position: 'relative',
    left: MOVE_BY * 2,
  },
  3: {
    boxShadow: '-10px 0 10px -10px gray',
    position: 'relative',
    left: MOVE_BY * 3,
  },
}));

function CardView({ cards, cardCount }) {
  const classes = useStyles();

  if (cardCount > 4 && cards.length === 0) {
    return null;
  }

  let playerCards = [];

  if (cards.length === 0) {
    for (let i = 0; i < cardCount; i++) {
      playerCards.push(undefined);
    }
  } else {
    playerCards = cards;
  }

  function getImgAlt(card) {
    if (card === undefined) {
      return 'Back of playing card';
    } else {
      return `${card.name} of ${card.suit}`;
    }
  }

  return playerCards.map((card, key) => (
    <img
      src={getImage(card)}
      alt={getImgAlt(card)}
      width={100}
      className={classes[key]}
      key={key}
    />
  ));
}

export default CardView;
