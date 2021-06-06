import { BACKEND_URL } from '../../constants/Constants';

export function checkUsername(username) {
  if (typeof username !== 'string') {
    return 'Username must be a string';
  }

  if (username.trim().length < 2) {
    return 'Length must be more than 2 characters';
  }

  if (username.trim().length > 10) {
    return 'Length must be less than 10 characters';
  }

  return null;
}

export async function checkMatchID(matchID, checkIfFull) {
  if (typeof matchID !== 'string') {
    return 'Username must be a string';
  }

  if (matchID.trim().length < 1) {
    return 'Must not be empty';
  }

  const response = await fetch(`${BACKEND_URL}/games/lt-poker/${matchID}`);

  if (!response.ok) {
    return 'Match not found';
  }

  if (checkIfFull) {
    const { players } = await response.json();
    const emptySlot = players.find((player) => player.name === undefined);

    if (emptySlot === undefined) {
      return 'Match full';
    }
  }

  return null;
}
