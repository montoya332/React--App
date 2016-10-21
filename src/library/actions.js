import {GETDATA, SETBOOK} from './actionTypes';
import axios from 'axios';
const bookAPI = axios.create({
  baseURL: 'https://www.googleapis.com',
});
export function getData(query) {
	const request = bookAPI.get('/books/v1/volumes',{ params: { q: query, maxResults:5} })
					.catch(function (error) {
							if (error.response) {
								console.log(error.response);
							}
						});
	return {
		type: GETDATA,
		payload: request		
	};
}
export function setBook(id) {
	const request = bookAPI.get(`/books/v1/volumes/${id}`)
  	return {
		type: SETBOOK,
		payload: request		
	};
}