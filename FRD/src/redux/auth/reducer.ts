import { AuthActions } from "./action";
import { AuthState } from "./state";


const initialState: AuthState = {
  username: typeof window !== 'undefined' ? localStorage.getItem('username') : null,
  loggedIn: typeof window !== 'undefined' ? (localStorage.getItem('token') != null) : null,
  token: typeof window !== 'undefined' ? localStorage.getItem('token') : null
}

export function authReducer(state: AuthState = initialState, action: AuthActions): AuthState {
  switch (action.type) {
    case '@@auth/LOGGED_IN':
      return {
        ...state,
        username: localStorage.getItem("username"),
        token: localStorage.getItem("token"),
        loggedIn: true
      };
    case '@@auth/LOGGED_OUT':
      return {
        ...state,
        username: null,
        token: null,
        loggedIn: false,
      }
    default:
      return state;
  }
}