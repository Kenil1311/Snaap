import {
    GET_DOCTOR,
    GET_DOCTOR_SUCCESS,
    GET_DOCTOR_FAIL,
    ADD_NEW_DOCTOR,
    ADD_NEW_DOCTOR_SUCCESS,
    ADD_NEW_DOCTOR_FAIL,
    UPDATE_DOCTOR,
    UPDATE_DOCTOR_SUCCESS,
    UPDATE_DOCTOR_FAIL,
    DELETE_DOCTOR,
    DELETE_DOCTOR_SUCCESS,
    DELETE_DOCTOR_FAIL,
    RESET_DOCTOR_STATE
} from "./actionTypes";

// Get Doctor
export const getDoctor = () => ({
    type: GET_DOCTOR,
});

export const getDoctorSuccess = (doctor) => ({
    type: GET_DOCTOR_SUCCESS,
    payload: doctor,
});

export const getDoctorFail = (error) => ({
    type: GET_DOCTOR_FAIL,
    payload: error,
});

// Add Doctor
export const addNewDoctor = (doctor) => ({
    type: ADD_NEW_DOCTOR,
    payload: doctor,
});

export const addNewDoctorSuccess = (doctor) => ({
    type: ADD_NEW_DOCTOR_SUCCESS,
    payload: doctor,
});

export const addNewDoctorFail = (error) => ({
    type: ADD_NEW_DOCTOR_FAIL,
    payload: error,
});

// Update Doctor
export const updateDoctor = (doctor) => ({
    type: UPDATE_DOCTOR,
    payload: doctor,
});

export const updateDoctorSuccess = (doctor) => ({
    type: UPDATE_DOCTOR_SUCCESS,
    payload: doctor,
});

export const updateDoctorFail = (error) => ({
    type: UPDATE_DOCTOR_FAIL,
    payload: error,
});

// Delete Doctor
export const deleteDoctor = (doctor) => ({
    type: DELETE_DOCTOR,
    payload: doctor,
});

export const deleteDoctorSuccess = (doctor) => ({
    type: DELETE_DOCTOR_SUCCESS,
    payload: doctor,
});

export const deleteDoctorFail = (error) => ({
    type: DELETE_DOCTOR_FAIL,
    payload: error,
});

// Reset Doctor State
export const resetDoctorState = () => ({
    type: RESET_DOCTOR_STATE,
});
