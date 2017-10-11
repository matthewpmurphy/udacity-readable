import { fetchAllCategories } from '../utils/Api';
import * as Types from './Types';

/**
 * @description get a list of all categores from the api
 * @return get the list of categories, and return that list as well as type
 */
export function getAllCategories() {
    return dispatch => {
        return fetchAllCategories()
                .then(categories => {
                    dispatch({ type: Types.GET_ALL_CATEGORIES, categories })
                })
    }
}
