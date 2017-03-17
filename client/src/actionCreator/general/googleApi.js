import axios from 'axios';
const api = axios.create({
  baseURL: 'https://www.googleapis.com',
});
export function getBooks(params) {
	return api.get('/books/v1/volumes',{ params })
}
export function getBook(params) {
	return api.get(`/books/v1/volumes/${params.id}`,{ params })
}