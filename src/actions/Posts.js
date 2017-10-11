import * as ReadableAPI from '../utils/Api';
import * as Types from './Types';


export function getAllPosts(orderBy, ascending) {
    return dispatch => {
        return ReadableAPI.fetchAllPosts()
            .then(posts => {
                dispatch({ type: Types.GET_ALL_POSTS, posts, orderBy, ascending })
            })
    }
}

export function getPostsByCategory(category, orderBy, ascending) {
    return dispatch => {
        return ReadableAPI.fetchPostsByCategory(category)
            .then(posts => {
                dispatch({ type: Types.GET_POSTS_BY_CATEGORY, posts, orderBy, ascending })
            })
    }
}

export const orderPostsBy = (orderBy, ascending) => {
    return dispatch => {
        dispatch({ type: Types.ORDER_POSTS_BY, orderBy, ascending })
    }
}