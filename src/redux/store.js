import { configureStore } from '@reduxjs/toolkit';
import { mainReducer } from './contactsSlice';
const store = configureStore({
  reducer: mainReducer,
});

export default store;