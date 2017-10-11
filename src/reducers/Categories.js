import * as Types from '../actions/Types';

/**
 * @description reducer for categories
 * @param { object } state
 * @param { object } action
 * @return default state or a jsonlist of all categories
 */
export function categories(state = {}, action) {
    switch(action.type) {
        case Types.GET_ALL_CATEGORIES:
            return action.categories.reduce((categories, category) => {
                categories[category.name] = category.path
                return categories
            }, {})
        default:
            return state
        }
}