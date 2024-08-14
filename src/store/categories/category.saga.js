import { takeLatest, all, call, put } from 'redux-saga/effects'

import { getCategoriesAndDocuments } from '../../utils/firebase/firebase.utils'

import {
    fetchCategoriesSuccess,
    fetchCategoriesFailed,
} from './categories.action'

import { CATEGORIES_ACTION_TYPES } from './categories.types'

/* 
    In the original Thunk version, 
    fetchCategoriesAsync is an asynchronous function that directly calls getCategoriesAndDocuments within the function, 
    then dispatches the appropriate actions based on the result.
*/
// export const fetchCategoriesAsync = () => async dispatch => {
//     dispatch(fetchCategoriesStart())

//     try {
//         const categoriesArray = await getCategoriesAndDocuments('categories')
//         dispatch(fetchCategoriesSuccess(categoriesArray))
//     } catch (error) {
//         dispatch(fetchCategoriesFailed(error))
//     }
// }

// Saga Generator Function
export function* fetchCategoriesAsync() {
    try {
        // [call]: This is an Effect that allows you to invoke a function and return its result.
        // The call will wait for the function to complete before proceeding to the next yield statement.
        const categoriesArray = yield call(getCategoriesAndDocuments)

        // [put]: Another Effect used to dispatch an action, similar to how dispatch is used in Thunk.
        yield put(fetchCategoriesSuccess(categoriesArray))
    } catch (error) {
        yield put(fetchCategoriesFailed(error))
    }
}

// Watcher Saga Function
// Sagas work by listening for specific actions and triggering the corresponding handler function when the action is caught.
// So, we need to create a Generator function that listens for the CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START action.
export function* onFetchCategories() {
    // [takeLatest]: This is a Redux-Saga helper that only keeps the latest execution when the same action is dispatched multiple times, canceling previous executions.
    yield takeLatest(
        CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START,
        fetchCategoriesAsync
    )
}

// Integrating All the Sagas
export function* categoriesSaga() {
    // [all]: This is an Effect used to run multiple Sagas in parallel.
    yield all([
        // [call(onFetchCategories)]: We use call to invoke onFetchCategories, ensuring that it is invoked synchronously.
        call(onFetchCategories),
    ])
}
