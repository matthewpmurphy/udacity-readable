import { combineReducers  } from 'redux';
import { categories } from './Categories';
import { posts } from './Posts';
import { post } from './Post';
import { comments } from './Comments';

/**
 * @description combine all our reducers for use in the app
 */
export default combineReducers({
    categories,
    posts,
    post,
    comments
});