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
      return response;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const refreshUser = createAsyncThunk(
  '/contacts/refresh',
  async (token,thunkAPI) => {
try {
  const response = await axios.get('/users/current', {
    headers: {
      Authorization: `Bearer ${token}`,
      accept: '*/*',
      'Content-Type': 'application/json',
    }
  })
  const data = {
    name:response.data.name,
    email:response.data.email,
    token:token
  }
  return data
}catch (e) {
  return thunkAPI.rejectWithValue(e.message);
}

  });

export const fetchContacts = createAsyncThunk(
  'contacts/fetchAll',
  async (token, thunkAPI) => {
    try {
      const responseData = await axios.get('/contacts', {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: '*/*',
        },
      });
      console.log(responseData);
      return responseData;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const userLogOut = createAsyncThunk(
  'contacts/logout',
  async (token, thunkAPI) => {
    try {
      const result = await axios.post(
        '/users/logout',
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      await console.log(result);
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const addBackContacts = createAsyncThunk(
  'contacts/addContacts',
  async ({ contact, token }, thunkAPI) => {
    try {
      const responseData = await axios.post('/contacts', contact, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: '*/*',
          'Content-Type': 'application/json',
        },
      });
      console.log(responseData);
      thunkAPI.dispatch(fetchContacts(token));
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const deleteBackContacts = createAsyncThunk(
  'contacts/deleteContacts',
  async ({ id, token }, thunkAPI) => {
    try {
      const response = await axios.delete(`/contacts/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: '*/*',
        },
      });
      await thunkAPI.dispatch(fetchContacts(token));
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
      token: null,
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
    setToken:(state,action) => {
      state.info.token = action.payload.token
    }
  },
  extraReducers: {
    [userLogOut.pending](state, action) {
      state.contacts.isLoading = true;
      state.contacts.error = null;
    },
    [userLogOut.fulfilled](state, action) {
      state.contacts.isLoading = false;
      state.contacts.error = null;
      state.info.autorizated = false;
      localStorage.setItem('token','')
      state.info.name = null;
      state.info.email = null;
      state.info.token = null;
    },
    [userLogOut.rejected](state, action) {
      state.contacts.isLoading = false;
      state.contacts.error = action.payload;
    },
    [refreshUser.pending](state,action){
state.contacts.isLoading = true;
    },
    [refreshUser.fulfilled](state,action){
      state.contacts.isLoading = false;
      state.info.name = action.payload.name;
      state.info.email = action.payload.email;
      state.info.token = action.payload.token
      state.info.autorizated = true;
      state.contacts.error = null;
          },
          [refreshUser.rejected](state,action){
            state.contacts.isLoading = false;
            state.contacts.error = action.payload;
            state.info.autorizated = false;
            state.info.email = null;
            state.info.name = null;
            state.info.token = null;
                },
    [loginUser.pending](state, action) {
      state.contacts.isLoading = true;
    },
    [loginUser.fulfilled](state, action) {
      state.contacts.isLoading = false;
      state.info.autorizated = true;
      state.contacts.error = false;
      state.info.name = action.payload.data.user.name;
      state.info.email = action.payload.data.user.email;
      state.info.token = action.payload.data.token;
      localStorage.setItem('token', action.payload.data.token);
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
export const { setFilter, setToken } = actions;
