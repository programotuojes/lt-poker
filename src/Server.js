import { Server } from 'boardgame.io/server';
import { nanoid } from 'nanoid';
import randomWords from 'random-words';
import { Poker } from './game/Poker';

const server = Server({
  games: [Poker],
  uuid: randomWords,
  generateCredentials: (size) => {
    if (typeof size !== 'number') {
      return nanoid();
    } else {
      return nanoid(size);
    }
  },
});

server.run(8000);
