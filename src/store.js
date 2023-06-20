import { createStore, compose, applyMiddleware, combineReducers } from 'redux';
import { createMigrate, persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import thunk from 'redux-thunk';
import settings from './reducers/settings';


const migrations = {
  0: (state) => {
    return state;
  },
  1: (state) => {
    return {
      ...state,
      settings: {
        ...state.settings,
        onboardingComplete: false,
        photosCaptured: 0,
      }
    }
  },
}


const persistConfig = {
  key: 'root',
  storage,
  version: 0,
  migrate: createMigrate(migrations, { debug: false }),
}

const reducer = combineReducers({
  settings,
});

const rootReducer = (state, action) => {
  if (action.type === 'LOGOUT_USER') {
    state = undefined
  }

  return reducer(state, action)
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = createStore(persistedReducer, {}, compose(
  applyMiddleware(thunk),
));
const persistor = persistStore(store)

// persistor.purge();
// persistor.flush();

export { store, persistor }