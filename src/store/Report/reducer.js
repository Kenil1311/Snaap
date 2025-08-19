import {
    GET_REPORTS_SUCCESS,
    GET_REPORTS_FAIL,
    ADD_NEW_REPORT_SUCCESS,
    ADD_NEW_REPORT_FAIL,
    UPDATE_REPORT_SUCCESS,
    UPDATE_REPORT_FAIL,
    DELETE_REPORT_SUCCESS,
    DELETE_REPORT_FAIL,
    RESET_REPORT_STATE
} from "./actionTypes";

const INIT_STATE = {
    reports: [],
    error: {},
};

const report = (state = INIT_STATE, action) => {
    switch (action.type) {

        // GET Reports
        case GET_REPORTS_SUCCESS:
            return {
                ...state,
                reports: action.payload,
            };

        case GET_REPORTS_FAIL:
            return {
                ...state,
                error: action.payload,
            };

        // ADD Report
        case ADD_NEW_REPORT_SUCCESS:
            return {
                ...state,
                reports: [...state.reports, action.payload],
            };

        case ADD_NEW_REPORT_FAIL:
            return {
                ...state,
                error: action.payload,
            };

        // UPDATE Report
        case UPDATE_REPORT_SUCCESS:
            return {
                ...state,
                reports: state.reports.map(report =>
                    report.id.toString() === action.payload.id.toString()
                        ? { ...report, ...action.payload }
                        : report
                ),
                isReportUpdated: true,
            };

        case UPDATE_REPORT_FAIL:
            return {
                ...state,
                error: action.payload,
            };

        // DELETE Report
        case DELETE_REPORT_SUCCESS:
            return {
                ...state,
                reports: state.reports.filter(
                    report => report.id.toString() !== action.payload.toString()
                ),
            };

        case DELETE_REPORT_FAIL:
            return {
                ...state,
                error: action.payload,
            };

        // RESET Report State
        case RESET_REPORT_STATE:
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

export default report;
