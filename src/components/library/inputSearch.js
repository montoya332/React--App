import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import _ from 'lodash';
import Autosuggest from 'react-autosuggest';
import * as actions from '../../actionCreator/library/actions';

const getSuggestionValue = suggestion => {
  const {title} = suggestion.volumeInfo;
  return title;
}
const renderSuggestion = suggestion => {
  const {title, authors=[] } = suggestion.volumeInfo;
  return (
    <span>
        <span className="title">{title}</span>
        <p>{authors.join(', ')}</p>
    </span>
  );
}

class AutoSuggestComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      suggestions: []
    };
  }

  getSuggestions = (value) => {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;

    return inputLength === 0 ? [] : languages.filter(lang =>
      lang.name.toLowerCase().slice(0, inputLength) === inputValue
    );
  };

  onChange = (event, { newValue }) => {
    this.setState({
      value: newValue
    });
  };
  onSuggestionsFetchRequested = ({ value }) => {
      this.props.getData(value).then(({payload:{data={}}}) => {
        data.items && this.setState({
          suggestions: data.items
        });
      });
  };
  onSuggestionSelected = (event, { suggestion }) =>{
      this.props.setBookId && this.props.setBookId(suggestion.id);
  };

  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    });
  };

  render() {
    const { value, suggestions } = this.state;
    const { ...props } = this.props;
    const inputProps = {
      placeholder: props.placeholder || '',
      value,
      onChange: this.onChange
    };

    return (
      <Autosuggest
        suggestions={suggestions}
        onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
        onSuggestionsClearRequested={this.onSuggestionsClearRequested}
        getSuggestionValue={getSuggestionValue}
        renderSuggestion={renderSuggestion}
        onSuggestionSelected={this.onSuggestionSelected}
        inputProps={inputProps}
      />
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actions, dispatch);
}

export default connect(null, mapDispatchToProps)(AutoSuggestComponent);
