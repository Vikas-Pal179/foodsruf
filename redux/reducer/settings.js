import SettingsActionTypes from '../types/settings';


const INITIAL_STATE = {

  mainOrderModalHiden: true,
  mainOrderModalItem: null,
  menu: true,
  motivList:null

};

const settingsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
   
    case SettingsActionTypes.MAIN_ORDER_MODAL:
      return {
        ...state,
        mainOrderModalHiden: !state.mainOrderModalHiden
      }
    case SettingsActionTypes.MAIN_ORDER_MODAL_ITEM:
        return {
          ...state,
          mainOrderModalItem: action.payload
        };
   
    case SettingsActionTypes.MOTIV_LIST:
        return {
          ...state,
          motivList: action.payload
        };
   
    
    case SettingsActionTypes.TOGGLE_MENU_HIDDEN:
        return {
          ...state,
          menu: !state.menu,
    
        };
    default:
      return state;
  }
};

export default settingsReducer;
