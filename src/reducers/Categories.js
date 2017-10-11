import * as Types from '../actions/Types';

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