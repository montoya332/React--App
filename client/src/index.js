import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import ReduxPromise from 'redux-promise';
import ReduxThunk from 'redux-thunk';
import injectTapEventPlugin from 'react-tap-event-plugin';
import reducers from './reducers/rootReducer';
import routes,{AppRoutes} from './routes/indexRoute';
import {
  BrowserRouter as Router
} from 'react-router-dom'
import createBrowserHistory from 'history/createBrowserHistory'
import '../styles/style.scss';
import { app } from 'utils/socketio';

const history = createBrowserHistory()

injectTapEventPlugin();



const middleware = [ReduxThunk, ReduxPromise];
const createStoreWithMiddleware = compose(applyMiddleware(
    ...middleware
  ),typeof window === 'object' && typeof window.devToolsExtension !== 'undefined'
    ? window.devToolsExtension()
  : f => f)(createStore)


app.authenticate({
  type: 'local',
  'email': 'montoya332@live.com',
  'password': 'test123'
}).then(function(result){
   ReactDOM.render(
  <MuiThemeProvider>
      <Provider store={createStoreWithMiddleware(reducers)}>
        <Router>
          <AppRoutes />
        </Router>
      </Provider>
    </MuiThemeProvider>
, document.querySelector('#App'));
}).catch(function(error){
  console.error('Error authenticating!', error);
})


