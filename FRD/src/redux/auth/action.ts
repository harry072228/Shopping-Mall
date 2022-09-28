import { AppDispatch } from '../../store'
import axios, { AxiosResponse } from 'axios'

export function checkResponse(res: AxiosResponse<any, any>) {
	return (dispatch: AppDispatch) => {
		if (res.status === 401) {
			dispatch(logIn(res))
		}
	}
}

export function loggedIn() {
	return {
		type: '@@auth/LOGGED_IN' as const,
		token: localStorage.getItem('token'),
		username: localStorage.getItem('username')
	}
}

export function loggedOut() {
	return {
		type: '@@auth/LOGGED_OUT' as const,
		token: localStorage.removeItem('token'),
		username: localStorage.removeItem('username')
		
	}
}

export function logIn(data: any) {
	return (dispatch: AppDispatch) => {
		localStorage.setItem('token', data.token)
		localStorage.setItem('username', data.username)

		dispatch(loggedIn())
	}
}
export function logOut() {
	return (dispatch: AppDispatch) => {
		localStorage.removeItem('token')
		localStorage.removeItem('username')
		dispatch(loggedOut())
	}
}


export type LoggedInAction = ReturnType<typeof loggedIn>

export type LoggedOutAction = ReturnType<typeof loggedOut>

export type AuthActions = LoggedInAction | LoggedOutAction
