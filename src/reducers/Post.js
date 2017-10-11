import * as Types from '../actions/Types';

const initialState = {
    post: {},
    success: false,
    message: ''
}

/**
 * @description reducer for post
 * @param { object } state
 * @param { object } action
 * @return details of a post, success of an action, and/or default state
 */
export function post(state = initialState, action) {
    const { type, post, ok } = action;

    switch(type) {
        case Types.GET_POST:
            return { ...state, post: post}
        case Types.DO_POST_VOTE:
            return { ...state, success: ok }
        case Types.CREATE_POST:
            return { ...state, success: ok }
        case Types.EDIT_POST:
            return { ...state, success: ok }
        case Types.DELETE_POST:
            return { ...state, success: ok };
        default:
            return state;
    }
}