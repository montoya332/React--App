import { app } from 'utils/socketio';
import * as ACTIONTYPES from 'ReactApp/constants/general/clientUserActions';

/*  signin ({email,password})   */
export function signin(params={}) {
	params.type = params.type || 'local'
	return dispatch => {
		dispatch({type: ACTIONTYPES.SIGNIN_LOADING, payload: params })
		return app.authenticate(params)
			.then(response => dispatch({type: ACTIONTYPES.SIGNIN_FETCHED, payload: response }))
			.catch(error => dispatch({type: ACTIONTYPES.SIGNIN_ERROR, payload: error }))
	}
}