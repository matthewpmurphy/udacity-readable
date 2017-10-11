import * as ReadableAPI from '../utils/Api';
import * as Types from './Types';
import uuid from 'uuid/v4';

export const getPostComments = (id) => {
    return dispatch => {
        return ReadableAPI.fetchPostComments(id)
            .then(comments => {
                dispatch({ type: Types.GET_POST_COMMENTS, comments })
            })
    }
}

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

export const editComment = (comment) => {
    return dispatch => {
        return ReadableAPI.editComment(comment)
            .then(success => {
                dispatch({ type: Types.EDIT_COMMENT, success })
            })
    }
}

export const deleteComment = (id) => {
    return dispatch => {
        return ReadableAPI.deleteComment(id)
            .then(success => {
                dispatch({ type: Types.DELETE_COMMENT, success })
            })
    }
}

export const voteComment = (id, vote) => {
    return dispatch => {
        return ReadableAPI.doCommentVote(id,vote)
            .then((ok) => {
                dispatch({ type: Types.DO_COMMENT_VOTE, ok })
            })
    }
}