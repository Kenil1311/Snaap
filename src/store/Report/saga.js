import { takeEvery, put, call, all, fork } from "redux-saga/effects";
import {
    ADD_NEW_REPORT,
    DELETE_REPORT,
    GET_REPORTS,
    UPDATE_REPORT,
} from "./actionTypes";
import {
    updateReportSuccess,
    updateReportFail,
    deleteReportSuccess,
    deleteReportFail,
    getReportsSuccess,
    getReportsFail,
    addNewReportSuccess,
    addNewReportFail,
} from "./actions";

// REST API helpers
import { get, post, put as putApi, del } from "../../helpers/api_helper";
import { toast } from 'react-toastify';
import qs from "qs";

// API endpoints
const GET_REPORTS_API = "/report";
const ADD_REPORT_API = "/report";
const UPDATE_REPORT_API = (id) => `/report/${id}`;
const DELETE_REPORT_API = (id) => `/report/${id}`;

// Sagas
function* fetchReports({ payload: filters }) {
    try {
        const queryString = qs.stringify(filters, { arrayFormat: "comma" });
        const response = yield call(get, `${GET_REPORTS_API}?${queryString}`);
        if (response?.status) {
            yield put(getReportsSuccess(response?.data));
        } else {
            yield put(getReportsFail(response?.message));
            toast.error(response?.message);
        }
    } catch (error) {
        console.log(error)
        yield put(getReportsFail(error?.response?.data?.message || "Failed to fetch reports, Please try again later!"));
        toast.error(error?.response?.data?.message || "Failed to fetch reports, Please try again later!");
    }
}

function* onAddNewReport({ payload: report }) {
    try {
        const response = yield call(post, ADD_REPORT_API, report);
        if (response?.status) {
            yield put(addNewReportSuccess(response?.data));
            toast.success(response?.message);
        } else {
            yield put(addNewReportFail(response?.message));
            toast.error(response?.message);
        }
    } catch (error) {
        console.log(error?.response?.data?.message || "Failed to add report, Please try again later!")
        yield put(addNewReportFail(error?.response?.data?.message || "Failed to add report, Please try again later!"));
        toast.error(error?.response?.data?.message || "Failed to add report, Please try again later!");
    }
}

function* onUpdateReport({ payload: report }) {
    try {
        const response = yield call(putApi, UPDATE_REPORT_API(report?.id), report);
        
        console.log(response)
        if (response?.status) {
            yield put(updateReportSuccess(response?.data));
            toast.success(response?.message);
        } else {
            yield put(updateReportFail(response?.message));
            toast.error(response?.message);
        }
    } catch (error) {
        console.log("here", error)
        yield put(updateReportFail(error?.response?.data?.message || "Failed to update report, Please try again later!"));
        toast.error(error?.response?.data?.message || "Failed to update report, Please try again later!");
    }
}

function* onDeleteReport({ payload: reportId }) {
    try {
        const response = yield call(del, DELETE_REPORT_API(reportId));
        if (response?.status) {
            yield put(deleteReportSuccess(reportId));
            toast.success(response?.message);
        } else {
            yield put(deleteReportFail(response?.message));
            toast.error(response?.message);
        }
    } catch (error) {
        yield put(deleteReportFail(error?.response?.data?.message || "Failed to delete report, Please try again later!"));
        toast.error(error?.response?.data?.message || "Failed to delete report, Please try again later!");
    }
}

// Watchers
export function* watchFetchReports() {
    yield takeEvery(GET_REPORTS, fetchReports);
}

export function* watchOnAddNewReport() {
    yield takeEvery(ADD_NEW_REPORT, onAddNewReport);
}

export function* watchOnUpdateReport() {
    yield takeEvery(UPDATE_REPORT, onUpdateReport);
}

export function* watchOnDeleteReport() {
    yield takeEvery(DELETE_REPORT, onDeleteReport);
}

// Root saga
function* reportSaga() {
    yield all([
        fork(watchFetchReports),
        fork(watchOnAddNewReport),
        fork(watchOnUpdateReport),
        fork(watchOnDeleteReport),
    ]);
}

export default reportSaga;
