import { call, put, takeLatest } from "redux-saga/effects";
import * as itemAPI from "../../lib/apis/itemAPI";
import { ItemActions } from "../slices/itemSlice";
function* excelAddItemSaga(action: {
  payload:
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
    | null;
}) {
  try {
    const response: { data: string } = yield call(
      itemAPI.excelAddItem,
      action.payload
    );
    yield put(ItemActions.excelAddItemSuccess(response.data));
  } catch (e: any) {
    console.error(e.response.data);
    yield put(ItemActions.excelAddItemFailure(e.response.data));
  }
}
export function* excelSaga() {
  yield takeLatest(ItemActions.excelAddItem, excelAddItemSaga);
}
