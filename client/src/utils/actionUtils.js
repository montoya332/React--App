import axios from 'axios';
const defualtConfig = {
	baseURL: 'http://localhost:3030',
};
export const api = axios.create(defualtConfig);
/*  Api: Return  */
export class apiCall {
	constructor(config={}) {
		this.config = {...defualtConfig, ...config};
		this._api = axios.create(this.config);
	}
	get reduxObject(request, options = {}, params = {}){
		return (dispatch) => {
			const { type, loadingType, errorType, ...passedOptions } = options;
			const handleLoading = loadingType || options.defaultLoading;
			const loadingPassed = (typeof loadingType === 'string' ? loadingType : type);
			const typeLoading = options.defaultLoading ? appActionTypes.LOADING : loadingPassed;
			const errorPassed = (typeof errorType === 'string' ? errorType : type);
			const typeError = options.defaultError ? appActionTypes.FAIL : errorPassed;

			handleLoading && dispatch({ ...passedOptions, type: typeLoading });
			return request
				.then((response) => {
					const data = response.data || {};
					return dispatch({ ...passedOptions, params, response, type, payload: data });
				})
				.catch((error) => {
					const data = error.response ? error.response.data : {};
					return dispatch({ ...passedOptions, error, params, response: error.response, type: typeError, payload: data });
				});
		};
	}
	get getOptions(options = {}) {
		const defaultOptions = {
		/* loading Handing is optional
			loadingType:   boolean :ref. type , <string>   custom loading
			defaultLoading : boolean default app loading
		*/
			loadingType: null,
			defaultLoading: null,

		/* success */
			type: '',

		/* Error Handing is not optional
			errorType:  boolean :ref. type , <string>   custom  error
			defaultError : boolean: ref. app default error type
		*/
			errorType: true,
			defaultError: null
		};
		if (typeof options === 'string') {
			return { ...defaultOptions, type: options };
		}
		return { ...defaultOptions, ...options };
	}
	/*  Request methods */
	get get(passedRequest = '', passedOptions, passedParams = {}) {
		const options = this.getOptions(passedOptions);
		const params = options.params || passedParams;
		const request = this._api.get(passedRequest, { params })
		return callApi(request, options, params);
	}
	get post (passedRequest = '', passedOptions, passedParams = {}) {
		const options = this.getOptions(passedOptions);
		const params = options.params || passedParams;
		const request = this._api.post(passedRequest, params);
		return callApi(request, options, params);
	}

}