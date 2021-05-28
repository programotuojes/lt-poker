import { SUITS, RANKS } from './Cards';

const HAND = {
  NONE: {
    value: 0,
    name: 'None',
    modifiers: [
      {
        value: 0,
        name: '-',
      },
    ],
  },

  HIGH_CARD: {
    value: 10000,
    name: 'High card',
    modifiers: RANKS,
  },

  ONE_PAIR: {
    value: 20000,
    name: 'One pair',
    modifiers: RANKS,
  },

  TWO_PAIR: {
    value: 30000,
    name: 'Two pair',
    modifiers: twoPairModifiers(),
  },

  THREE_KIND: {
    value: 40000,
    name: 'Three of a kind',
    modifiers: RANKS,
  },

  FULL_HOUSE: {
    value: 50000,
    name: 'Full house',
    modifiers: fullHouseModifiers(),
  },

  STRAIGHT: {
    value: 60000,
    name: 'Straight',
    modifiers: RANKS.slice(0, -4),
  },

  FOUR_KIND: {
    value: 70000,
    name: 'Four of a kind',
    modifiers: RANKS,
  },

  STRAIGHT_FLUSH: {
    value: 80000,
    name: 'Straight flush',
    modifiers: RANKS.slice(0, -5), // Straight flush from 10 is a royal flush
  },

  ROYAL_FLUSH: {
    value: 90000,
    name: 'Royal flush',
    modifiers: [
      {
        value: 0,
        name: '-',
      },
      ...SUITS.map((suit) => ({
        value: 1,
        name: suit,
      })),
    ],
  },
};

export const Hands = Object.values(HAND);
export default HAND;

// -------------------
// Modifier generators
// -------------------

function twoPairModifiers() {
  let modifiers = [];

  for (let i = 0; i < RANKS.length; i++)
    for (let j = i + 1; j < RANKS.length; j++)
      modifiers.push({
        value: RANKS[i].value * 100 + RANKS[j].value,
        name: `${RANKS[i].name} and ${RANKS[j].name}`,
        pair: [RANKS[i].value, RANKS[j].value],
      });

  return modifiers;
}

function fullHouseModifiers() {
  let modifiers = [];

  for (let i = 0; i < RANKS.length; i++)
    for (let j = 0; j < RANKS.length; j++)
      if (i !== j)
        modifiers.push({
          value: RANKS[i].value * 100 + RANKS[j].value,
          name: `Three ${RANKS[i].name}s, two ${RANKS[j].name}s`,
          pair: [RANKS[i].value, RANKS[j].value],
        });

  return modifiers;
}
