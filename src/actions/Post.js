import * as ReadableAPI from '../utils/Api';
import * as Types from './Types';
import uuid from 'uuid/v4';

/**
 * @description retrieve a single post
 * @param { string } id
 * @return Action type and single post
 */
export const getPost = (id) => {
    return dispatch => {
        return ReadableAPI.fetchPost(id)
            .then(post => {
                dispatch({ type: Types.GET_POST, post })
            })
    }
}

/**
 * @description create a new post
 * @param { object } post
 * @return action type and ok (true/false)
 */
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

/**
 * @description edit a post
 * @param { object } post
 * @return action type and ok (true/false)
 */
export const editPost = (post) => {
    post.timestamp = Date.now();
    return dispatch => {
        return ReadableAPI.editPost(post)
            .then(ok => {
                dispatch({ type: Types.EDIT_POST, ok })
            })
    }
}

/**
 * @description delete a post
 * @param { string } id
 * @return action type and ok (true/false)
 */
export const deletePost = (id) => {
    return dispatch => {
        return ReadableAPI.deletePost(id)
            .then(ok => {
                dispatch({ type: Types.DELETE_POST, ok })
            })
    }
}

/**
 * @description create a new post
 * @param { string } id
 * @param { string } vote
 * @return action type and ok (true/false)
 */
export const votePost = (id, vote) => {
    return dispatch => {
        return ReadableAPI.doPostVote(id,vote)
            .then((ok) => {
                dispatch({ type: Types.DO_POST_VOTE, ok })
            })
    }
}
