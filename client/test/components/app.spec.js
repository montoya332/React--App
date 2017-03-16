import React from 'react';
import { shallow } from 'enzyme';
import chai, { expect } from 'chai'
// import App from 'ReactApp/components/app';
const defaultProps = {}
describe('App', function() {
	let wrapper;
	beforeEach(function() {
		wrapper = shallow( <div />);  
	});

	it('wrapper should exist', function() {
		expect(wrapper.type()).to.equal('div')
	});
});