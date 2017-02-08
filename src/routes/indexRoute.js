import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, IndexRedirect, browserHistory } from 'react-router';

import App from '../components/app';
import Library from '../components/library/index';
import ErrorPage404 from '../components/general/404error';

const AppRoutes = (
	<Route path="/" component={App}>
		<IndexRedirect to="library" />
		<Route path="library" component={Library} />
		<Route path="*" component={ ErrorPage404 }/>
	</Route>
)

export default AppRoutes