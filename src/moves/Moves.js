import { INVALID_MOVE } from 'boardgame.io/core';
import { createDeck } from '../util/InitialState';
import { isHandPresent, isHandValid } from '../util/Validation';

// ----------------
// Round start moves
// ----------------

export function distributeCards(G, ctx) {
  G.deck = ctx.random.Shuffle(createDeck());
  G.previousCall = { handIdx: 0, modifierIdx: 0 };

  for (const player in G.players) {
    G.players[player].call = undefined;
    G.players[player].isCorrect = undefined;

    const cardCount = G.players[player].cardCount;

    if (cardCount < 5) {
      G.players[player].deck = G.deck.splice(0, cardCount);
    } else {
      G.players[player].deck = [];
    }
  }
}

// ----------
// Play moves
// ----------

export function raiseFunction(G, ctx, call) {
  if (!isHandValid(call.handIdx, call.modifierIdx, G.previousCall.handIdx, G.previousCall.modifierIdx)) {
    return INVALID_MOVE;
  }

  G.previousPlayer = ctx.currentPlayer;
  G.players[ctx.currentPlayer].call = call;
  G.previousCall = call;
  ctx.events.endTurn();
}

export function callBluffFunction(G, ctx) {
  if (G.previousCall.handIdx === 0) {
    return INVALID_MOVE;
  }

  if (isHandPresent(G.players, G.previousCall.handIdx, G.previousCall.modifierIdx)) {
    G.players[ctx.currentPlayer].isCorrect = false;
    G.players[ctx.currentPlayer].cardCount += 1;

    ctx.events.endTurn();
    ctx.events.endPhase();
  } else {
    G.players[ctx.currentPlayer].isCorrect = true;
    G.players[G.previousPlayer].cardCount += 1;

    ctx.events.endPhase();
  }
}
