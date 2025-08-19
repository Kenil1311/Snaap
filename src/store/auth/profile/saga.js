import { takeEvery, fork, put, all, call } from "redux-saga/effects"

// Login Redux States
import { EDIT_PROFILE } from "./actionTypes"
import { profileSuccess, profileError } from "./actions"

import { put as apiPut } from "../../../helpers/api_helper"

function* editProfile({ payload: { user } }) {
  try {
    const response = yield call(apiPut, `users/${user.idx}`, {
      username: user.username?.trim(),
      email: user.email?.trim(),
    })

    if (response?.status === true) {
      localStorage.setItem("authUser", JSON.stringify(response.data));
      yield put(profileSuccess(response?.message))
    } else {
      // API responded with an error status
      yield put(profileError(response?.message || "Filed to update profile"));
    }

  } catch (error) {
    yield put(profileError(error))
  }
}
export function* watchProfile() {
  yield takeEvery(EDIT_PROFILE, editProfile)
}

function* ProfileSaga() {
  yield all([fork(watchProfile)])
}

export default ProfileSaga
