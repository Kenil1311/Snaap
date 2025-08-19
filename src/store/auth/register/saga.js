import { takeEvery, fork, put, all, call } from "redux-saga/effects";

// Account Redux states
import { REGISTER_USER } from "./actionTypes";
import { registerUserSuccessful, registerUserFailed } from "./actions";

// API helper
import { post } from "../../../helpers/api_helper";

function* registerUser({ payload: { user} }) {
  try {
    // Call your backend register API
    const response = yield call(post, "users/register", {
      username: user.username.trim(),
      email: user.email.trim(),
      password: user.password.trim(),
    });

    if (response?.status === true) {
      // Registration success
      yield put(registerUserSuccessful(response.data));      
    } else {
      // API returned failure
      yield put(registerUserFailed(response?.message || "Registration failed"));
    }
  } catch (error) {
    // Handle network or server errors
    const errorMessage =
      error?.response?.data?.message ||
      error?.message ||
      "Something went wrong, please try again.";
    yield put(registerUserFailed(errorMessage));
  }
}

export function* watchUserRegister() {
  yield takeEvery(REGISTER_USER, registerUser);
}

function* accountSaga() {
  yield all([fork(watchUserRegister)]);
}

export default accountSaga;
