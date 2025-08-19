import {
    UPDATE_BRANCH_SUCCESS,
    UPDATE_BRANCH_FAIL,
    DELETE_BRANCH_SUCCESS,
    DELETE_BRANCH_FAIL,
    RESET_BRANCH_STATE,
    GET_BRANCHES_SUCCESS,
    ADD_NEW_BRANCH_SUCCESS,
    GET_BRANCHES_FAIL,
    ADD_NEW_BRANCH_FAIL,
} from "./actionTypes";

const INIT_STATE = {
    branches: [],
    error: {},
};

const branch = (state = INIT_STATE, action) => {
    switch (action.type) {


        case GET_BRANCHES_SUCCESS:
            return {
                ...state,
                branches: action.payload,
            };


        case ADD_NEW_BRANCH_FAIL:
            return {
                ...state,
                error: action.payload,
            };

        case ADD_NEW_BRANCH_SUCCESS:
            return {
                ...state,
                branches: [...state.branches, action.payload],
            };

        case GET_BRANCHES_FAIL:
            return {
                ...state,
                error: action.payload,
            };



        case UPDATE_BRANCH_SUCCESS:
            return {
                ...state,
                branches: state.branches.map(branch =>
                    branch.id.toString() === action?.payload?.id?.toString()
                        ? { ...branch, ...action.payload }
                        : branch
                ),
                isBranchUpdated: true,
            };

        case UPDATE_BRANCH_FAIL:
            return {
                ...state,
                error: action.payload,
            };

        case DELETE_BRANCH_SUCCESS:
            return {
                ...state,
                branches: state.branches.filter(
                    branch => branch.id.toString() !== action.payload.toString()
                ),
            };

        case DELETE_BRANCH_FAIL:
            return {
                ...state,
                error: action.payload,
            };

        case RESET_BRANCH_STATE:
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

export default branch;
