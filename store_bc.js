import { useMemo } from 'react'
import { createStore, applyMiddleware, combineReducers } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'

import storage from 'redux-persist/lib/storage';
import cartReducer from './redux/reducer/cart';
import reducer from './redux/reducer/main'
import settingsReducer from './redux/reducer/settings';
import userReducer from './redux/reducer/user';
let store

const initialState = {
  lastUpdate: 0,
  light: false,
  count: 10,
}


const rootReducer = combineReducers({
    main: reducer,
    user: userReducer,
    settings: settingsReducer,
    cart: cartReducer
  });
function initStore(preloadedState = initialState) {
  return createStore(
    rootReducer,

    composeWithDevTools(applyMiddleware())
  )
}

export const initializeStore = (preloadedState) => {
  let _store = store ?? initStore(preloadedState)

  // After navigating to a page with an initial Redux state, merge that state
  // with the current state in the store, and create a new store
  if (preloadedState && store) {
    _store = initStore({
      ...store.getState(),
      ...preloadedState,
    })
    // Reset the current store
    store = undefined
  }

  // For SSG and SSR always create a new store
  if (typeof window === 'undefined') return _store
  // Create the store once in the client
  if (!store) store = _store

  return _store
}

export function useStore(initialState) {
  const store = useMemo(() => initializeStore(initialState), [initialState])
  return store
}