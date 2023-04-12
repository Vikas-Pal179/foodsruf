import { UserActionTypes } from '../types/user';

const INITIAL_STATE = {
  hidden: true,
  currentUser: null,
  login: true,
  hiddennameedit: false,
  hiddenemailedit: false,
  dark: false,
  cook: false,
  installapp: false
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UserActionTypes.TOGGLE_LOGIN_HIDDEN:
      return {
        ...state,
        login: !state.login,

      };
    case UserActionTypes.SET_CURRENT_USER:
      return {
        ...state,
        currentUser: action.payload,
      };
    case UserActionTypes.SET_DARK: 
      return {
        ...state,
        dark: action.payload,
      };
    case UserActionTypes.SET_COOCK: 
      return {
        ...state,
        cook: action.payload,
      };
    case UserActionTypes.SET_INSTALL: 
      return {
        ...state,
        installapp: action.payload,
      }
    
    default:
      return state;
  }
};

export default userReducer;
