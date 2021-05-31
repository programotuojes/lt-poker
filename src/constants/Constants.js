const { protocol, hostname, port } = window.location;
export const BACKEND_URL = `${protocol}//${hostname}:${port}`;

export const USERNAME = 'username';
export const CREDENTIALS = 'credentials';
export const PLAYER_ID = 'playerID';
