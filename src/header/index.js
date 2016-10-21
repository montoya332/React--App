import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

const links = [{id: '2', title:'Library', href: '/library'}]

export default class Navigation extends Component {
    renderLinks() {
          return links.map(function(item) {
                  return (
                    <li key={item.id}><Link className="white-text" to={item.href}>{item.title}</Link></li>
                  );
                });
    }


    render() {
        return (
        	<nav className="teal" role="navigation">
                <div className="nav-wrapper container">
                    <Link id="logo-container" to="#" className="brand-logo white-text">React Examples</Link>
                    <ul id="nav-desktop" className="right hide-on-med-and-down">
                       {this.renderLinks()}
                    </ul>

                    <ul id="nav-mobile" className="side-nav">
                        {this.renderLinks()}
                    </ul>
                    <a href="#" data-activates="nav-mobile" className="button-collapse"><i className="material-icons">menu</i></a>
                </div>
            </nav>
        );
    }
}
