import React, { Component } from 'react';
import {getBooks} from 'actionCreator/general/googleApi';
import AutoComplete from 'material-ui/AutoComplete';
import {CardHeader} from 'material-ui/Card';
import _ from 'lodash';

class AutoSuggestComponent extends Component {
	constructor(props) {
		super(props);
		this.state = {
			dataSource: []
		};
		this.onUpdateInput = _.throttle(this.onUpdateInput.bind(this), 1000);
		this.onNewRequest = this.onNewRequest.bind(this)
	}
	onUpdateInput(searchText){
		let dataSource = []
		searchText && getBooks({ q: searchText, maxResults:5}).then(({data={}}) => {
			if(data.items){
				dataSource =  data.items.map( item => {
					return renderSuggestion(item)
				})
			}
			this.setState({ dataSource });
		});
	}
	onNewRequest(chosenRequest, index){
		const book = this.state.dataSource[index] || {}
		book.id && this.props.setBookId(book.id);
	}
	render() {
		const { dataSource } = this.state;
		return (
			<div>
				<AutoComplete
					hintText="search"
					filter={AutoComplete.noFilter}
					openOnFocus={true}
					onNewRequest={this.onNewRequest}
					onUpdateInput={this.onUpdateInput}
					dataSource={dataSource}
				/>
			</div>
		);
	}
}
const renderSuggestion = book => {
	const { title, subtitle, imageLinks } = book.volumeInfo;
	return {
		id: book.id,
		text: title,
		value: (
			<CardHeader
			  title={title}
			  subtitle={subtitle}
			  avatar={imageLinks.thumbnail}
			/>
		),
	};
}
export default AutoSuggestComponent;
