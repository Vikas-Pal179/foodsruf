import CartActionTypes from '../types/cart';
import { addItemToCart, removeItemFromCart } from '../utils/cart';

const INITIAL_STATE = {
  hidden: true,
  adresshidden: true,
  check: false,
  cartItems: [],
  cartPromocodeItem: [],
  cartPromocode: '',
  cartPromoAccept: false,
  cartupd: false,
  mainOrderModalHiden: true,
  mainOrderModalItem: null,
  selectAdres:[],
  oldCart: [],
  orderid: null,
  bonus:null,
  gifts_select: null,
  mainMotivModalHiden: false,
  motiv: null
};

const cartReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CartActionTypes.TOGGLE_CART_HIDDEN:
      return {
        ...state,
        hidden: !state.hidden
      };
    case CartActionTypes.TOGGLE_CART_ADRESS_HIDDEN:
      return {
        ...state,
        adresshidden: !state.adresshidden
      };
    case CartActionTypes.TOGGLE_CART_CHECK_HIDDEN:
      return {
        ...state,
        check: !state.check
      };
    case CartActionTypes.ADD_ITEM:
      return {
        ...state,
        cartItems: addItemToCart(state.cartItems, action.payload)
      };
    case CartActionTypes.REMOVE_ITEM:
      return {
        ...state,
        cartItems: removeItemFromCart(state.cartItems, action.payload)
      };
    case CartActionTypes.CLEAR_ITEM_FROM_CART:
      return {
        ...state,
        cartItems: state.cartItems.filter(
          cartItem => cartItem.id !== action.payload.id
        )
      };
    case CartActionTypes.CLEAR_CART:
      return {
        ...state,
        cartItems: []
      }
    case CartActionTypes.PROMOCODE:
      return {
        ...state,
        cartPromocode: action.payload
      }
    case CartActionTypes.PROMOCODE_ITEM:
      return {
        ...state,
        cartPromocodeItem: action.payload
      }
    case CartActionTypes.PROMOCODE_ACCEPT:
      return {
        ...state,
        cartPromoAccept: !state.cartPromoAccept
      }
    case CartActionTypes.CART_UPD:
        return {
          ...state,
          cartupd: action.payload
        };
    case CartActionTypes.MAIN_ORDER_MODAL:
      return {
        ...state,
        mainOrderModalHiden: !state.mainOrderModalHiden
      }
    case CartActionTypes.MAIN_ORDER_MODAL_ITEM:
        return {
          ...state,
          mainOrderModalItem: action.payload
        };
    case 'SELECT_ADRESS':
        return {
          ...state,
          selectAdres: action.payload
        };
    case 'SET_OLD_CART':
        return {
          ...state,
          oldCart: action.payload
        };
    case 'SET_ORDER_ID':
        return {
          ...state,
          orderid: action.payload
        };
    case 'SET_ORDER_BONUS':
        return {
          ...state,
          bonus: action.payload
        };
        case CartActionTypes.GIFTS_SELECT:
          return {
            ...state,
            gifts_select: action.payload
          };
    case CartActionTypes.MAIN_MOTIV_MODAL:
      return {
        ...state,
        mainMotivModalHiden: !state.mainMotivModalHiden
      };
    case CartActionTypes.MOTIV:
      return {
        ...state,
        motiv: action.payload
      }
    default:
      return state;
  }
};

export default cartReducer;
