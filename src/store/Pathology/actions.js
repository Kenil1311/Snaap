import {
    GET_PATHOLOGY,
    GET_PATHOLOGY_SUCCESS,
    GET_PATHOLOGY_FAIL,
    ADD_NEW_PATHOLOGY,
    ADD_NEW_PATHOLOGY_SUCCESS,
    ADD_NEW_PATHOLOGY_FAIL,
    UPDATE_PATHOLOGY,
    UPDATE_PATHOLOGY_SUCCESS,
    UPDATE_PATHOLOGY_FAIL,
    DELETE_PATHOLOGY,
    DELETE_PATHOLOGY_SUCCESS,
    DELETE_PATHOLOGY_FAIL,
    RESET_PATHOLOGY_STATE
} from "./actionTypes";

// Get Pathology
export const getPathology = () => ({
    type: GET_PATHOLOGY,
});

export const getPathologySuccess = (pathology) => ({
    type: GET_PATHOLOGY_SUCCESS,
    payload: pathology,
});

export const getPathologyFail = (error) => ({
    type: GET_PATHOLOGY_FAIL,
    payload: error,
});

// Add Pathology
export const addNewPathology = (pathology) => ({
    type: ADD_NEW_PATHOLOGY,
    payload: pathology,
});

export const addNewPathologySuccess = (pathology) => ({
    type: ADD_NEW_PATHOLOGY_SUCCESS,
    payload: pathology,
});

export const addNewPathologyFail = (error) => ({
    type: ADD_NEW_PATHOLOGY_FAIL,
    payload: error,
});

// Update Pathology
export const updatePathology = (pathology) => ({
    type: UPDATE_PATHOLOGY,
    payload: pathology,
});

export const updatePathologySuccess = (pathology) => ({
    type: UPDATE_PATHOLOGY_SUCCESS,
    payload: pathology,
});

export const updatePathologyFail = (error) => ({
    type: UPDATE_PATHOLOGY_FAIL,
    payload: error,
});

// Delete Pathology
export const deletePathology = (pathology) => ({
    type: DELETE_PATHOLOGY,
    payload: pathology,
});

export const deletePathologySuccess = (pathology) => ({
    type: DELETE_PATHOLOGY_SUCCESS,
    payload: pathology,
});

export const deletePathologyFail = (error) => ({
    type: DELETE_PATHOLOGY_FAIL,
    payload: error,
});

// Reset Pathology State
export const resetPathologyState = () => ({
    type: RESET_PATHOLOGY_STATE,
});
