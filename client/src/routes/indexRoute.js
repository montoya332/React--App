import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'
import { Switch } from 'react-router'
import App from '../components/app';
import {LibraryContainer} from '../components/library/index';
import ErrorPage404 from '../components/general/404error';
import ChatApp from '../components/messages/container/chatContainer'
//<IndexRedirect to="library" />
export const AppRoutes = () => {
	return (
		<App>
			<Switch>
				<Route exact path="/library" component={LibraryContainer}/>
				<Route exact path="/messages" component={ChatApp}/>
				<Route component={ ErrorPage404 }/>
			</Switch>
		</App>
    )
}

export default AppRoutes


