import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {browserHistory, routerShape} from 'react-router';
import RefreshIndicator from 'material-ui/RefreshIndicator';

import * as LibraryActions from 'actionCreator/library/actions';
import {InputSearch,BookCard} from '../.';

export class LibraryComponent extends Component {
	constructor(props) {
		const {search} = props.query;
		super(props);
		search && this.props.setBook(search);
		this.updateURL = this.updateURL.bind(this);
	}

	updateURL(id) {
		if (id && id != this.props.query.search){
			this.context.router.push({
				pathname: location.pathname,
				query: { search: id },
				state: { search: id }
			});
			this.props.setBook(id);
		}
	}
	renderBook(props) {
		const active = this.props.book.get('active')
		const loading = this.props.book.get('loading')
		const loadingContainer =  {
			position: 'relative',
		};

		if( loading ){
			return	(
				<div style={loadingContainer}>
					<RefreshIndicator size={40} left={50}  top={50} status="loading" />
				</div>
			)
		}
		if( !active ){
			return  null
		}
		return  <BookCard {...active} />;
	}
	render() {
		return (
			<div>
				<div className="container">
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
				</div>
			</div>
		);
	}
}

function mapStateToProps(state,ownProps) {
	const book = state.libraryBook;
	const {query} = ownProps.location;
	return { query,book };
}
function mapDispatchToProps(dispatch) {
	return bindActionCreators(LibraryActions, dispatch);
}
LibraryComponent.contextTypes = { router: routerShape.isRequired }
export default connect(mapStateToProps, mapDispatchToProps)(LibraryComponent);
