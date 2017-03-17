import * as ACTIONTYPES from '../../constants/library/actionTypes';
import {getBook, getBooks} from 'actionCreator/general/googleApi';
export function getData(query) {
	return dispatch => {
		//TODO: dispatch Loading
		return getBooks({ q: query, maxResults:5})
			.catch(function (error) {
				if (error.response) {
					console.log(error.response);
				}
			})
			.then(response => dispatch({type: ACTIONTYPES.GETDATA, payload: response }))
	}
}

export function setBook(id) {
	return dispatch => {
		//TODO: dispatch Loading
		return getBook({id})
			.catch((error) => {error})
			.then(response => dispatch({type: ACTIONTYPES.SETBOOK, payload: response }))
	}
}