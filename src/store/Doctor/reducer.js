import {
    GET_DOCTOR_SUCCESS,
    GET_DOCTOR_FAIL,
    ADD_NEW_DOCTOR_SUCCESS,
    ADD_NEW_DOCTOR_FAIL,
    UPDATE_DOCTOR_SUCCESS,
    UPDATE_DOCTOR_FAIL,
    DELETE_DOCTOR_SUCCESS,
    DELETE_DOCTOR_FAIL,
    RESET_DOCTOR_STATE,
} from "./actionTypes";

const INIT_STATE = {
    doctor: [],
    error: {},
};

const doctorReducer = (state = INIT_STATE, action) => {
    switch (action.type) {

        case GET_DOCTOR_SUCCESS:
            return {
                ...state,
                doctor: action.payload,
            };

        case ADD_NEW_DOCTOR_FAIL:
            return {
                ...state,
                error: action.payload,
            };

        case ADD_NEW_DOCTOR_SUCCESS:
            return {
                ...state,
                doctor: [...state.doctor, action.payload],
            };

        case GET_DOCTOR_FAIL:
            return {
                ...state,
                error: action.payload,
            };

        case UPDATE_DOCTOR_SUCCESS:
            return {
                ...state,
                doctor: state.doctor.map(item =>
                    item.id.toString() === action?.payload?.id?.toString()
                        ? { ...item, ...action.payload }
                        : item
                ),
                isDoctorUpdated: true,
            };

        case UPDATE_DOCTOR_FAIL:
            return {
                ...state,
                error: action.payload,
            };

        case DELETE_DOCTOR_SUCCESS:
            return {
                ...state,
                doctor: state.doctor.filter(
                    item => item.id.toString() !== action.payload.toString()
                ),
            };

        case DELETE_DOCTOR_FAIL:
            return {
                ...state,
                error: action.payload,
            };

        case RESET_DOCTOR_STATE:
            const flag = action.payload.flag;
            const value = action.payload.value;
            return {
                ...state,
                [flag]: value,
            };

        default:
            return state;
    }
};

export default doctorReducer;
