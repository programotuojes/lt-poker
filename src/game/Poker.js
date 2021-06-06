import {
  callBluffFunction,
  distributeCards,
  raiseFunction,
} from './Moves';
import initializeGame from '../util/InitialState';
import stripSecrets from '../util/StripSecrets';

export const Poker = {
  name: 'lt-poker',
  setup: initializeGame,
  playerView: stripSecrets,
  disableUndo: true,

  turn: {
    order: {
      first: (G, ctx) => ctx.playOrderPos,
      next: (G, ctx) => {
        let nextPlayerPos = (ctx.playOrderPos + 1) % ctx.numPlayers;
        let nextPlayer = ctx.playOrder[nextPlayerPos];

        while (G.players[nextPlayer].cardCount > 4) {
          nextPlayerPos = (nextPlayerPos + 1) % ctx.numPlayers;
        }

        return nextPlayerPos;
      },
    },
  },

  events: {
    endTurn: false,
    endStage: false,
    endGame: false,

    setPhase: false,
    setStage: false,
    setActivePlayers: false,
  },

  phases: {
    first: {
      start: true,
      next: 'second',
      onBegin: distributeCards,
    },

    second: {
      next: 'third',
      moves: {
        raise: {
          move: raiseFunction,
          client: false,
        },
        callBluff: {
          move: callBluffFunction,
          client: false,
        },
      },
    },

    third: {
      next: 'first',
    },
  },

  endIf: (G) => {
    const playingCounts = Object.values(G.players)
      .map((player) => player.cardCount)
      .filter((count) => count < 5);

    if (playingCounts.length === 1) {
      return true;
    }
  },
};
