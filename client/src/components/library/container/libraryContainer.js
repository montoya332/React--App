import RefreshIndicator from 'material-ui/RefreshIndicator';
import * as LibraryActions from 'actionCreator/library/actions';
import React, { Component, PropTypes } from 'react';
// import { getLocationQuery } from 'utils/utils';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Row, Column } from 'react-foundation';
import {InputSearch, BookCard} from '../.';

export class LibraryComponent extends Component {
	static defaultProps = {
		book: {},
		location: {},
		history: {},
		setBook: {}
	};
	static propTypes = {
		book: PropTypes.object,
		location: PropTypes.object,
		history: PropTypes.object,
		setBook: PropTypes.object
	};
	constructor(props) {
		super(props);
		this.updateURL = this.updateURL.bind(this);
	}

	updateURL(id) {
		const { location, history, setBook } = this.props;
		// const query = getLocationQuery(location);
		if (id && id !== location.state.search) {
			history.push({
				pathname: location.pathname,
				state: {
					search: id
				}
			});
			setBook && setBook(id);
		}
	}
	renderBook() {
		const active = this.props.book.get('active');
		const loading = this.props.book.get('loading');
		const loadingContainer = {
			position: 'relative',
		};

		if (loading) {
			return (
				<div style={loadingContainer}>
					<RefreshIndicator size={40} left={50} top={50} status="loading" />
				</div>
			);
		}
		if (!active) {
			return null;
		}
		return <BookCard {...active} />;
	}
	render() {
		return (
			<Row className="display">
				<Column small={12} large={3} />
				<Column small={12} large={6}>
					<h3>Library</h3>
					<div className="row">
						<div className="input-field col s12 m6">
							<i className="material-icons prefix top-spacer">search</i>
							<InputSearch {...this.props} placeholder="search" setBookId={this.updateURL} />
						</div>
						<div className="col s12 m6">
							{this.renderBook()}
						</div>
					</div>
				</Column>
				<Column small={12} large={3} />
			</Row>
		);
	}
}

function mapStateToProps(state, ownProps) {
	const book = state.libraryBook;
	const { query } = ownProps.location;
	return {
		query,
		book
	};
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators(LibraryActions, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(LibraryComponent);
