import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Row, Column } from 'react-foundation';

export class LoginContainer extends Component {
	constructor(props) {
		super(props);
		// this.state = {}
		this.onSubmit = this.onSubmit.bind(this)
	}

	componentDidMount() {
	}
	onSubmit(e){
		console.log(e)
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
	const clientUser = state.clientUser;
	return { clientUser };
}
function mapDispatchToProps(dispatch) {
	return bindActionCreators({}, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer);
