import * as ReadableAPI from '../utils/Api';
import * as Types from './Types';

/**
 * @description fetch all posts from api
 * @param { string } orderBy
 * @param { bool } ascending
 * return list of posts, action type, order by field, and ascending (true/false)
 */
export function getAllPosts(orderBy, ascending) {
    return dispatch => {
        return ReadableAPI.fetchAllPosts()
            .then(posts => {
                dispatch({ type: Types.GET_ALL_POSTS, posts, orderBy, ascending })
            })
    }
}

/**
 * @description fetch post by category
 * @param { string } category
 * @param { string } orderBy
 * @param { bool } ascending
 * @return action type, posts, orderBy, ascending
 */
export function getPostsByCategory(category, orderBy, ascending) {
    return dispatch => {
        return ReadableAPI.fetchPostsByCategory(category)
            .then(posts => {
                dispatch({ type: Types.GET_POSTS_BY_CATEGORY, posts, orderBy, ascending })
            })
    }
}

/**
 * @description order the list of posts
 * @param { string } orderBy
 * @param { bool } ascending
 */
export const orderPostsBy = (orderBy, ascending) => {
    return dispatch => {
        dispatch({ type: Types.ORDER_POSTS_BY, orderBy, ascending })
    }
}