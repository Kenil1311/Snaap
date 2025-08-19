import {
    UPDATE_SEGMENT_SUCCESS,
    UPDATE_SEGMENT_FAIL,
    DELETE_SEGMENT_SUCCESS,
    DELETE_SEGMENT_FAIL,
    RESET_SEGMENT_STATE,
    GET_SEGMENTS_SUCCESS,
    ADD_NEW_SEGMENT_SUCCESS,
    GET_SEGMENTS_FAIL,
    ADD_NEW_SEGMENT_FAIL,
} from "./actionTypes";

const INIT_STATE = {
    segments: [],
    error: {},
};

const segment = (state = INIT_STATE, action) => {
    switch (action.type) {

        case GET_SEGMENTS_SUCCESS:
            return {
                ...state,
                segments: action.payload,
            };

        case ADD_NEW_SEGMENT_FAIL:
            return {
                ...state,
                error: action.payload,
            };

        case ADD_NEW_SEGMENT_SUCCESS:
            return {
                ...state,
                segments: [...state.segments, action.payload],
            };

        case GET_SEGMENTS_FAIL:
            return {
                ...state,
                error: action.payload,
            };

        case UPDATE_SEGMENT_SUCCESS:
            return {
                ...state,
                segments: state.segments.map(segment =>
                    segment.id.toString() === action?.payload?.id?.toString()
                        ? { ...segment, ...action.payload }
                        : segment
                ),
                isSegmentUpdated: true,
            };

        case UPDATE_SEGMENT_FAIL:
            return {
                ...state,
                error: action.payload,
            };

        case DELETE_SEGMENT_SUCCESS:
            return {
                ...state,
                segments: state.segments.filter(
                    segment => segment.id.toString() !== action.payload.toString()
                ),
            };

        case DELETE_SEGMENT_FAIL:
            return {
                ...state,
                error: action.payload,
            };

        case RESET_SEGMENT_STATE:
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

export default segment;
