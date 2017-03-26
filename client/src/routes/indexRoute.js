import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import {
	browserHistory,
	BrowserRouter as Router,
	Route,
	Link,
	Redirect,
	withRouter
} from 'react-router-dom'
import { Switch } from 'react-router'
import App from '../components/app';
import {LibraryContainer} from '../components/library/index';
import ErrorPage404 from '../components/general/404error';
import ChatApp from '../components/messages/container/chatContainer'
import { app } from 'utils/socketio';
import LoginContainer from '../components/general/containers/loginContainer';
import createHistory from 'history/createBrowserHistory'
const history = createHistory()
export const PublicRoutes = ({store}) => {

	return (
			<App>
				<Switch>
					<Route exact path="/library" component={LibraryContainer}/>
					<Route path="/login" component={LoginContainer}/>
					<Redirect to={{  pathname: '/login' }}/> 
				</Switch>
			</App>
	)
}
export const PrivateRoutes = (props) => {
	return (
		<App>
			<Switch>
				<Route exact path="/messages" component={ChatApp}/>
				<Route component={ ErrorPage404 }/>
			</Switch>
		</App>
	)
}
export const AuthPrivateRoutes = withRouter(({ history,store,...rest }) => {
  return store.getState().clientUser.get('token') ? (
    <PrivateRoutes {...rest} />
  ) : (
    <PublicRoutes {...rest} />
  )
})
export const AppRoutes = (store) => {
	return (
		<Router history={history}>
			<div>
				<AuthPrivateRoutes store={store}/>
			</div>
		</Router>
    )
}

export default AppRoutes


