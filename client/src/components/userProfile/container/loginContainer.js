import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Row, Column } from 'react-foundation';
import * as ClientUserActions from 'actionCreator/general/clientUser';
// TODO: Use http://www.material-ui.com/#/components/divider with Textfield
export class LoginContainer extends Component {
	constructor(props) {
		super(props);
		// this.state = {}
		this.onSubmit = this.onSubmit.bind(this);
	}

	componentWillReceiveProps(nextProps) {
		const onChangeClientUser = nextProps.clientUser.token != this.props.clientUser.token;
		if (onChangeClientUser) {
			nextProps.history.push('/messages', { some: 'state' });
		}
	}

	onSubmit(e) {
		e.preventDefault();
		const {signin, signup, forgotpassword} = this.props;
		const {hash} = this.props.location;
		const email = this.textEmail.value || 'montoya332@live.com';
		const password = this.textPassword.value || 'test123';
		switch (hash) {
		case '#signup':
			return signup && signup({email, password});
		case '#forgotpassword':
			return forgotpassword && forgotpassword({email, password});
		default :
			return signin && signin({email, password});
		}
	}
	getButtonText() {
		const {hash} = this.props.location;
		let btnText = 'Log in';
		if (hash == '#signup') {
			btnText = 'Sign Up';
		} else if (hash == '#forgotpassword') {
			btnText = 'Send Email';
		}
		return btnText;
	}
	render() {
		const {hash} = this.props.location;
		const showSignUp = hash == '#signup';
		const btnText = this.getButtonText();

		return (
			<div className="form__signin__container">
				<Row className="display">
					<Column small={12} large={3}/>
					<Column small={12} large={6}>
						<form className="form__signin" onSubmit={this.onSubmit}>
							<div className="form__signin__group">
								<input className="form-control" placeholder="Email" type="text" name="user[email]" ref={(input) => { this.textEmail = input; }}/>
							</div>
							<div className="form__signin__group">
								<input className="form-control" placeholder="Password" type="password" name="user[password]" ref={(input) => { this.textPassword = input; }}/>
							</div>
							<button type="submit" className="button expanded">{btnText}</button>
							<br />
							<div>
								<a className="float-left text-color-white" href="#forgotpassword">Forgot password</a>
								{!showSignUp && <a className="float-right text-color-white" href="#signup">New here? Sign Up</a>}
								{showSignUp && <a className="float-right text-color-white" href="#">Log In</a>}
							</div>
						</form>
					</Column>
					<Column small={12} large={3}/>

				</Row>
			</div>
		);
	}
}
function mapStateToProps(state, ownProps) {
	const clientUser = state.clientUser.toJS();
	return { clientUser };
}
function mapDispatchToProps(dispatch) {
	return bindActionCreators(ClientUserActions, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer);
