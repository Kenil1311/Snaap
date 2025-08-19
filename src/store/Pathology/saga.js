import { takeEvery, put, call, all, fork } from "redux-saga/effects";
import {
    ADD_NEW_PATHOLOGY,
    DELETE_PATHOLOGY,
    GET_PATHOLOGY,
    UPDATE_PATHOLOGY,
} from "./actionTypes";
import {
    updatePathologySuccess,
    updatePathologyFail,
    deletePathologySuccess,
    deletePathologyFail,
    getPathologySuccess,
    getPathologyFail,
    addNewPathologySuccess,
    addNewPathologyFail,
} from "./actions";

// REST API helpers
import { get, post, put as putApi, del } from "../../helpers/api_helper";
import { toast } from 'react-toastify';

// API endpoints
const GET_PATHOLOGY_API = "/pathology";
const ADD_PATHOLOGY_API = "/pathology";
const UPDATE_PATHOLOGY_API = (id) => `/pathology/${id}`;
const DELETE_PATHOLOGY_API = (id) => `/pathology/${id}`;

// Sagas
function* fetchPathology() {
    try {
        const response = yield call(get, GET_PATHOLOGY_API);

        if (response?.status) {
            yield put(getPathologySuccess(response?.data));
        } else {
            yield put(getPathologyFail(response?.message));
            toast.error(response?.message);
        }
    } catch (error) {
        yield put(getPathologyFail(error?.response?.data?.message || "Failed to fetch pathology, Please try again later!"));
        toast.error(error?.response?.data?.message || "Failed to fetch pathology, Please try again later!");
    }
}

function* onAddNewPathology({ payload: pathology }) {
    try {
        const response = yield call(post, ADD_PATHOLOGY_API, pathology);

        if (response?.status) {
            yield put(addNewPathologySuccess(response?.data));
            toast.success(response?.message);
        } else {
            yield put(addNewPathologyFail(response?.message));
            toast.error(response?.message);
        }
    } catch (error) {
        yield put(addNewPathologyFail(error?.response?.data?.message || "Failed to add pathology, Please try again later!"));
        toast.error(error?.response?.data?.message || "Failed to add pathology, Please try again later!");
    }
}

function* onUpdatePathology({ payload: pathology }) {
    try {
        const response = yield call(putApi, UPDATE_PATHOLOGY_API(pathology.id), pathology);

        if (response?.status) {
            yield put(updatePathologySuccess(response?.data));
            toast.success(response?.message);
        } else {
            yield put(updatePathologyFail(response?.message));
            toast.error(response?.message);
        }
    } catch (error) {
        yield put(updatePathologyFail(error));
        toast.error("Failed to update pathology, Please try again later!");
    }
}

function* onDeletePathology({ payload: pathologyId }) {
    try {
        const response = yield call(del, DELETE_PATHOLOGY_API(pathologyId));

        if (response.status) {
            yield put(deletePathologySuccess(pathologyId));
            toast.success(response?.message);
        } else {
            yield put(deletePathologyFail(response?.message));
            toast.error(response?.message);
        }
    } catch (error) {
        yield put(deletePathologyFail(error));
        toast.error("Failed to delete pathology, Please try again later!");
    }
}

// Watchers
export function* watchFetchPathology() {
    yield takeEvery(GET_PATHOLOGY, fetchPathology);
}

export function* watchOnAddNewPathology() {
    yield takeEvery(ADD_NEW_PATHOLOGY, onAddNewPathology);
}

export function* watchOnUpdatePathology() {
    yield takeEvery(UPDATE_PATHOLOGY, onUpdatePathology);
}

export function* watchOnDeletePathology() {
    yield takeEvery(DELETE_PATHOLOGY, onDeletePathology);
}

// Root saga
function* pathologySaga() {
    yield all([
        fork(watchFetchPathology),
        fork(watchOnAddNewPathology),
        fork(watchOnUpdatePathology),
        fork(watchOnDeletePathology),
    ]);
}

export default pathologySaga;
