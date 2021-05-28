import { SUITS } from '../constants/Cards';
import HAND, { Hands } from '../constants/Hands';

export function isHandValid(currentHandIdx, currentModIdx, previousHandIdx, previousModIdx) {
  const current = Hands[currentHandIdx];
  const previous = Hands[previousHandIdx];

  return (
    current.value * 10000 + current.modifiers[currentModIdx].value >
    previous.value * 10000 + previous.modifiers[previousModIdx].value
  );
}

export function isHandPresent(players, handIdx, modifierIdx) {
  const deck = Object.values(players)
    .map((player) => player.deck)
    .reduce((acc, playerDeck) => acc.concat(playerDeck), []);

  function getRanks(deck, suit) {
    if (suit) {
      return deck.map((card) => card.suit === suit && card.rank);
    } else {
      return deck.map((card) => card.rank);
    }
  }

  function containsSameCard(times, modifier) {
    const ranks = getRanks(deck);
    let index = 0;

    for (let i = 0; i < times; i++) {
      index = ranks.indexOf(modifier, index);
      if (index === -1) {
        return false;
      }
      index++;
    }

    return true;
  }

  function containsStraight(from, ranks) {
    for (let i = from; i < from + 5; i++) {
      if (!ranks.includes(i)) {
        return false;
      }
    }

    return true;
  }

  const hand = Hands[handIdx];
  const modifier = hand.modifiers[modifierIdx];

  switch (hand.value) {
    case HAND.HIGH_CARD.value:
      return getRanks(deck).includes(modifier.value);

    case HAND.ONE_PAIR.value:
      return containsSameCard(2, modifier.value);

    case HAND.TWO_PAIR.value:
      const [card1, card2] = modifier.pair;
      const ranks = getRanks(deck);
      return ranks.includes(card1) && ranks.includes(card2);

    case HAND.THREE_KIND.value:
      return containsSameCard(3, modifier.value);

    case HAND.FULL_HOUSE.value:
      const [threeCards, twoCards] = modifier.pair;
      return containsSameCard(3, threeCards) && containsSameCard(2, twoCards);

    case HAND.STRAIGHT.value:
      return containsStraight(modifier.value, getRanks(deck));

    case HAND.FOUR_KIND.value:
      return containsSameCard(4, modifier.value);

    case HAND.STRAIGHT_FLUSH.value:
      let found = false;

      SUITS.forEach((suit) => {
        if (containsStraight(modifier.value, getRanks(deck, suit))) {
          found = true;
        }
      });

      return found;

    case HAND.ROYAL_FLUSH.value:
      if (modifier === HAND.ROYAL_FLUSH.modifiers[0]) {
        let found = false;

        SUITS.forEach((suit) => {
          if (containsStraight(10, getRanks(deck, suit))) {
            found = true;
          }
        });

        return found;
      }

      return containsStraight(10, getRanks(deck, modifier));

    default:
      return false;
  }
}
