import React from 'react';
import { shallow } from 'enzyme';
import chai, { expect } from 'chai';
// import App from 'ReactApp/components/app';
const defaultProps = {};
describe('App', () => {
	let wrapper;
	beforeEach(() => {
		wrapper = shallow(<div />);
	});

	it('wrapper should exist', () => {
		expect(wrapper.type()).to.equal('div');
	});
});
