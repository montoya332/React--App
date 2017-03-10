import jsdom from 'jsdom';
import jquery from 'jquery';
import TestUtils from 'react-addons-test-utils';
import ReactDOM from 'react-dom';
import chai, { expect } from 'chai';
import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducers from 'ReactApp/reducers/rootReducer';
import chaiJquery from 'chai-jquery';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';

/* Set up testing environment */
global.document = jsdom.jsdom('<!doctype html><html><body></body></html>');
global.window = global.document.defaultView;
global.navigator = { userAgent: 'all' };
const $ = jquery(global.window);

/* build */
function renderComponent(ComponentClass, props, state) {
	injectTapEventPlugin();

	const componentInstance = TestUtils.renderIntoDocument(
		<MuiThemeProvider>
			<Provider store={createStore(reducers, state)}>
				<ComponentClass {...props} />
			</Provider>
		</MuiThemeProvider>
	);

	return $(ReactDOM.findDOMNode(componentInstance)); // produces HTML
}
/* simulating events */
$.fn.simulate = function(eventName, value) {
	if (value) {
		this.val(value);
	}
	TestUtils.Simulate[eventName](this[0]);
}
/* Set up chai-jquery */

chaiJquery(chai, chai.util, $);

export { renderComponent, expect };