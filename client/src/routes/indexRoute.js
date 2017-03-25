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
	// const clientUser = store.getState().clientUser.get('token')
	// console.log(clientUser)
	return (
			<Switch>
				<Route path="/login" component={LoginContainer}/>
			</Switch>
	)
}
export const PrivateRoutes = (props) => {
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
const AuthPrivateRoutes = ({ store, component, ...rest }) => {
  

	console.log('store',fakeAuth.isAuthenticated, store.getState())


  return <Route {...rest} render={props => (
    fakeAuth.isAuthenticated 
    ? ( <PrivateRoutes /> 
    	) : (
      <Redirect to={{  pathname: '/login',  state: { from: props.location } }}/> 
    )
  )}/>
}
/* -------- */
const AuthRoutes = withRouter(({ history,store,...rest }) => (
  store.getState().clientUser.get('token') ? (
    <PrivateRoutes {...rest} />
  ) : (
    <PublicRoutes {...rest} />
  )
))
const fakeAuth = {
	isAuthenticated: false,
	authenticate(cb) {
		this.isAuthenticated = true
	},
	signout(cb) {
		this.isAuthenticated = false
	}
}


export const AppRoutes = (store) => {
	return (
		<Router history={history}>
			<div>
				<AuthRoutes store={store}/>
			</div>
		</Router>
    )
}

export default AppRoutes


