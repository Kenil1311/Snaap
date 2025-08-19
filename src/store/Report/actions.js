import {
  GET_REPORTS,
  GET_REPORTS_SUCCESS,
  GET_REPORTS_FAIL,
  ADD_NEW_REPORT,
  ADD_NEW_REPORT_SUCCESS,
  ADD_NEW_REPORT_FAIL,
  UPDATE_REPORT,
  UPDATE_REPORT_SUCCESS,
  UPDATE_REPORT_FAIL,
  DELETE_REPORT,
  DELETE_REPORT_SUCCESS,
  DELETE_REPORT_FAIL,
  RESET_REPORT_STATE
} from "./actionTypes";

// GET Reports
export const getReports = (filters = {}) => ({
  type: GET_REPORTS,
  payload: filters,
});

export const getReportsSuccess = (reports) => ({
  type: GET_REPORTS_SUCCESS,
  payload: reports,
});

export const getReportsFail = (error) => ({
  type: GET_REPORTS_FAIL,
  payload: error,
});

// ADD Report
export const addNewReport = (report) => ({
  type: ADD_NEW_REPORT,
  payload: report,
});

export const addNewReportSuccess = (report) => ({
  type: ADD_NEW_REPORT_SUCCESS,
  payload: report,
});

export const addNewReportFail = (error) => ({
  type: ADD_NEW_REPORT_FAIL,
  payload: error,
});

// UPDATE Report
export const updateReport = (report) => ({
  type: UPDATE_REPORT,
  payload: report,
});

export const updateReportSuccess = (report) => ({
  type: UPDATE_REPORT_SUCCESS,
  payload: report,
});

export const updateReportFail = (error) => ({
  type: UPDATE_REPORT_FAIL,
  payload: error,
});

// DELETE Report
export const deleteReport = (report) => ({
  type: DELETE_REPORT,
  payload: report,
});

export const deleteReportSuccess = (report) => ({
  type: DELETE_REPORT_SUCCESS,
  payload: report,
});

export const deleteReportFail = (error) => ({
  type: DELETE_REPORT_FAIL,
  payload: error,
});

// RESET Report State
export const resetReportState = () => ({
  type: RESET_REPORT_STATE,
});
