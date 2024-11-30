import { createSlice, nanoid } from "@reduxjs/toolkit";
import { fetchContacts, deleteContact, addContact } from "./operations";

const initialContactList = [
    { id: "id-1", name: "Rosie Simpson", number: "459-12-56" },
    { id: "id-2", name: "Hermione Kline", number: "443-89-12" },
    { id: "id-3", name: "Eden Clements", number: "645-17-79" },
    { id: "id-4", name: "Annie Copeland", number: "227-91-26" },
  ];

const isPendingAction = (action) => {
    return action.type.endsWith("/pending")
}
const isRejectAction = (action) => {
    return action.type.endsWith("/rejected")
}

  const handlePending = state => {
    state.isLoading = true;
};
  
  const handleRejected = (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
};
  
  const contactsSlice = createSlice({
      name: "contacts",
      initialState: {
          items: [],
          isLoading: false,
          error: null,
      },
      extraReducers: (builder) => {
          builder
            .addCase(fetchContacts.fulfilled, (state, action) =>{
              state.isLoading = false;
              state.error = null;
              state.items = action.payload;
            })
            .addCase(deleteContact.fulfilled, (state, action) => {
                state.isLoading = false;
                state.error = null;
                const index = state.items.findIndex(
                    contact => contact.id === action.payload.id
                  );
                  state.items.splice(index, 1);
            })
            .addCase(addContact.fulfilled, (state, action) => {
                state.isLoading = false;
                state.error = null;
                state.items.push(action.payload);
            })
            .addMatcher(isPendingAction, handlePending)
              .addMatcher(isRejectAction, handleRejected)
          .addDefaultCase((state, action)=>{state.error = "Default case activated"})
      }
        //   addContact: {
        //       reducer(state, action) {
        //           return [...state, action.payload]
        //       },
        //       prepare(nameValue, numberValue) {
        //           return {
        //               payload: {
        //                   id: nanoid(),
        //                   name: nameValue,
        //                   number: numberValue,
        //               },
        //           };
        //       }

    });
    
export const contactsReducer = contactsSlice.reducer