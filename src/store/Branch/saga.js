import { takeEvery, put, call, all, fork } from "redux-saga/effects";
import {
    ADD_NEW_BRANCH,
    DELETE_BRANCH,
    GET_BRANCHES,
    UPDATE_BRANCH,
} from "./actionTypes";
import {
    updateBranchSuccess,
    updateBranchFail,
    deleteBranchSuccess,
    deleteBranchFail,
    getBranchesSuccess,
    getBranchesFail,
    addNewBranchSuccess,
    addNewBranchFail,
} from "./actions";

// REST API helpers
import { get, post, put as putApi, del } from "../../helpers/api_helper";
import { toast } from 'react-toastify';

// API endpoints
const GET_BRANCHES_API = "/branch";
const ADD_BRANCH_API = "/branch";
const UPDATE_BRANCH_API = (id) => `/branch/${id}`;
const DELETE_BRANCH_API = (id) => `/branch/${id}`;

// Sagas
function* fetchBranches() {
    try {
        const response = yield call(get, GET_BRANCHES_API);
        if (response?.status) {
            yield put(getBranchesSuccess(response?.data));
        }
        else {
            yield put(getBranchesFail(response?.message));
            toast.error(response?.message);
        }

    } catch (error) {
        yield put(error?.response?.data?.message || "Failed to fetch branch, Please try again later!");
        toast.error(error?.response?.data?.message || "Failed to fetch branch, Please try again later!");
    }
}

function* onAddNewBranch({ payload: branch }) {
    try {
        const response = yield call(post, ADD_BRANCH_API, branch);

        if (response?.status) {
            yield put(addNewBranchSuccess(response?.data));
            toast.success(response?.message);
        }
        else {
            yield put(addNewBranchFail(response?.message));
            toast.error(response?.message);
        }

    } catch (error) {
        yield put(addNewBranchFail(error?.response?.data?.message || "Failed to add branch, Please try again later!"));
        toast.error(error?.response?.data?.message || "Failed to add branch, Please try again later!");
    }
}

function* onUpdateBranch({ payload: branch }) {
    try {
        const response = yield call(putApi, UPDATE_BRANCH_API(branch.id), branch);

        if (response?.status) {
            yield put(updateBranchSuccess(response?.data));
            toast.success(response?.message);
        }
        else {
            yield put(updateBranchFail(response?.message));
            toast.error(response?.message);
        }
    } catch (error) {
        console.log("error", error)
        yield put(updateBranchFail(error?.response?.data?.message || "Failed to update branch, Please try again later!"));
        toast.error(error?.response?.data?.message || "Failed to update branch, Please try again later!");
    }
}

function* onDeleteBranch({ payload: branchId }) {
    try {
        const response = yield call(del, DELETE_BRANCH_API(branchId));

        if (response.status) {
            yield put(deleteBranchSuccess(branchId));
            toast.success(response?.message);
        }
        else {
            yield put(deleteBranchFail(response?.message));
            toast.error(response?.message);
        }

    } catch (error) {
        yield put(deleteBranchFail(error?.response?.data?.message || "Failed to delete branch, Please try again later!"));
        toast.error(error?.response?.data?.message || "Failed to delete branch, Please try again later!");
    }
}

// Watchers
export function* watchFetchBranches() {
    yield takeEvery(GET_BRANCHES, fetchBranches);
}

export function* watchOnAddNewBranch() {
    yield takeEvery(ADD_NEW_BRANCH, onAddNewBranch);
}

export function* watchOnUpdateBranch() {
    yield takeEvery(UPDATE_BRANCH, onUpdateBranch);
}

export function* watchOnDeleteBranch() {
    yield takeEvery(DELETE_BRANCH, onDeleteBranch);
}

// Root saga
function* branchSaga() {
    yield all([
        fork(watchFetchBranches),
        fork(watchOnAddNewBranch),
        fork(watchOnUpdateBranch),
        fork(watchOnDeleteBranch),
    ]);
}

export default branchSaga;
