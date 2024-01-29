import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { all, call } from "redux-saga/effects";
import itemSlice from "./slices/itemSlice";
import authSlice from "./slices/authSlice";
import userSlice from "./slices/userSlice";
import formSlice from "./slices/formSlice";
import editSlice from "./slices/editSlice";
import excelSlice from "./slices/excelSlice";
import { authSaga } from "./sagas/authSaga";
import { userSaga } from "./sagas/userSaga";
import { itemSaga } from "./sagas/itemSaga";
import { editSaga } from "./sagas/editSaga";
import { excelSaga } from "./sagas/excelSaga";

import createSagaMiddleware from "redux-saga";
import { UserActions } from "./slices/userSlice";
function* rootSaga() {
  yield all([
    call(authSaga),
    call(userSaga),
    call(itemSaga),
    call(editSaga),
    call(excelSaga),
  ]);
}
const sagaMiddleware = createSagaMiddleware();
const reducers = combineReducers({
  auth: authSlice,
  item: itemSlice,
  user: userSlice,
  form: formSlice,
  edit: editSlice,
  excel: excelSlice,
});
const getUser = () => {
  // const user = localStorage.getItem("user");
  // store.dispatch(UserActions.tempSetUser(user));
  // if (!user) {
  store.dispatch(UserActions.check());

  // }
};
const createStore = () => {
  const store = configureStore({
    reducer: reducers,
    middleware: [sagaMiddleware],
  });
  sagaMiddleware.run(rootSaga);
  return store;
};
const store = createStore();
getUser();
export default store;
export type RootState = ReturnType<typeof store.getState>;
