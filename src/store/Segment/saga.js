import { takeEvery, put, call, all, fork } from "redux-saga/effects";
import {
    ADD_NEW_SEGMENT,
    DELETE_SEGMENT,
    GET_SEGMENTS,
    UPDATE_SEGMENT,
} from "./actionTypes";
import {
    updateSegmentSuccess,
    updateSegmentFail,
    deleteSegmentSuccess,
    deleteSegmentFail,
    getSegmentsSuccess,
    getSegmentsFail,
    addNewSegmentSuccess,
    addNewSegmentFail,
} from "./actions";

// REST API helpers
import { get, post, put as putApi, del } from "../../helpers/api_helper";
import { toast } from 'react-toastify';

// API endpoints
const GET_SEGMENTS_API = "/sagment";
const ADD_SEGMENT_API = "/sagment";
const UPDATE_SEGMENT_API = (id) => `/sagment/${id}`;
const DELETE_SEGMENT_API = (id) => `/sagment/${id}`;

// Sagas
function* fetchSegments() {
    try {
        const response = yield call(get, GET_SEGMENTS_API);

        if (response?.status) {
            yield put(getSegmentsSuccess(response?.data));
        } else {
            yield put(getSegmentsFail(response?.message));
            toast.error(response?.message)
        }
    } catch (error) {
        yield put(getSegmentsFail(error?.response?.data?.message || "Failed to fetch segment, Please try again later!"));
        toast.error(error?.response?.data?.message || "Failed to fetch segment, Please try again later!")
    }
}

function* onAddNewSegment({ payload: segment }) {
    try {
        const response = yield call(post, ADD_SEGMENT_API, segment);

        if (response?.status) {
            console.log()
            yield put(addNewSegmentSuccess(response?.data));
            toast.success(response?.message);
        } else {
            yield put(addNewSegmentFail(response?.message));
            toast.error(response?.message);
        }
    } catch (error) {
        yield put(addNewSegmentFail(error?.response?.data?.message || "Failed to add segment, Please try again later!"));
        toast.error(error?.response?.data?.message || "Failed to add segment, Please try again later!");
    }
}

function* onUpdateSegment({ payload: segment }) {
    try {
        const response = yield call(putApi, UPDATE_SEGMENT_API(segment.id), segment);

        if (response?.status) {
            yield put(updateSegmentSuccess(response?.data));
            toast.success(response?.message);
        } else {
            yield put(updateSegmentFail(response?.message));
            toast.error(response?.message);
        }
    } catch (error) {
        yield put(updateSegmentFail(error));
        toast.error("Failed to update segment, Please try again later!");
    }
}

function* onDeleteSegment({ payload: segmentId }) {
    try {
        const response = yield call(del, DELETE_SEGMENT_API(segmentId));

        if (response.status) {
            yield put(deleteSegmentSuccess(segmentId));
            toast.success(response?.message);
        } else {
            yield put(deleteSegmentFail(response?.message));
            toast.error(response?.message);
        }
    } catch (error) {
        yield put(deleteSegmentFail(error));
        toast.error("Failed to delete segment, Please try again later!");
    }
}

// Watchers
export function* watchFetchSegments() {
    yield takeEvery(GET_SEGMENTS, fetchSegments);
}

export function* watchOnAddNewSegment() {
    yield takeEvery(ADD_NEW_SEGMENT, onAddNewSegment);
}

export function* watchOnUpdateSegment() {
    yield takeEvery(UPDATE_SEGMENT, onUpdateSegment);
}

export function* watchOnDeleteSegment() {
    yield takeEvery(DELETE_SEGMENT, onDeleteSegment);
}

// Root saga
function* segmentSaga() {
    yield all([
        fork(watchFetchSegments),
        fork(watchOnAddNewSegment),
        fork(watchOnUpdateSegment),
        fork(watchOnDeleteSegment),
    ]);
}

export default segmentSaga;
