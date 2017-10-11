import { fetchAllCategories } from '../utils/Api';
import * as Types from './Types';


function getAll(categories) {
    return {
        type: Types.GET_ALL_CATEGORIES, categories
    }
}

export function getAllCategories() {
    return dispatch => {
        return fetchAllCategories()
                .then(data => dispatch(getAll(data)))
    }
}