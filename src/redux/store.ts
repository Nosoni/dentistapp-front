import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension'
import { createHashHistory } from 'history';
import { settingsReducer } from './settings/reducer';
import { pageDataReducer } from './page-data/reducer';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'
import { usuarioReducer } from './usuario-data/reducer';

export const history = createHashHistory();

const rootReducer = combineReducers({
  pageData: pageDataReducer,
  settings: settingsReducer,
  usuarioData: usuarioReducer,
});

export type AppState = ReturnType<typeof rootReducer>;

const config = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(config, rootReducer)

export function configureStore() {
  const store = createStore(
    persistedReducer,
    composeWithDevTools(applyMiddleware(thunk))
  );
  const persistor = persistStore(store);

  return { persistor, store }
}

