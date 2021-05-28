export default function stripSecrets(G, ctx, playerID) {
  if (ctx.phase === 'third') {
    return G;
  }

  const { deck, players, ...strippedG } = G;
  let strippedPlayers = {};

  for (const player in players) {
    if (player === playerID) {
      strippedPlayers[player] = players[player];
    } else {
      strippedPlayers[player] = { ...players[player], deck: [] };
    }
  }

  return { ...strippedG, players: strippedPlayers };
}
