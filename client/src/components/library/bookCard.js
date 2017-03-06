import React from 'react';

export default (props) => {
	return (
		<div className="card hoverable">
			<div className="card-image">
				<img src={props.imageLinks.thumbnail} />
				<span className="card-title">{props.title}</span>
			</div>
			<div className="card-content">
				<p>{props.subtitle}</p>
			</div>
			<div className="card-action">
				<a href={props.infoLink}>More Info</a>
			</div>
		</div>
	);
}