import * as Types from '../actions/Types';
import sortBy from 'sort-by';

const initialState = {
    comments: {},
    success: true,
    message: ''
}

/**
 * @description reducer for comments
 * @param { object } state
 * @param { object } action
 * @return list of non-deleted comments, success, and/or default state
 */
export function comments(state = initialState, action) {
    const { type, comments, ok } = action;

    switch(type) {
        case Types.GET_POST_COMMENTS:
            return { ...state, comments: comments.filter(comment => comment.delete !== false).sort(sortBy('-voteScore')) }
        case Types.DELETE_COMMENT:
            return { ...comments, success: ok }
        case Types.CREATE_COMMENT:
            return { ...state, success: ok }
        case Types.EDIT_COMMENT:
            return { ...state, success: ok }
        case Types.DO_COMMENT_VOTE:
            return { ...state, success: ok }
        default:
            return state;
    }
}