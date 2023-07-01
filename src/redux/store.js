import { configureStore } from '@reduxjs/toolkit';
import { mainReducer } from './contactsSlice';
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' 

const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['contacts','filter',]
}
const persistedReducer = persistReducer(persistConfig,mainReducer)
const store = configureStore({
  reducer: persistedReducer,
});
export let persistor = persistStore(store)

export default store;