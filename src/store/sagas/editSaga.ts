import { call, put, takeLatest } from "redux-saga/effects";
import * as itemAPI from "../../lib/apis/itemAPI";
import { EditActions } from "../slices/editSlice";
function* editImageSaga(action: { payload: FormData }) {
  try {
    const response: { data: { url: string }[] } = yield call(
      itemAPI.addImage,
      action.payload
    );
    yield put(EditActions.editImageSuccess(response.data));
  } catch (e: any) {
    yield put(EditActions.editImageFailure(e.response.data));
  }
}
function* editItemSaga(action: {
  payload: {
    [key: string]: "" | number | string | boolean | { url: string }[];
  };
}) {
  const response: { data: string } = yield call(
    itemAPI.editItem,
    action.payload
  );
  yield put(EditActions.editItemSuccess(response.data));
}
export function* editSaga() {
  yield takeLatest(EditActions.editImage, editImageSaga);
  yield takeLatest(EditActions.editItem, editItemSaga);
}
