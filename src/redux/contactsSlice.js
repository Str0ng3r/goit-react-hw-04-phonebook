import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
axios.defaults.baseURL =
  'https://648c665a8620b8bae7ecd755.mockapi.io/phonebook123/Maks';

export const fetchContacts = createAsyncThunk(
  'contacts/fetchAll',
  async (_, thunkAPI) => {
    try {
      const responseData = await axios.get('/contacts');
      return responseData;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const addBackContacts = createAsyncThunk(
  'contacts/addContacts',
  async (contact, thunkAPI) => {
    try {
      const response = await axios.post('/contacts', contact);
      await thunkAPI.dispatch(fetchContacts())
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const deleteBackContacts = createAsyncThunk(
  'contacts/deleteContacts',
  async (id, thunkAPI) => {
    try {
      const response = await axios.delete(`/contacts/${id}`);
      await thunkAPI.dispatch(fetchContacts())
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

const contactsSlice = createSlice({
  name: 'contacts',
  initialState: {
    contacts: {
      items: [],
      isLoading: false,
      error: null,
    },
    filter: '',
  },
reducers:{
  setFilter: (state, action) => {
        state.filter = action.payload;
      },
    },
  extraReducers: {
    [fetchContacts.pending](state, action) {
      state.isLoading = true;
    },
    [fetchContacts.fulfilled](state, action) {
      state.contacts.error = null;
      state.contacts.isLoading = false;
      state.contacts.items = action.payload.data;
    },
    [fetchContacts.rejected](state, action) {
      state.contacts.isLoading = false;
      state.contacts.error = 'ERROR';
    },
    [addBackContacts.pending](state, action) {
      state.contacts.isLoading = true;
    },
    [addBackContacts.fulfilled](state, action) {
      state.contacts.isLoading = false;
      state.contacts.error = null;
    },
    [addBackContacts.rejected](state, action) {
      state.contacts.isLoading = false;
      state.contacts.error = 'ERROR';
    },
    [deleteBackContacts.pending](state, action) {
      state.contacts.isLoading = true;
    },
    [deleteBackContacts.fulfilled](state, action) {
      state.contacts.isLoading = false;
      state.contacts.error = null;
    },
    [deleteBackContacts.rejected](state, action) {
      state.contacts.isLoading = false;
      state.contacts.error = 'ERROR';
    },
  },
});

const { actions } = contactsSlice;
export const mainReducer = contactsSlice.reducer;
export const { addContact, deleteContact, setFilter } = actions;
