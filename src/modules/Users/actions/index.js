import {constants} from '../index'
import {getAction as action} from '../../../helpers'

export const get = ({
    request: (params) => action(constants.LIST_REQUESTED, params),
    success: (response) =>
        action(constants.LIST_SUCCEEDED, {response}),
    failure: (response, message) =>
        action(constants.LIST_FAILED, {
            response,
            message
        })
})

export const getUserById = ({
    request: (id) => action(constants.GET_USER_BY_ID_REQUESTED, {id}),
    success: (user) =>
        action(constants.GET_USER_BY_ID_SUCCEEDED, {user}),
    failure: (response, message) =>
        action(constants.GET_USER_BY_ID_FAILED, {
            response,
            message
        })
})

export const prev = ({
    request: (params) => action(constants.PREV_LIST_REQUESTED, params),
    success: (response) =>
        action(constants.PREV_LIST_SUCCEEDED, {response}),
    failure: (response, message) =>
        action(constants.PREV_LIST_FAILED, {
            response,
            message
        })
})

export const next = ({
    request: (params) => action(constants.NEXT_LIST_REQUESTED, params),
    success: (response) =>
        action(constants.NEXT_LIST_SUCCEEDED, {response}),
    failure: (response, message) =>
        action(constants.NEXT_LIST_FAILED, {
            response,
            message
        })
})
