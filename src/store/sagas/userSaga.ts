import { call, put, takeLatest } from "redux-saga/effects";
import * as authAPI from "../../lib/apis/authAPI";
import { UserActions } from "../slices/userSlice";
function* checkSaga() {
  try {
    const response: { data: { id: number; name: string } } = yield call(
      authAPI.check
    );
    yield put(UserActions.checkSuccess(response.data));
  } catch (e: any) {
    // console.error(e);
    yield put(UserActions.checkFailure(e.response.data));
  }
}
function* logoutSaga() {
  yield call(authAPI.logout);
  try {
    localStorage.removeItem("user");
  } catch (e) {
    console.log("local storage is not working");
  }
}
function checkFailureSaga() {
  try {
    localStorage.removeItem("user");
  } catch (e) {
    console.log("local storage is not working");
  }
}
export function* userSaga() {
  yield takeLatest(UserActions.check, checkSaga);
  yield takeLatest(UserActions.logout, logoutSaga);
  yield takeLatest(UserActions.checkFailure, checkFailureSaga);
}
