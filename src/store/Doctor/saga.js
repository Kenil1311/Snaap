import { takeEvery, put, call, all, fork } from "redux-saga/effects";
import {
    ADD_NEW_DOCTOR,
    DELETE_DOCTOR,
    GET_DOCTOR,
    UPDATE_DOCTOR,
} from "./actionTypes";
import {
    updateDoctorSuccess,
    updateDoctorFail,
    deleteDoctorSuccess,
    deleteDoctorFail,
    getDoctorSuccess,
    getDoctorFail,
    addNewDoctorSuccess,
    addNewDoctorFail,
} from "./actions";

// REST API helpers
import { get, post, put as putApi, del } from "../../helpers/api_helper";
import { toast } from "react-toastify";

// API endpoints
const GET_DOCTOR_API = "/doctor";
const ADD_DOCTOR_API = "/doctor";
const UPDATE_DOCTOR_API = (id) => `/doctor/${id}`;
const DELETE_DOCTOR_API = (id) => `/doctor/${id}`;

// Sagas
function* fetchDoctor() {
    try {
        const response = yield call(get, GET_DOCTOR_API);

        if (response?.status) {
            yield put(getDoctorSuccess(response?.data));
        } else {
            yield put(getDoctorFail(response?.message));
            toast.error(response?.message);
        }
    } catch (error) {
        yield put(getDoctorFail(error?.response?.data?.message || "Failed to fetch doctors, Please try again later!"));
        toast.error(error?.response?.data?.message || "Failed to fetch doctors, Please try again later!");
    }
}

function* onAddNewDoctor({ payload: doctor }) {
    try {
        const response = yield call(post, ADD_DOCTOR_API, doctor);

        if (response?.status) {
            yield put(addNewDoctorSuccess(response?.data));
            toast.success(response?.message);
        } else {
            yield put(addNewDoctorFail(response?.message));
            toast.error(response?.message);
        }
    } catch (error) {
        yield put(addNewDoctorFail(error?.response?.data?.message || "Failed to add doctor, Please try again later!"));
        toast.error(error?.response?.data?.message || "Failed to add doctor, Please try again later!");
    }
}

function* onUpdateDoctor({ payload: doctor }) {
    try {
        const response = yield call(putApi, UPDATE_DOCTOR_API(doctor.id), doctor);

        if (response?.status) {
            yield put(updateDoctorSuccess(response?.data));
            toast.success(response?.message);
        } else {
            yield put(updateDoctorFail(response?.message));
            toast.error(response?.message);
        }
    } catch (error) {
        yield put(updateDoctorFail(error));
        toast.error("Failed to update doctor, Please try again later!");
    }
}

function* onDeleteDoctor({ payload: doctorId }) {
    try {
        const response = yield call(del, DELETE_DOCTOR_API(doctorId));

        if (response.status) {
            yield put(deleteDoctorSuccess(doctorId));
            toast.success(response?.message);
        } else {
            yield put(deleteDoctorFail(response?.message));
            toast.error(response?.message);
        }
    } catch (error) {
        yield put(deleteDoctorFail(error));
        toast.error("Failed to delete doctor, Please try again later!");
    }
}

// Watchers
export function* watchFetchDoctor() {
    yield takeEvery(GET_DOCTOR, fetchDoctor);
}

export function* watchOnAddNewDoctor() {
    yield takeEvery(ADD_NEW_DOCTOR, onAddNewDoctor);
}

export function* watchOnUpdateDoctor() {
    yield takeEvery(UPDATE_DOCTOR, onUpdateDoctor);
}

export function* watchOnDeleteDoctor() {
    yield takeEvery(DELETE_DOCTOR, onDeleteDoctor);
}

// Root saga
function* doctorSaga() {
    yield all([
        fork(watchFetchDoctor),
        fork(watchOnAddNewDoctor),
        fork(watchOnUpdateDoctor),
        fork(watchOnDeleteDoctor),
    ]);
}

export default doctorSaga;
