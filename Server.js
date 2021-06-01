import { Server } from 'boardgame.io/server';
import fs from 'fs';
import enforceHttps from 'koa-sslify';
import http from 'http';
import serve from 'koa-static';
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
  https: {
    cert: fs.readFileSync('/etc/letsencrypt/live/poker.ozas-gaming.org/fullchain.pem'),
    key: fs.readFileSync('/etc/letsencrypt/live/poker.ozas-gaming.org/privkey.pem'),
  },
});

const frontendPath = path.resolve(__dirname, './build');
server.app.use(enforceHttps());
server.app.use(serve(frontendPath));

server.run(443, () => {
  server.app.use(async (ctx, next) => await serve(frontendPath)(Object.assign(ctx, { path: 'index.html' }), next));
});

http.createServer(server.app.callback()).listen(80);
