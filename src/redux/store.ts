import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension'
import { createHashHistory } from 'history';
import { settingsReducer } from './settings/reducer';
import { pageDataReducer } from './page-data/reducer';
import { persistStore, persistReducer } from 'redux-persist';
import { encryptTransform } from 'redux-persist-transform-encrypt';
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
  key: 'app',
  storage,
  transforms: [
    encryptTransform({
      secretKey: 'my-super-secret-key',
      onError: function (error) {
        console.log("error en store encrypt", error)
      },
    }),
  ],
};

const persistedReducer = persistReducer(config, rootReducer)

export function configureStore() {
  let store = createStore(
    persistedReducer,
    composeWithDevTools(applyMiddleware(thunk))
  );
  let persistor = persistStore(store);

  return { persistor, store }
}

