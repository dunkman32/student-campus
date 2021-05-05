import {call, put, takeLatest} from 'redux-saga/effects'
import {actions, constants} from '../index'
import {take, prev, next} from '../../../adapters/users'
import {uniqBy} from 'lodash'
export function* getList(action) {
    try {
        const querySnapshot = yield call(take, action.payload.limit, action.payload.filterStr)
        const data = []
        querySnapshot.forEach((snapshot) => {
            data.push(snapshot.data())
        })
        console.log(data, 'std');
        yield put(actions.get.success({
            data
        }))
    } catch (e) {
        const {response, message} = e
        yield put(actions.get.failure(response, message))
    }
}

export function* callPrev(action) {
    try {
        const querySnapshot = yield call(prev, action.payload.limit, action.payload.first)
        const data = []
        querySnapshot.then(r => {
            r.forEach((snapshot) => {
                data.push(snapshot.data())
            })
        })
        yield put(actions.prev.success({
            data: uniqBy(data, 'uid')
        }))
    } catch (e) {
        const {response, message} = e
        yield put(actions.prev.failure(response, message))
    }
}

export function* callNext(action) {
    try {
        const querySnapshot = yield call(take, action.payload.limit, action.payload.last)
        const data = []
        querySnapshot.forEach((snapshot) => {
            data.push(snapshot.data())
        })
        console.log(data, 'std');
        yield put(actions.next.success({
            data
        }))
    } catch (e) {
        const {response, message} = e
        yield put(actions.next.failure(response, message))
    }
}

export default function* () {
    yield takeLatest(constants.LIST_REQUESTED, getList)
    yield takeLatest(constants.PREV_LIST_REQUESTED, callPrev)
    yield takeLatest(constants.NEXT_LIST_REQUESTED, callNext)
}
