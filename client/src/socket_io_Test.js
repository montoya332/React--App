import hooks from 'feathers-hooks';
import feathers from 'feathers/client';
import socketio from 'feathers-socketio/client';
import authentication from 'feathers-authentication/client';
import io from 'socket.io-client';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import ChatApp from './components/messages/container/chatContainer'
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
window.app = app

// A placeholder image if the user does not have one
window.PLACEHOLDER = 'https://placeimg.com/60/60/people';
// An anonymous user if the message does not have that information
window.dummyUser = {
  avatar: PLACEHOLDER,
  email: 'Anonymous'
};


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

app.authenticate().then(() => {
  ReactDOM.render(<div id="app" className="flex flex-column">
    <header className="title-bar flex flex-row flex-center">
      <div className="title-wrapper block center-element">
        <img className="logo" src="http://feathersjs.com/img/feathers-logo-wide.png"
          alt="Feathers Logo" />
        <span className="title">Chat</span>
      </div>
    </header>

    <ChatApp />
  </div>, document.body);
}).catch(error => {
  if(error.code === 401) {
    window.location.href = '/login.html'
  }

  console.error(error);
});