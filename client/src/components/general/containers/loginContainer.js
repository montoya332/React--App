import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Row, Column } from 'react-foundation';
import * as ClientUserActions from 'actionCreator/general/clientUser'
export class LoginContainer extends Component {
	constructor(props) {
		super(props);
		// this.state = {}
		this.onSubmit = this.onSubmit.bind(this)
	}

	componentWillReceiveProps(nextProps) {
		const onChangeClientUser = nextProps.clientUser.token != this.props.clientUser.token
		if(onChangeClientUser){
			nextProps.history.push('/messages', { some: 'state' })
		}
	}

	onSubmit(e){
		const email = 'montoya332@live.com'
		const password = 'test123'
		this.props.signin && this.props.signin({email,password})
	}
	render() {
		return (
				<Row className="display">
					<Column small={6} large={6}> 
						<button onClick={this.onSubmit}>Log in</button>
					</Column>
				</Row>
			)
	}
}
function mapStateToProps(state,ownProps) {
	const clientUser = state.clientUser.toJS();
	return { clientUser };
}
function mapDispatchToProps(dispatch) {
	return bindActionCreators(ClientUserActions, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer);
