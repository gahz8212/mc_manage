import { createSlice, createSelector, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "..";
type State = {
  prev: {
    [key: string]: "" | string | number | boolean | { url: string }[];
    id: number | "";
    category: string;
    name: string;
    descript: string;
    unit: string;
    price: number;
    point: number;
    use: boolean;
    Images: { url: string }[];
  };
  next: {
    [key: string]: "" | string | number | boolean | { url: string }[];
    id: number | "";
    category: string;
    name: string;
    descript: string;
    unit: string;
    price: number;
    point: number;
    use: boolean;
    Images: { url: string }[];
  };
  status: { error: string; loading: boolean; message: string };
};
const initialState: State = {
  prev: {
    id: "",
    category: "",
    name: "",
    descript: "",
    unit: "",
    price: 0,
    point: 0,
    use: true,
    Images: [],
  },
  next: {
    id: "",
    category: "",
    name: "",
    descript: "",
    unit: "",
    price: 0,
    point: 0,
    use: true,
    Images: [],
  },
  status: { error: "", loading: false, message: "" },
};
const prevSelector = (state: RootState) => {
  return state.edit.prev;
};
const nextSelector = (state: RootState) => {
  return state.edit.next;
};
const statusSelector = (state: RootState) => {
  return state.edit.status;
};
export const EditData = createSelector(
  prevSelector,
  nextSelector,
  statusSelector,
  (prev, next, status) => ({ prev, next, status })
);
const editSlice = createSlice({
  name: "edit",
  initialState,
  reducers: {
    initForm: (state) => {
      state.prev = initialState.prev;
      state.next = initialState.next;
    },
    editForm: (state, { payload: item }) => {
      state.prev = item;
      state.next = item;
    },
    changeForm: (state, { payload: { key, value } }) => {
      state.next[key] = value;
    },
    editImage: (state, action: PayloadAction<FormData>) => {
      state.status.loading = true;
      state.status.error = "";
    },
    editImageSuccess: (state, { payload: images }) => {
      state.status.loading = false;
      state.status.error = "";
      state.next.Images = state.next.Images.concat(images);
    },
    editImageFailure: (state, { payload: error }) => {
      state.status.error = error;
      state.status.loading = false;
    },
    editItem: (
      state,
      action: PayloadAction<{
        [key: string]: "" | number | string | boolean | { url: string }[];
      }>
    ) => {
      state.status.error = "";
      state.status.message = "";
      state.status.loading = true;
    },
    editItemSuccess: (state, { payload: message }) => {
      state.status.error = "";
      state.status.message = message;
      state.status.loading = false;
    },
    editItemFailure: (state) => {
      state.status.message = "";
      state.status.error = "";
      state.status.loading = false;
    },
    
  },
});
export default editSlice.reducer;
export const EditActions = editSlice.actions;
