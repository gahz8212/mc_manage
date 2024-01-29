import { call, put, takeLatest } from "redux-saga/effects";
import * as authAPI from "../../lib/apis/authAPI";
import { AuthActions } from "../slices/authSlice";
function* loginSaga(action: { payload: { email: string; password: string } }) {
  try {
    const response: { data: string } = yield call(
      authAPI.login,
      action.payload
    );
    yield put(AuthActions.loginSuccess(response.data));
  } catch (e: any) {
    yield put(AuthActions.loginFailure);
  }
}
function* joinSaga(action: {
  payload: { email: string; name: string; password: string };
}) {
  try {
    const response: { data: string } = yield call(authAPI.join, action.payload);
    yield put(AuthActions.joinSuccess(response.data));
  } catch (e: any) {
    yield put(AuthActions.joinFailure(e.response.data));
  }
}
export function* authSaga() {
  yield takeLatest(AuthActions.login, loginSaga);
  yield takeLatest(AuthActions.join, joinSaga);
}
