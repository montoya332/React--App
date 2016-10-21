import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import ReduxPromise from 'redux-promise';

import reducers from './rootReducer';
import routes from './routes';

const createStoreWithMiddleware = compose(applyMiddleware(
    ReduxPromise
  ),typeof window === 'object' && typeof window.devToolsExtension !== 'undefined'
    ? window.devToolsExtension()
  : f => f)(createStore)

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <Router history={browserHistory} routes={routes}/>
  </Provider>
, document.querySelector('#App'));
