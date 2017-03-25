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

export const PublicRoutes = () => {
	return (
		<div>
			<Route path="/public" component={Public}/>
			<Route path="/login" component={LoginComponent}/>
		</div>
	)
}
export const PrivateRoutes = () => {
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
const AuthPrivateRoutes = ({ component, ...rest }) => (
  <Route {...rest} render={props => (
    fakeAuth.isAuthenticated ? (
      React.createElement(component, props)
    ) : (
      <Redirect to={{
        pathname: '/login',
        state: { from: props.location }
      }}/>
    )
  )}/>
)
/* -------- */

const fakeAuth = {
	isAuthenticated: false,
	authenticate(cb) {
		var self = this
		console.log('authenticate')
		app.authenticate({
			type: 'local',
			'email': 'montoya332@live.com',
			'password': 'test123'
		}).then(function(result) {
			console.log('authenticate')
			self.isAuthenticated = true
			console.log(self)
		}).catch(function(error) {
			console.error('Error authenticating!', error);
		})
	},
	signout(cb) {
		var self = this
		app.logout().then(function(result) {
			self.isAuthenticated = false
		})
	}
}


const Public = () => <h3>Public</h3>
const Protected = () => <h3>Protected</h3>

class LoginComponent extends Component {
	constructor(props) {
		super(props);
		this.state = {
			redirectToReferrer: false
		}
		this.login = this.login.bind(this)
	}

  login () {
    fakeAuth.authenticate(() => {
      this.setState({ redirectToReferrer: true })
    })
  }

  render() {
  	const { redirectToReferrer } = this.state
  	const {location} = this.props
  	const {state} = location
    const { from } = state || { from: { pathname: '/' } }
    
    
    if (redirectToReferrer) {
      return (
        <Redirect to={from}/>
      )
    }
    
    return (
      <div>
        <p>You must log in to view the page at {from.pathname}</p>
        <button onClick={this.login}>Log in</button>
      </div>
    )
  }
}
const AuthButton = withRouter(({ history }) => (
  fakeAuth.isAuthenticated ? (
    <PrivateRoutes/>
  ) : (
    <PublicRoutes/>
  )
))
export const AppRoutes = (store) => {
	console.log('store', store.getState())
	return (
		<Router>
			<div>
				<PublicRoutes/>
				<AuthPrivateRoutes path="/protected" component={Protected}/>
			</div>
		</Router>
    )
}

export default AppRoutes


