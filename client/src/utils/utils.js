import _ from 'lodash';
import axios from 'axios';

export const SMALL_SCREEN_BREAKPOINT = 0;
export const MEDIUM_SCREEN_BREAKPOINT = 640;
export const LARGE_SCREEN_BREAKPOINT = 1024;
export const XLARGE_SCREEN_BREAKPOINT = 1200;
export const XXLARGE_SCREEN_BREAKPOINT = 1440;

export const api = axios.create({
	baseURL: 'http://localhost:3030',
});
export function getLocationQuery(location = {}) {
	location.search = location.search || '';
	const search = location.search.substring(1);
	return search ? JSON.parse(`{"${search.replace(/&/g, '","').replace(/=/g, '":"')}"}`,
                 (key, value) => key === '' ? value : decodeURIComponent(value)) : {};
}
