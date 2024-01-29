import { put, call, takeLatest } from "redux-saga/effects";
import { ItemActions } from "../slices/itemSlice";
import * as itemAPI from "../../lib/apis/itemAPI";
function* addImageSaga(action: { payload: FormData }) {
  const response: { data: { url: string }[] } = yield call(
    itemAPI.addImage,
    action.payload
  );
  yield put(ItemActions.addImageSuccess(response.data));
  try {
  } catch (e: any) {
    yield put(ItemActions.addImageFailure(e.response.data));
  }
}
function* removeImageSaga(action: { payload: { id: number; url: string } }) {
  try {
    const response: { data: { url: string }[] } = yield call(
      itemAPI.removeImage,
      action.payload
    );
    yield put(ItemActions.removeImageSuccess(response.data));
  } catch (e: any) {
    console.error(e);
    yield put(ItemActions.removeImageFailure(e.response.data));
  }
}
function* addItemSaga(action: {
  payload: {
    category: string;
    name: string;
    descript: string;
    unit: string;
    price: number;
    point: number;
    images: { url: string }[];
  };
}) {
  try {
    const response: {
      data: string;
    } = yield call(itemAPI.addItem, action.payload);
    yield put(ItemActions.addItemSuccess(response.data));
  } catch (e: any) {
    console.error(e);
    yield put(ItemActions.addItemFailure(e.response.data));
  }
}
function* getItemsSaga() {
  try {
    const response: {
      data: {
        category: string;
        name: string;
        descript: string;
        unit: string;
        price: number;
        point: number;
        images: { url: string }[];
      }[];
    } = yield call(itemAPI.getItems);
    yield put(ItemActions.getItemsSuccess(response.data));
  } catch (e: any) {
    console.error(e);
    yield put(ItemActions.getItemsFailure(e.response.data));
  }
}
export function* itemSaga() {
  yield takeLatest(ItemActions.addImage, addImageSaga);
  yield takeLatest(ItemActions.removeImage, removeImageSaga);
  yield takeLatest(ItemActions.addItem, addItemSaga);
  yield takeLatest(ItemActions.getItems, getItemsSaga);
}
