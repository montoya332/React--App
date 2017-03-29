import hooks from 'feathers-hooks';
import feathers from 'feathers/client';
import socketio from 'feathers-socketio/client';
import authentication from 'feathers-authentication/client';
import io from 'socket.io-client';
if(!global._babelPolyfill) { require('babel-polyfill'); }

export const socket = io('http://localhost:3030', { transports: ['websocket'] });
export const app = feathers()
  .configure(socketio(socket))
  .configure(hooks())
  .configure(authentication({ storage: window.localStorage }));


// A placeholder image if the user does not have one
export const PLACEHOLDER = 'https://placeimg.com/60/60/people';
// An anonymous user if the message does not have that information
export const dummyUser = {
  avatar: PLACEHOLDER,
  email: 'Anonymous'
};

window.PLACEHOLDER = PLACEHOLDER
// An anonymous user if the message does not have that information
window.dummyUser = dummyUser;