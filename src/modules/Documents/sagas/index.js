import {call, put, takeLatest} from 'redux-saga/effects'
import {actions, constants} from '../index'
import { takeDocumentsWithFilters, takeDocuments} from '../../../adapters/documents'
export function* getListById(action) {
    try {
        const querySnapshot = yield call(takeDocumentsWithFilters, action.payload.id, action.payload.status)
        const data = []
        querySnapshot.forEach((snapshot) => {
            data.push(snapshot.data())
        })
        yield put(actions.listById.success({
            data
        }))
    } catch (e) {
        const {response, message} = e
        yield put(actions.listById.failure(response, message))
    }
}

export function* getList(action) {
    try {
        const querySnapshot = yield call(takeDocuments, action.payload.status, action.payload.id)
        const data = []
        querySnapshot.forEach((snapshot) => {
            data.push(snapshot.data())
        })
        if(action.payload.id) {
            yield put(actions.list.success_2({
                data
            }))
        }else {
            yield put(actions.list.success({
                data
            }))
        }
    } catch (e) {
        const {response, message} = e
        yield put(actions.list.failure(response, message))
    }
}

export default function* () {
    yield takeLatest(constants.LIST_BY_ID_REQUESTED, getListById)
    yield takeLatest(constants.LIST_REQUESTED, getList)
}
