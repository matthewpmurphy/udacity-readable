import { combineReducers  } from 'redux';
import { categories } from './Categories';
import { posts } from './Posts';
import { post } from './Post';
import { comments } from './Comments';

export default combineReducers({
    categories,
    posts,
    post,
    comments
});