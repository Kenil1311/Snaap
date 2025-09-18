import { takeEvery, put, call, all, fork } from "redux-saga/effects";
import {
    ADD_NEW_CITY,
    DELETE_CITY,
    GET_CITY,
    UPDATE_CITY,
} from "./actionTypes";
import {
    updateCitySuccess,
    updateCityFail,
    deleteCitySuccess,
    deleteCityFail,
    getCitySuccess,
    getCityFail,
    addNewCitySuccess,
    addNewCityFail,
} from "./actions";

// REST API helpers
import { get, post, put as putApi, del } from "../../helpers/api_helper";
import { toast } from 'react-toastify';

// API endpoints
const GET_CITY_API = "/city";
const ADD_CITY_API = "/city";
const UPDATE_CITY_API = (id) => `/city/${id}`;
const DELETE_CITY_API = (id) => `/city/${id}`;

// Sagas
function* fetchCity() {
    try {
        const response = yield call(get, GET_CITY_API);

        if (response?.status) {
            yield put(getCitySuccess(response?.data));
        } else {
            yield put(getCityFail(response?.message));
            toast.error(response?.message);
        }
    } catch (error) {
        yield put(getCityFail(error?.response?.data?.message || "Failed to fetch cities, Please try again later!"));
        toast.error(error?.response?.data?.message || "Failed to fetch cities, Please try again later!");
    }
}

function* onAddNewCity({ payload: city }) {
    try {
        const response = yield call(post, ADD_CITY_API, city);

        if (response?.status) {
            yield put(addNewCitySuccess(response?.data));
            toast.success(response?.message);
        } else {
            yield put(addNewCityFail(response?.message));
            toast.error(response?.message);
        }
    } catch (error) {
        yield put(addNewCityFail(error?.response?.data?.message || "Failed to add city, Please try again later!"));
        toast.error(error?.response?.data?.message || "Failed to add city, Please try again later!");
    }
}

function* onUpdateCity({ payload: city }) {
    try {
        const response = yield call(putApi, UPDATE_CITY_API(city.id), city);

        if (response?.status) {
            yield put(updateCitySuccess(response?.data));
            toast.success(response?.message);
        } else {
            yield put(updateCityFail(response?.message));
            toast.error(response?.message);
        }
    } catch (error) {
        yield put(updateCityFail(error));
        toast.error("Failed to update city, Please try again later!");
    }
}

function* onDeleteCity({ payload: cityId }) {
    try {
        const response = yield call(del, DELETE_CITY_API(cityId));

        if (response.status) {
            yield put(deleteCitySuccess(cityId));
            toast.success(response?.message);
        } else {
            yield put(deleteCityFail(response?.message));
            toast.error(response?.message);
        }
    } catch (error) {
        yield put(deleteCityFail(error));
        toast.error("Failed to delete city, Please try again later!");
    }
}

// Watchers
export function* watchFetchCity() {
    yield takeEvery(GET_CITY, fetchCity);
}

export function* watchOnAddNewCity() {
    yield takeEvery(ADD_NEW_CITY, onAddNewCity);
}

export function* watchOnUpdateCity() {
    yield takeEvery(UPDATE_CITY, onUpdateCity);
}

export function* watchOnDeleteCity() {
    yield takeEvery(DELETE_CITY, onDeleteCity);
}

// Root saga
function* citySaga() {
    yield all([
        fork(watchFetchCity),
        fork(watchOnAddNewCity),
        fork(watchOnUpdateCity),
        fork(watchOnDeleteCity),
    ]);
}

export default citySaga;
