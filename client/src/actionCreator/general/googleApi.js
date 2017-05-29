import axios from 'axios';
export const api = axios.create({
	baseURL: 'https://www.googleapis.com',
});
export function getBook(params) {
	return api.get(`/books/v1/volumes/${params.id}`, { params });
}
export function getBooks(params) {
	return api.get('/books/v1/volumes', { params });
}
