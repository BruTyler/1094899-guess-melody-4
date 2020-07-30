export enum GameType {
  ARTIST = `artist`,
  GENRE = `genre`,
};

export enum AuthorizationStatus {
  NO_AUTH = `NO_AUTH`,
  AUTH = `AUTH`,
};

export enum AppRoute {
  AUTH = `/login`,
  ROOT = `/`,
  GAME_OVER = `/lose`,
  GAME_WIN = `/result`
};

export enum WelcomeScreenBehaviour {
  SHOW = `SHOW`,
  HIDE = `HIDE`,
};
