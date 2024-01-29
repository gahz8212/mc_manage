import { createSlice, createSelector } from "@reduxjs/toolkit";
import { RootState } from "..";
type State = {
  [key: string]: {
    visible: boolean;
    position: { x: number; y: number };
  };
};
const initialState: State = {
  input: { visible: false, position: { x: 0, y: 0 } },
  edit: { visible: false, position: { x: 0, y: 0 } },
  search: { visible: false, position: { x: 0, y: 0 } },
};
const inputSelector = (state: RootState) => {
  return state.form.input;
};
const editSelector = (state: RootState) => {
  return state.form.edit;
};
const searchSelector = (state: RootState) => {
  return state.form.search;
};
export const FormData = createSelector(
  inputSelector,
  editSelector,
  searchSelector,
  (input, edit, search) => ({ input, edit, search })
);
const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    initForm: (state, { payload: { form } }) => {
      state[form] = initialState[form];
    },
    toggleVisible: (state, { payload: { form, value } }) => {
      state[form].visible = value;
    },
    changePosition: (state, { payload: { form, position } }) => {
      state[form].position = position;
    },
  },
});
export default formSlice.reducer;
export const FormActions = formSlice.actions;
