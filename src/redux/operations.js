import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

axios.defaults.baseURL = "https://connections-api.goit.global";

const setAuthHeader = token => {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`
}

const clearAuthHeader = () => {
  axios.defaults.headers.common.Authorization = ""
  
}

export const refreshUser = createAsyncThunk("auth/refresh", async (_, thunkAPI) => {
  try {
    const persistToken = thunkAPI.getState().auth.token

    if (!persistToken) {
      return thunkAPI.rejectWithValue('No token...')
    }

    setAuthHeader(persistToken)
    const response = await axios.get('/users/current')
    return response.data
  } catch (e) {
    return thunkAPI.rejectWithValue(e.message);
  }
})

export const register = createAsyncThunk("auth/register", async (credentials, thunkAPI) => {
  try {
    const response = await axios.post('/users/signup', credentials)
    return response.data
  } catch (e) {
    return thunkAPI.rejectWithValue(e.message);
  }
})

export const logIn = createAsyncThunk("auth/logIn", async (credentials, thunkAPI) => {
  try {
    const response = await axios.post('/users/login', credentials)
    setAuthHeader(response.data.token)
    return response.data
  } catch (e) {
    return thunkAPI.rejectWithValue(e.message);
  }
})

export const logOut = createAsyncThunk("auth/logOut", async (_, thunkAPI) => {
  try {
    await axios.post('/users/logout')
    clearAuthHeader()
  } catch (e) {
    return thunkAPI.rejectWithValue(e.message);
  }
})

export const fetchContacts = createAsyncThunk("contacts/fetchAll", async (_, thunkAPI) => {
    try {
        const response = await axios.get("/contacts");
        return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message)  
    }
});

export const deleteContact = createAsyncThunk(
    "contacts/deleteContact",
    async (contactId, thunkAPI) => {
      try {
        const response = await axios.delete(`/contacts/${contactId}`);
        return response.data;
      } catch (e) {
        return thunkAPI.rejectWithValue(e.message);
      }
    }
);
  
export const addContact = createAsyncThunk(
    "contacts/addContact",
    async ({name, number}, thunkAPI) => {
      try {
        const response = await axios.post("/contacts", { name, number });
        return response.data;
      } catch (e) {
        return thunkAPI.rejectWithValue(e.message);
      }
    }
  );