import { call, put, takeEvery, takeLatest } from "redux-saga/effects";

// Login Redux States
import { LOGIN_USER, LOGOUT_USER, SOCIAL_LOGIN } from "./actionTypes";
import { apiError, loginSuccess, logoutUserSuccess } from "./actions";

// Import your API helper
import { post } from "../../../helpers/api_helper";

function* loginUser({ payload: { user, history } }) {
  try {
    // Call your backend login API
    const response = yield call(post, "users/login", {
      username: user.email.trim(),
      password: user.password.trim(),
    });

    if (response?.status === true) {
      // Save token in localStorage
      localStorage.setItem("authToken", response.data.token);
      // Save user details if needed
      localStorage.setItem("authUser", JSON.stringify(response.data.user));

      // Dispatch success action
      yield put(loginSuccess(response.data.user));

      // Redirect to dashboard
      history("/dashboard");
    } else {
      // API responded with an error status
      yield put(apiError(response?.message || "Invalid credentials"));
    }
  } catch (error) {
    // Network or unexpected error
    const errorMessage =
      error?.response?.data?.message ||
      error?.message ||
      "Something went wrong, please try again.";
    yield put(apiError(errorMessage));
  }
}

function* logoutUser({ payload: { history } }) {
  try {
    localStorage.removeItem("authUser");
    localStorage.removeItem("authToken");

    yield put(logoutUserSuccess());

    // Use navigate directly
    history("/login", { replace: true });

  } catch (error) {
    yield put(apiError(error.message));
  }
}

function* authSaga() {
  yield takeEvery(LOGIN_USER, loginUser);
  yield takeEvery(LOGOUT_USER, logoutUser);
}

export default authSaga;
