import React from 'react';
import moment from 'moment';
import {List, ListItem} from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Subheader from 'material-ui/Subheader';
import Avatar from 'material-ui/Avatar';
import {grey400, darkBlack, lightBlack} from 'material-ui/styles/colors';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';

export default (props) => {
	const renderMessage = (message={}, index,list) =>{
		const sender = message.sentBy || {};
		const isLastTile = list.length  == index + 1
		return (
			<div key={index}>
				<ListItem
					leftAvatar={<Avatar src={sender.avatar || PLACEHOLDER} alt={sender.email} />}
					primaryText="Brunch this weekend?"
					secondaryText={
						<p>
							<span style={{color: darkBlack}}>{sender.email}</span> --
							{moment(message.createdAt).format('MMM Do, hh:mm:ss')} --
							{message.text}
						</p>
					}
					secondaryTextLines={2}
				/>
				{!isLastTile && <Divider inset={true} />}
			</div>
		)
	}
	return (
		<div>
			<List>
				<Subheader>Messages</Subheader>
				{props.messages.map(renderMessage)}
			</List>
		</div>
	)
}
