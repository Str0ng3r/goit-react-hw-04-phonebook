import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
axios.defaults.baseURL = 'https://connections-api.herokuapp.com';

export const addNewUser = createAsyncThunk(
  'contacts/addUser',
  async (userData, thunkAPI) => {
    try {
      const response = await axios.post('/users/signup', userData, {
        headers: {
          accept: '*/*',
          'Content-Type': 'application/json',
        },
      });
      console.log(response);
      return response;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const loginUser = createAsyncThunk(
  'contacts/loginUser',
  async (userData, thunkAPI) => {
    try {
      const response = await axios.post('/users/login', userData, {
        headers: {
          accept: '*/*',
          'Content-Type': 'application/json',
        },
      });
      console.log(response);
      return response
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

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
      await thunkAPI.dispatch(fetchContacts());
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
      await thunkAPI.dispatch(fetchContacts());
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

/////////////////////////////////////////////////////////////////////////////

const contactsSlice = createSlice({
  name: 'contacts',
  initialState: {
    info: {
      autorizated: false,
      name: null,
      email: null,
      token:null
    },
    contacts: {
      items: [],
      isLoading: false,
      error: null,
    },
    filter: '',
  },
  reducers: {
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
    logOut:(state, action) => {
      state.info.autorizated = false
      state.info.name = null
      state.info.email = null
      state.info.token = null
    }
  },
  extraReducers: {
    // [addNewUser.pending](state,action){
    //   state.contacts.isLoading = true;
    // },
    // [addNewUser.fulfilled](state,action){
    //   state.contacts.autorizated = true
    //   state.contacts.isLoading = false
    // },
    // [addNewUser.rejected](state,action){
    //   state.contacts.autorizated = false
    //   state.contacts.isLoading = false
    // },

    [loginUser.pending](state, action) {
      state.contacts.isLoading = true;
    },
    [loginUser.fulfilled](state, action) {
      state.contacts.isLoading = false;
      state.info.autorizated = true;
      state.contacts.error = false;
      state.info.name = action.payload.data.user.name;
      state.info.email = action.payload.data.user.email;
      state.info.token = action.payload.data.token
    },
    [loginUser.rejected](state, action) {
      state.contacts.isLoading = false;
      state.contacts.error = action.payload;
    },
    [fetchContacts.pending](state, action) {
      state.contacts.isLoading = true;
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
export const { setFilter,logOut } = actions;
