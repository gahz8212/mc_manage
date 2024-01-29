import { createSlice, createSelector } from "@reduxjs/toolkit";
import { RootState } from "..";
type State = {
  user: { id: "" | number; name: string } | null;
};
const initialState: State = {
  user: null,
};
const UserSelector = (state: RootState) => {
  return state.user.user;
};
export const UserData = createSelector(UserSelector, (user) => ({ user }));
export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    initForm: (state) => {
      state.user = initialState.user;
    },
    tempSetUser: (state, { payload: user }) => {
      state.user = user;
    },
    check: (state) => {
      state.user = null;
    },
    checkSuccess: (state, { payload: user }) => {
      state.user = user;
    },
    checkFailure: (state) => {
      state.user = null;
    },
    logout: (state) => {
      state.user = null;
    },
  },
});
export default userSlice.reducer;
export const UserActions = userSlice.actions;
