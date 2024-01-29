import { createSlice, createSelector, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "..";
type State = {
  [key: string]: { [key: string]: string | boolean | number | "" };
  login: { email: string; password: string };
  join: { email: string; name: string; password: string };
  status: { loading: boolean; message: string; error: string };
};
const initialState: State = {
  login: {
    email: "",
    password: "",
  },
  join: { email: "", name: "", password: "" },
  status: { loading: false, message: "", error: "" },
};
const loginSelector = (state: RootState) => {
  return state.auth.login;
};
const joinSelector = (state: RootState) => {
  return state.auth.join;
};
const statusSelector = (state: RootState) => {
  return state.auth.status;
};
export const AuthData = createSelector(
  loginSelector,
  joinSelector,
  statusSelector,
  (login, join, status) => ({ login, join, status })
);
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    initForm: (state, { payload: form }) => {
      state[form] = initialState[form];
      state.status = initialState.status;
    },
    changeInput: (state, { payload: { form, key, value } }) => {
      state[form][key] = value;
    },
    login: (
      state,
      action: PayloadAction<{ email: string; password: string }>
    ) => {
      state.status.loading = true;
      state.status.message = "";
      state.status.error = "";
    },
    loginSuccess: (state, { payload: message }) => {
      state.status.loading = false;
      state.status.message = message;
      state.status.error = "";
    },
    loginFailure: (state, { payload: error }) => {
      state.status.loading = false;
      state.status.message = "";
      state.status.error = error;
    },
    join: (
      state,
      action: PayloadAction<{ email: string; name: string; password: string }>
    ) => {
      state.status.loading = true;
      state.status.message = "";
      state.status.error = "";
    },
    joinSuccess: (state, { payload: message }) => {
      state.status.loading = false;
      state.status.message = message;
      state.status.error = "";
    },
    joinFailure: (state, { payload: error }) => {
      state.status.loading = false;
      state.status.message = "";
      state.status.error = error;
    },
  },
});
export default authSlice.reducer;
export const AuthActions = authSlice.actions;
