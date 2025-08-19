import {
    UPDATE_PATHOLOGY_SUCCESS,
    UPDATE_PATHOLOGY_FAIL,
    DELETE_PATHOLOGY_SUCCESS,
    DELETE_PATHOLOGY_FAIL,
    RESET_PATHOLOGY_STATE,
    GET_PATHOLOGY_SUCCESS,
    ADD_NEW_PATHOLOGY_SUCCESS,
    GET_PATHOLOGY_FAIL,
    ADD_NEW_PATHOLOGY_FAIL,
} from "./actionTypes";

const INIT_STATE = {
    pathology: [],
    error: {},
};

const pathology = (state = INIT_STATE, action) => {
    switch (action.type) {

        case GET_PATHOLOGY_SUCCESS:
            return {
                ...state,
                pathology: action.payload,
            };

        case ADD_NEW_PATHOLOGY_FAIL:
            return {
                ...state,
                error: action.payload,
            };

        case ADD_NEW_PATHOLOGY_SUCCESS:
            return {
                ...state,
                pathology: [...state.pathology, action.payload],
            };

        case GET_PATHOLOGY_FAIL:
            return {
                ...state,
                error: action.payload,
            };

        case UPDATE_PATHOLOGY_SUCCESS:
            return {
                ...state,
                pathology: state.pathology.map(item =>
                    item.id.toString() === action?.payload?.id?.toString()
                        ? { ...item, ...action.payload }
                        : item
                ),
                isPathologyUpdated: true,
            };

        case UPDATE_PATHOLOGY_FAIL:
            return {
                ...state,
                error: action.payload,
            };

        case DELETE_PATHOLOGY_SUCCESS:
            return {
                ...state,
                pathology: state.pathology.filter(
                    item => item.id.toString() !== action.payload.toString()
                ),
            };

        case DELETE_PATHOLOGY_FAIL:
            return {
                ...state,
                error: action.payload,
            };

        case RESET_PATHOLOGY_STATE:
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

export default pathology;
