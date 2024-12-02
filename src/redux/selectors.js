export const selectContacts = state => state.contacts.items;
export const selectIsLoading = state => state.contacts.isLoading;
export const selectError = state => state.contacts.error;
export const selectFilter = state => state.filter;

export const selectIsRefresh = state => state.auth.isIsRefresh
export const selectLoggedIn = state => state.auth.isLoggedIn
export const selectToken = state => state.auth.token
export const selectUser = state => state.auth.user
