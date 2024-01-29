import { createSlice, createSelector, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "..";
type State = {
  items: {
    id: "" | number;
    category: string;
    name: string;
    descript: string;
    unit: string;
    price: number;
    point: number;
    use: boolean;
    Images: { url: string }[];
  }[];
  input: {
    [key: string]: "" | number | string | boolean;
    category: string;
    name: string;
    descript: string;
    unit: string;
    price: number;
    point: number;
    use: boolean;
  };
  images: { url: string }[];
  status: { loading: boolean; error: string; message: string };
};
const initialState: State = {
  items: [],
  input: {
    category: "회로",
    name: "",
    descript: "",
    unit: "￦",
    price: 0,
    point: 0,
    use: true,
  },
  images: [],
  status: { loading: false, error: "", message: "" },
};
const itemSelector = (state: RootState) => {
  return state.item.items;
};
const imagesSelector = (state: RootState) => {
  return state.item.images;
};
const inputSelector = (state: RootState) => {
  return state.item.input;
};
const statusSelector = (state: RootState) => {
  return state.item.status;
};
export const ItemData = createSelector(
  itemSelector,
  imagesSelector,
  inputSelector,
  statusSelector,
  (items, images, input, status) => ({ items, images, input, status })
);
const itemSlice = createSlice({
  name: "item",
  initialState,
  reducers: {
    initForm: (state) => {
      state.input = initialState.input;
    },
    changeInput: (state, { payload: { key, value } }) => {
      state.input[key] = value;
    },
    addImage: (state, action: PayloadAction<FormData>) => {
      state.status.loading = true;
      state.status.error = "";
    },
    addImageSuccess: (state, { payload: images }) => {
      state.status.loading = false;
      state.status.error = "";
      state.images = state.images.concat(images);
    },
    addImageFailure: (state, { payload: error }) => {
      state.status.loading = false;
      state.status.error = error;
    },
    removeImage: (
      state,
      action: PayloadAction<{ id: number; url: string }>
    ) => {
      state.status.loading = true;
      state.status.error = "";
    },
    removeImageSuccess: (state, { payload: images }) => {
      state.status.loading = false;
      state.status.error = "";
      state.images = state.images.concat(images);
    },
    removeImageFailure: (state, { payload: error }) => {
      state.status.loading = false;
      state.status.error = error;
    },
    excelAddItem: (
      state,
      aciton: PayloadAction<
        | {
            category: string;
            name: string;
            descript: string;
            unit: string;
            price: number;
            point: number;
            use: boolean;
            images: { url: string }[];
          }[]
        | null
      >
    ) => {
      state.status.loading = true;
      state.status.error = "";
    },
    excelAddItemSuccess: (state, { payload: message }) => {
      state.status.loading = false;
      state.status.error = "";
      state.status.message = message;
    },
    excelAddItemFailure: (state, { payload: error }) => {
      state.status.loading = false;
      state.status.error = error;
      state.status.message = "";
    },
    addItem: (
      state,
      action: PayloadAction<{
        category: string;
        name: string;
        descript: string;
        unit: string;
        price: number;
        point: number;
        use: boolean;
        images: { url: string }[];
      }>
    ) => {
      state.status.loading = true;
      state.status.error = "";
      state.status.message = "";
    },
    addItemSuccess: (state, { payload: message }) => {
      state.status.loading = false;
      state.status.error = "";
      state.status.message = message;
      // state.items = state.items.concat(item);
    },
    addItemFailure: (state, { payload: error }) => {
      state.status.loading = false;
      state.status.error = error;
      state.status.message = "";
    },
    addedItemInsert: (state, { payload: newItem }) => {
      state.items = state.items.concat(newItem);
    },
    getItems: (state) => {
      state.status.loading = true;
      state.status.error = "";
      state.status.message = "";
    },
    getItemsSuccess: (state, { payload: items }) => {
      state.items = items;
      state.status.loading = false;
      state.status.error = "";
      state.status.message = "";
    },
    getItemsFailure: (state, { payload: error }) => {
      state.status.error = error;
      state.status.loading = false;
      state.status.message = "";
    },
    changeItems: (state, { payload: { idx, newItem } }) => {
      console.log(newItem);
      state.items.splice(idx, 1, newItem);
    },
  },
});
export default itemSlice.reducer;
export const ItemActions = itemSlice.actions;
