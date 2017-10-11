import * as ReadableAPI from '../utils/Api';
import * as Types from './Types';
import uuid from 'uuid/v4';

/**
 * @description fetch a list of post comments from a particular post, pass id to API and return action and comments
 * @param { string } id
 * @return Types.GET_POST_COMMENTS and comments
 */
export const getPostComments = (id) => {
    return dispatch => {
        return ReadableAPI.fetchPostComments(id)
            .then(comments => {
                dispatch({ type: Types.GET_POST_COMMENTS, comments })
            })
    }
}

/**
 * @description create a new comment
 * @param { object } comment
 * @return Types.CREATE_COMMENT and success (true/false)
 */
export const createComment = (comment) => {
    comment.timestamp = Date.now();
    comment.id = uuid();
    return dispatch => {
        return ReadableAPI.createComment(comment)
            .then(success => {
                dispatch({ type: Types.CREATE_COMMENT, success })
            })
    }
}

/**
 * @description edit a comment
 * @param { object } comment
 * @return Types.EDIT_COMMENT and success (true/false)
 */
export const editComment = (comment) => {
    return dispatch => {
        return ReadableAPI.editComment(comment)
            .then(success => {
                dispatch({ type: Types.EDIT_COMMENT, success })
            })
    }
}

/**
 * @description delete a comment
 * @param { string } id
 * @return Types.DELETE_COMMENT and success (true/false)
 */
export const deleteComment = (id) => {
    return dispatch => {
        return ReadableAPI.deleteComment(id)
            .then(success => {
                dispatch({ type: Types.DELETE_COMMENT, success })
            })
    }
}

/**
 * @description vote on a comment
 * @param { string } id
 * @param { string } vote
 * @return Types.DO_COMMENT_VOTE and success (true/false)
 */
export const voteComment = (id, vote) => {
    return dispatch => {
        return ReadableAPI.doCommentVote(id,vote)
            .then((ok) => {
                dispatch({ type: Types.DO_COMMENT_VOTE, ok })
            })
    }
}