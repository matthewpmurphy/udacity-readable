import * as ReadableAPI from '../utils/Api';
import * as Types from './Types';
import uuid from 'uuid/v4';

export const getPost = (id) => {
    return dispatch => {
        return ReadableAPI.fetchPost(id)
            .then(post => {
                dispatch({ type: Types.GET_POST, post })
            })
    }
}

export const createPost = (post) => {
    post.timestamp = Date.now();
    post.id = uuid();

    return dispatch => {
        return ReadableAPI.createPost(post)
            .then(ok => {
                dispatch({ type: Types.CREATE_POST, ok })
            })
    }
}

export const editPost = (post) => {
    post.timestamp = Date.now();
    return dispatch => {
        return ReadableAPI.editPost(post)
            .then(ok => {
                dispatch({ type: Types.EDIT_POST, ok })
            })
    }
}

export const deletePost = (id) => {
    return dispatch => {
        return ReadableAPI.deletePost(id)
            .then(ok => {
                dispatch({ type: Types.DELETE_POST, ok })
            })
    }
}

export const votePost = (id, vote) => {
    return dispatch => {
        return ReadableAPI.doPostVote(id,vote)
            .then((ok) => {
                dispatch({ type: Types.DO_POST_VOTE, ok })
            })
    }
}
