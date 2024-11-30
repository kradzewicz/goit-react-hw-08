import { createSlice } from "@reduxjs/toolkit";

const initialFilter = ''

const filterSlice = createSlice({
    name: "filter",
    initialState: initialFilter,
    reducers: {
        filterContacts(state, action) {
            state = action.payload;
            return state;
        }
    }
})

export const { filterContacts} = filterSlice.actions
export const filterReducer = filterSlice.reducer