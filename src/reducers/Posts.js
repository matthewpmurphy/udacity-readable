import * as Types from '../actions/Types';
import sortBy from 'sort-by';

/**
 * @description reducer for posts
 * @param { object } state
 * @param { object } action
 * @return list of non-deleted posts, sorted posts, and/or default state
 */
export function posts(state = {}, action) {
    const { type, posts, orderBy, ascending } = action;
    var updown = '';
    if(!ascending)
        updown = '-';
    switch(type) {
        case Types.GET_ALL_POSTS:
            return posts.filter(post => post.deleted === false).sort(sortBy(updown+orderBy))
        case Types.GET_POSTS_BY_CATEGORY:
            return posts.filter(post => post.deleted === false).sort(sortBy(updown+orderBy))
        case Types.ORDER_POSTS_BY:
            return [].concat(state.sort(sortBy(updown+orderBy)))
        default:
            return state;
    }
}