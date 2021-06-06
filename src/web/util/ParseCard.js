import Back from '../../cardImages/Back.png';

import S9 from '../../cardImages/S9.png';
import S10 from '../../cardImages/S10.png';
import SJ from '../../cardImages/SJ.png';
import SQ from '../../cardImages/SQ.png';
import SK from '../../cardImages/SK.png';
import SA from '../../cardImages/SA.png';

import C9 from '../../cardImages/C9.png';
import C10 from '../../cardImages/C10.png';
import CJ from '../../cardImages/CJ.png';
import CQ from '../../cardImages/CQ.png';
import CK from '../../cardImages/CK.png';
import CA from '../../cardImages/CA.png';

import H9 from '../../cardImages/H9.png';
import H10 from '../../cardImages/H10.png';
import HJ from '../../cardImages/HJ.png';
import HQ from '../../cardImages/HQ.png';
import HK from '../../cardImages/HK.png';
import HA from '../../cardImages/HA.png';

import D9 from '../../cardImages/D9.png';
import D10 from '../../cardImages/D10.png';
import DJ from '../../cardImages/DJ.png';
import DQ from '../../cardImages/DQ.png';
import DK from '../../cardImages/DK.png';
import DA from '../../cardImages/DA.png';


function getSpades(rank) {
  switch (rank) {
    case 9:
      return S9;

    case 10:
      return S10;

    case 11:
      return SJ;

    case 12:
      return SQ;

    case 13:
      return SK;

    case 14:
      return SA;

    default:
      return Back;
  }
}

function getClubs(rank) {
  switch (rank) {
    case 9:
      return C9;

    case 10:
      return C10;

    case 11:
      return CJ;

    case 12:
      return CQ;

    case 13:
      return CK;

    case 14:
      return CA;

    default:
      return Back;
  }
}

function getHearts(rank) {
  switch (rank) {
    case 9:
      return H9;

    case 10:
      return H10;

    case 11:
      return HJ;

    case 12:
      return HQ;

    case 13:
      return HK;

    case 14:
      return HA;

    default:
      return Back;
  }
}

function getDiamonds(rank) {
  switch (rank) {
    case 9:
      return D9;

    case 10:
      return D10;

    case 11:
      return DJ;

    case 12:
      return DQ;

    case 13:
      return DK;

    case 14:
      return DA;

    default:
      return Back;
  }
}

export default function getImage(card) {
  if (card === undefined) {
    return Back;
  }

  switch (card.suit) {
    case 'Spades':
      return getSpades(card.rank);

    case 'Clubs':
      return getClubs(card.rank);

    case 'Hearts':
      return getHearts(card.rank);

    case 'Diamonds':
      return getDiamonds(card.rank);

    default:
      return Back;
  }
}
