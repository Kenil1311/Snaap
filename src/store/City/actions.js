import {
    GET_CITY,
    GET_CITY_SUCCESS,
    GET_CITY_FAIL,
    ADD_NEW_CITY,
    ADD_NEW_CITY_SUCCESS,
    ADD_NEW_CITY_FAIL,
    UPDATE_CITY,
    UPDATE_CITY_SUCCESS,
    UPDATE_CITY_FAIL,
    DELETE_CITY,
    DELETE_CITY_SUCCESS,
    DELETE_CITY_FAIL,
    RESET_CITY_STATE
} from "./actionTypes";

// Get City
export const getCity = () => ({
    type: GET_CITY,
});

export const getCitySuccess = (city) => ({
    type: GET_CITY_SUCCESS,
    payload: city,
});

export const getCityFail = (error) => ({
    type: GET_CITY_FAIL,
    payload: error,
});

// Add City
export const addNewCity = (city) => ({
    type: ADD_NEW_CITY,
    payload: city,
});

export const addNewCitySuccess = (city) => ({
    type: ADD_NEW_CITY_SUCCESS,
    payload: city,
});

export const addNewCityFail = (error) => ({
    type: ADD_NEW_CITY_FAIL,
    payload: error,
});

// Update City
export const updateCity = (city) => ({
    type: UPDATE_CITY,
    payload: city,
});

export const updateCitySuccess = (city) => ({
    type: UPDATE_CITY_SUCCESS,
    payload: city,
});

export const updateCityFail = (error) => ({
    type: UPDATE_CITY_FAIL,
    payload: error,
});

// Delete City
export const deleteCity = (city) => ({
    type: DELETE_CITY,
    payload: city,
});

export const deleteCitySuccess = (city) => ({
    type: DELETE_CITY_SUCCESS,
    payload: city,
});

export const deleteCityFail = (error) => ({
    type: DELETE_CITY_FAIL,
    payload: error,
});

// Reset City State
export const resetCityState = () => ({
    type: RESET_CITY_STATE,
});
