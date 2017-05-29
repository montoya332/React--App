import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Row, Column } from 'react-foundation';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FontIcon from 'material-ui/FontIcon';
import SvgIcon from 'material-ui/SvgIcon';
import {blue500, red500, greenA200} from 'material-ui/styles/colors';
import {UpdateProfileImage, EditProfileInfo} from '../smart';
import IconButton from 'material-ui/IconButton';
import ModeEditIcon from 'material-ui/svg-icons/editor/mode-edit';

export class LoginContainer extends Component {
	constructor(props) {
		super(props);
		this.state = {
			updateProfileImage: false,
			editProfileModal: false
		};
	}
	componentWillReceiveProps(nextProps) {
	}
	handleOpen = (e) => {
		this.setState({
			updateProfileImage: true
		});
	}
	handleOpenEdit = (e) => {
		this.setState({
			editProfileModal: true
		});
	}
	handleClose = (e) => {
		this.setState({
			editProfileModal: false,
			updateProfileImage: false
		});
	}
	renderUserImage() {
		if (false) {
			return <img className="card__photo--preview" src="http://placehold.it/350x150" />;
		}
		return <span className="card__photo--edit" onClick={this.handleOpen}>A</span>;
	}
	renderMenuIcons() {
		return (
			<div className="float-right">
				<IconButton><ModeEditIcon onClick={this.handleOpenEdit}/></IconButton>
			</div>
		);
	}
	render() {
		return (
			<div className="user_profile__container bg-img">
				<div className="bg-img">
					<div className="bg-img__visible-content bg-img__show-default">
						<Row className="" style={{maxWidth: '110rem'}}>
							<Column small={12} large={3} />
							<Column small={12} large={6}>
								<Card className="top_spacer100">
									<CardText>
										{this.renderMenuIcons()}
										<div className="card__header">
											<div className="card__photo_wrapper">
												{this.renderUserImage()}
											</div>
										</div>
									</CardText>
									<CardTitle title="Arturo Montoya" subtitle="San Francisco, California" />
								</Card>
								<Card className="top_spacer10"><CardText>About</CardText></Card>
							</Column>
							<Column small={12} large={3} />
						</Row>
					</div>
				</div>
				<UpdateProfileImage open={this.state.updateProfileImage} onRequestClose={this.handleClose}/>
				<EditProfileInfo open={this.state.editProfileModal} onRequestClose={this.handleClose}/>
			</div>
		);
	}
}
function mapStateToProps(state) {
	const clientUser = state.clientUser.toJS();
	return { clientUser };
}
function mapDispatchToProps(dispatch) {
	return bindActionCreators({}, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer);
