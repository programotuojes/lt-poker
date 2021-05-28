import React, { useEffect, useState } from 'react';
import { Client } from 'boardgame.io/react';
import { Poker } from '../../game/Poker';
import PokerBoard from './PokerBoard';
import { SocketIO } from 'boardgame.io/multiplayer';
import { BACKEND_URL, CREDENTIALS, PLAYER_ID } from '../../constants/Constants';
import { useHistory, useParams } from 'react-router-dom';
import { checkMatchID } from '../validation/Validation';
import Loading from '../useful/Loading';

const PokerClient = Client({
  game: Poker,
  board: PokerBoard,
  multiplayer: SocketIO({ server: BACKEND_URL }),
  loading: Loading,
});

function Gameplay() {
  const history = useHistory();

  const [loading, setLoading] = useState(true);

  const playerID = localStorage.getItem(PLAYER_ID);
  const { matchID } = useParams();
  const credentials = localStorage.getItem(CREDENTIALS);

  useEffect(() => {
    checkMatchID(matchID, false).then((err) => {
      if (err) {
        history.push('/');
      } else {
        setLoading(false);
      }
    });
  }, [history, matchID]);

  return (
    <>
      {(loading && <Loading />) || (
        <PokerClient
          playerID={playerID}
          matchID={matchID}
          credentials={credentials}
          debug={!!localStorage.getItem('DEBUG')}
        />
      )}
    </>
  );
}

export default Gameplay;
