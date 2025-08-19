import {
    GET_SEGMENTS,
    GET_SEGMENTS_SUCCESS,
    GET_SEGMENTS_FAIL,
    ADD_NEW_SEGMENT,
    ADD_NEW_SEGMENT_SUCCESS,
    ADD_NEW_SEGMENT_FAIL,
    UPDATE_SEGMENT,
    UPDATE_SEGMENT_SUCCESS,
    UPDATE_SEGMENT_FAIL,
    DELETE_SEGMENT,
    DELETE_SEGMENT_SUCCESS,
    DELETE_SEGMENT_FAIL,
    RESET_SEGMENT_STATE
} from "./actionTypes";

export const getSegments = () => ({
    type: GET_SEGMENTS,
});

export const getSegmentsSuccess = (segments) => ({
    type: GET_SEGMENTS_SUCCESS,
    payload: segments,
});

export const getSegmentsFail = (error) => ({
    type: GET_SEGMENTS_FAIL,
    payload: error,
});

export const addNewSegment = (segment) => ({
    type: ADD_NEW_SEGMENT,
    payload: segment,
});

export const addNewSegmentSuccess = (segment) => ({
    type: ADD_NEW_SEGMENT_SUCCESS,
    payload: segment,
});

export const addNewSegmentFail = (error) => ({
    type: ADD_NEW_SEGMENT_FAIL,
    payload: error,
});

export const updateSegment = (segment) => ({
    type: UPDATE_SEGMENT,
    payload: segment,
});

export const updateSegmentSuccess = (segment) => ({
    type: UPDATE_SEGMENT_SUCCESS,
    payload: segment,
});

export const updateSegmentFail = (error) => ({
    type: UPDATE_SEGMENT_FAIL,
    payload: error,
});

export const deleteSegment = (segment) => ({
    type: DELETE_SEGMENT,
    payload: segment,
});

export const deleteSegmentSuccess = (segment) => ({
    type: DELETE_SEGMENT_SUCCESS,
    payload: segment,
});

export const deleteSegmentFail = (error) => ({
    type: DELETE_SEGMENT_FAIL,
    payload: error,
});

export const resetSegmentState = () => ({
    type: RESET_SEGMENT_STATE,
});
