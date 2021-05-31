import { Server } from 'boardgame.io/server';
import serve from 'koa-static'
import { nanoid } from 'nanoid';
import path from 'path';
import randomWords from 'random-words';
import { Poker } from './src/game/Poker';

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

const frontendPath = path.resolve(__dirname, './build');
server.app.use(serve(frontendPath));

server.run(80, () => {
  server.app.use(async (ctx, next) => await serve(frontendPath)(Object.assign(ctx, { path: 'index.html' }), next));
});
