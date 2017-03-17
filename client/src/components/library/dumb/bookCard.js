import React from 'react';
import {Card, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';

export default (props) => {

	return (
		<Card style={{width:'500px'}}>
			<CardHeader
			  title={props.title}
			  subtitle={props.subtitle}
			  avatar={props.imageLinks.thumbnail}
			/>
			<CardMedia
			  overlay={<CardTitle title={props.title} subtitle={props.subtitle} />}
			>
			  <img src={props.imageLinks.thumbnail} />
			</CardMedia>
			<CardTitle title={props.title} subtitle={props.subtitle} />
			<CardText>
			  {props.description}
			</CardText>
		</Card>
		)
}