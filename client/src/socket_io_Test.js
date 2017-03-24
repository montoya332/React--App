import hooks from 'feathers-hooks';
import feathers from 'feathers/client';
import socketio from 'feathers-socketio/client';
// import io from 'socket.io-client/socket.io';
import io from 'socket.io-client';
if(!global._babelPolyfill) { require('babel-polyfill'); }

const socket = io('http://localhost:3030', { transports: ['websocket'] });
const app = feathers()
  // .configure(feathers.hooks())
  .configure(socketio(socket));
 var userService = app.service('users');
 userService.on('updated', function(data) {
    console.log('Someone updated a message', data);
  });
  userService.on('patched', function(data) {
    console.log('Someone patched a message', data);
  });
  userService.on('created', function(data) {
    console.log('Someone created a user', data);
  });
  socket.emit('users::find', {  }, (error, data) => {
  console.log('Found users', data);
});
window.userService = userService
userService.find().then(function(data){console.log('Users: ',data)})