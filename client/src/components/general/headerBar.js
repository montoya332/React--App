import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import {List, ListItem} from 'material-ui/List';
import {list} from 'ReactApp/stubData/tabData';

export default class Navigation extends Component {
	constructor(props) {
		super(props);
		this.state = {open: false};
	}
	handleToggle = () => this.setState({open: !this.state.open});
	handleClose = () => this.setState({open: false});

	renderListItem = (item, index) => {
		if (item.children) {
			return (
				<ListItem
					key={index}
					value={1}
					primaryText={item.title}
					primaryTogglesNestedList
					nestedItems={item.children.map(this.renderListItem)}
				/>
			);
		}
		return (
			<ListItem
				key={index}
				value={2}
				primaryText={item.title}
				onTouchTap={this.handleClose}
			/>
		);
	}
	render() {

		return (
			<div>
				<AppBar
					title="React App"
					iconClassNameRight="muidocs-icon-navigation-expand-more"
					onLeftIconButtonTouchTap={this.handleToggle} />
				<Drawer
					docked={false}
					width={225}
					open={this.state.open}
					onRequestChange={open => this.setState({open})} >
					<List defaultValue={1}>
						{ list.map(this.renderListItem) }
					</List>
				</Drawer>
			</div>
		);
	}
}
