import {
    GET_BRANCHES,
    GET_BRANCHES_SUCCESS,
    GET_BRANCHES_FAIL,
    ADD_NEW_BRANCH,
    ADD_NEW_BRANCH_SUCCESS,
    ADD_NEW_BRANCH_FAIL,
    UPDATE_BRANCH,
    UPDATE_BRANCH_SUCCESS,
    UPDATE_BRANCH_FAIL,
    DELETE_BRANCH,
    DELETE_BRANCH_SUCCESS,
    DELETE_BRANCH_FAIL,
    RESET_BRANCH_STATE
} from "./actionTypes";

export const getBranches = () => ({
    type: GET_BRANCHES,
});

export const getBranchesSuccess = (branches) => {
  return {
    type: GET_BRANCHES_SUCCESS,
    payload: branches,
  };
};

export const getBranchesFail = (error) => ({
    type: GET_BRANCHES_FAIL,
    payload: error,
});

export const addNewBranch = (branch) => ({
    type: ADD_NEW_BRANCH,
    payload: branch,
});

export const addNewBranchSuccess = (branch) => ({
    type: ADD_NEW_BRANCH_SUCCESS,
    payload: branch,
});

export const addNewBranchFail = (error) => ({
    type: ADD_NEW_BRANCH_FAIL,
    payload: error,
});

export const updateBranch = (branch) => ({
    type: UPDATE_BRANCH,
    payload: branch,
});

export const updateBranchSuccess = (branch) => ({
    type: UPDATE_BRANCH_SUCCESS,
    payload: branch,
});

export const updateBranchFail = (error) => ({
    type: UPDATE_BRANCH_FAIL,
    payload: error,
});

export const deleteBranch = (branch) => ({
    type: DELETE_BRANCH,
    payload: branch,
});

export const deleteBranchSuccess = (branch) => ({
    type: DELETE_BRANCH_SUCCESS,
    payload: branch,
});

export const deleteBranchFail = (error) => ({
    type: DELETE_BRANCH_FAIL,
    payload: error,
});

export const resetBranchState = () => ({
    type: RESET_BRANCH_STATE,
});