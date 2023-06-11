import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
  key: 'root',
  storage,
};

const rootReducer = (state, action) => {
  switch (action.type) {
    case 'addContact':
      return {
        ...state,
        contacts: [...state.contacts, action.contact],
      };
    case 'deleteContact':
      return {
        ...state,
        contacts: state.contacts.filter((contact) => contact.id !== action.id),
      };
    case 'setFilter':
      return {
        ...state,
        filter: action.filter,
      };
    default:
      return state;
  }
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  preloadedState: {
    contacts: [],
    filter: '',
  },
});

export const persistor = persistStore(store);

export default store;