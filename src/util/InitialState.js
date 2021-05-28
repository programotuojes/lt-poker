import { RANKS, SUITS } from '../constants/Cards';

export function createDeck() {
  let cards = [];

  for (const suit of SUITS) {
    for (const rank of RANKS) {
      cards.push({ suit, rank: rank.value });
    }
  }

  return cards;
}

export default function initialState(ctx) {
  let players = {};

  ctx.playOrder.forEach((p) => {
    players[p] = {
      deck: [],
      cardCount: 1,
      call: undefined,
      isCorrect: undefined,
    };
  });

  return {
    players,
    previousPlayer: null,
    previousCall: { handIdx: 0, modifierIdx: 0 },
    deck: createDeck(),
  };
}
