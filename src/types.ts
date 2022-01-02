export type UserData = { time: Date; done: boolean };

export enum ConnectionState {
  DISCONNECTED,
  CONNECTING,
  ERROR,
  CONNECTED,
}
