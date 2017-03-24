import hooks from 'feathers-hooks';
import feathers from 'feathers/client';
import socketio from 'feathers-socketio/client';
import authentication from 'feathers-authentication/client';
import io from 'socket.io-client';
if(!global._babelPolyfill) { require('babel-polyfill'); }

const socket = io('http://localhost:3030', { transports: ['websocket'] });

const app = feathers()
  .configure(socketio(socket))
  .configure(hooks())
  .configure(authentication({ storage: window.localStorage }));
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

app.authenticate({
  type: 'local',
  'email': 'montoya332@live.com',
  'password': 'test123'
}).then(function(result){
  console.log('Authenticated!', result);
}).catch(function(error){
  console.error('Error authenticating!', error);
})