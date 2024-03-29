import * as Protocol from '../../../constants/Protocol.js';
import io from 'socket.io-client';

// Socket manager
export default class Socket {

  constructor({ onChange, onSocketError, onMessage, onGameState, onRefreshPlayer, onUpdateClient }) {
    this.onChange = onChange;
    this.onSocketError = onSocketError;
    this.onMessage = onMessage;
    this.onGameState = onGameState;
    this.onRefreshPlayer = onRefreshPlayer;
    this.onUpdateClient = onUpdateClient;
    this.socket = null;
    this.user = null;
    this.port = null;
  }

  connect = (host) => {
    // Connect
    this.socket = io.connect(host);

    // Set listeners
    this.socket.on(Protocol.CONNECT, this.onConnected);
    this.socket.on(Protocol.DISCONNECT, this.onDisconnected);
    this.socket.on(Protocol.CONNECT_ERR, this.onError);
    this.socket.on(Protocol.RECONNECT_ERR, this.onError);
  };

  // Received connect event from socket
  onConnected = () => {
    this.sendIdent();
    this.socket.on(Protocol.IM, this.onMessage);
    this.socket.on(Protocol.REFRESH_PLAYER, this.onRefreshPlayer);
    this.socket.on(Protocol.GAME_STATE, this.onGameState);
    this.socket.on(Protocol.UPDATE_CLIENT, this.onUpdateClient);
    this.onChange(true);
  };

  // Received disconnect event from socket
  onDisconnected = () => this.onChange(false);

  // Send an identification message to the server
  sendIdent = () => this.socket.emit(Protocol.IDENT, this.user);

  // Send a message over the socket
  sendIm = message => this.socket.emit(Protocol.IM, message);

  sendMessage = (category, message) => this.socket.emit(category, message);

  // Close the socket
  disconnect = () => this.socket.close();

  // Received error from socket
  onError = message => {
    this.onSocketError(message);
    this.disconnect();
  };

}