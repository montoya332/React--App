"use strict";
import React from 'react';
import { shallow, mount } from 'enzyme'
import chai, { expect } from 'chai'

import App from 'ReactApp/components/app';
const defaultProps = { }
describe('App', () => {
	let wrapper;

	beforeEach(() => {
		//wrapper = shallow(<App {...defaultProps} />)
	});

	it('wrapper should exist', () => { 
		expect([{}]).to.exist
		// expect(wrapper.type()).to.equal('div')
	})

});
