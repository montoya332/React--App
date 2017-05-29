import React, { Component } from 'react';

export default class ERROR404Component extends Component {
	render() {
		return (
			<div className="cloud_container">
				<div>
					<div className="cloud cloud--x1" />
					<div className="cloud cloud--x1_5" />
					<div className="cloud cloud--x2" />
					<div className="cloud cloud--x3" />
					<div className="cloud cloud--x4" />
					<div className="cloud cloud--x5" />
				</div>
				<div className="center_container">
					<div className="cloud__404">404</div>
					<hr className="cloud__hr" />
					<div className="cloud__1">THE PAGE</div>
					<div className="cloud__2">WAS NOT FOUND</div>
					<a className="cloud__btn" href="#">Return to Home</a>
				</div>
			</div>
		);
	}
}
