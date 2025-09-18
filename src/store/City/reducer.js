import {
    UPDATE_CITY_SUCCESS,
    UPDATE_CITY_FAIL,
    DELETE_CITY_SUCCESS,
    DELETE_CITY_FAIL,
    RESET_CITY_STATE,
    GET_CITY_SUCCESS,
    ADD_NEW_CITY_SUCCESS,
    GET_CITY_FAIL,
    ADD_NEW_CITY_FAIL,
} from "./actionTypes";

const INIT_STATE = {
    city: [],
    error: {},
};

const cityReducer = (state = INIT_STATE, action) => {
    switch (action.type) {

        case GET_CITY_SUCCESS:
            return {
                ...state,
                city: action.payload,
            };

        case ADD_NEW_CITY_FAIL:
            return {
                ...state,
                error: action.payload,
            };

        case ADD_NEW_CITY_SUCCESS:
            return {
                ...state,
                city: [...state.city, action.payload],
            };

        case GET_CITY_FAIL:
            return {
                ...state,
                error: action.payload,
            };

        case UPDATE_CITY_SUCCESS:
            return {
                ...state,
                city: state.city.map(item =>
                    item.id.toString() === action?.payload?.id?.toString()
                        ? { ...item, ...action.payload }
                        : item
                ),
                isCityUpdated: true,
            };

        case UPDATE_CITY_FAIL:
            return {
                ...state,
                error: action.payload,
            };

        case DELETE_CITY_SUCCESS:
            return {
                ...state,
                city: state.city.filter(
                    item => item.id.toString() !== action.payload.toString()
                ),
            };

        case DELETE_CITY_FAIL:
            return {
                ...state,
                error: action.payload,
            };

        case RESET_CITY_STATE:
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

export default cityReducer;
