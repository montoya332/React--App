import * as ACTIONTYPES from '../../constants/library/actionTypes';
import axios from 'axios';
const bookAPI = axios.create({
  baseURL: 'https://www.googleapis.com',
});
export function getData(query) {
	return dispatch => {
		//TODO: dispatch Loading
		return bookAPI.get('/books/v1/volumes',{ params: { q: query, maxResults:5} })
			.catch(function (error) {
				if (error.response) {
					console.log(error.response);
				}
			})
			.then(response => response)
			.then(response => dispatch({type: ACTIONTYPES.GETDATA, payload: response }))
	}
}

export function setBook(id) {
	return dispatch => {
		//TODO: dispatch Loading
		return bookAPI.get(`/books/v1/volumes/${id}`)
			.catch((error) => {error})
			.then(response => response)
			.then(response => dispatch({type: ACTIONTYPES.SETBOOK, payload: response }))
	}
}