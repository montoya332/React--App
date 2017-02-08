import React from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import ReduxPromise from 'redux-promise';
import injectTapEventPlugin from 'react-tap-event-plugin';
import reducers from './rootReducer';
import routes from './routes';

injectTapEventPlugin();

const createStoreWithMiddleware = compose(applyMiddleware(
    ReduxPromise
  ),typeof window === 'object' && typeof window.devToolsExtension !== 'undefined'
    ? window.devToolsExtension()
  : f => f)(createStore)

ReactDOM.render(
	<MuiThemeProvider>
  		<Provider store={createStoreWithMiddleware(reducers)}>
    		<Router history={browserHistory} routes={routes}/>
  		</Provider>
  	</MuiThemeProvider>
, document.querySelector('#App'));
