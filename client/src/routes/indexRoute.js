import React from 'react';
import createHistory from 'history/createBrowserHistory';
import { Switch } from 'react-router';
import {
	BrowserRouter as Router,
	Route,
	Redirect,
	withRouter
} from 'react-router-dom';
import {LoginContainer, UserProfileContainer} from 'components/userProfile';
import App from '../components/app';
import {LibraryContainer} from '../components/library/index';
import ErrorPage404 from '../components/general/404error';
import ChatApp from '../components/messages/container/chatContainer';

const history = createHistory();

export const PublicRoutes = ({store}) => (
	<Switch>
		<Route path="/profile" component={UserProfileContainer} />
		<Route exact path="/library" component={LibraryContainer} />
		<Route path="/login" component={LoginContainer} />
		<Redirect to={{ pathname: '/login' }} />
	</Switch>
	);

export const PrivateRoutes = props => (
	<Switch>
		<Route path="/profile" component={UserProfileContainer} />
		<Route exact path="/library" component={LibraryContainer} />
		<Route path="/login" component={LoginContainer} />
		<Route exact path="/messages" component={ChatApp} />
		<Route component={ErrorPage404} />
	</Switch>
	);

export const AuthPrivateRoutes = withRouter(({ history, store, ...rest }) => {
	// store.getState().clientUser.get('token')
	const signedInUser = localStorage.getItem('feathers-jwt');
	const appRoutes = [<PublicRoutes {...rest} />];
	if (signedInUser) {
		appRoutes.push(<PrivateRoutes {...rest} />);
	}
	return <App>{appRoutes}</App>;
});

export const AppRoutes = store => (
	<Router history={history}>
		<AuthPrivateRoutes store={store} />
	</Router>
);

export default AppRoutes;

