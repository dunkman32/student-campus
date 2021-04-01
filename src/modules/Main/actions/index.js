import {constants} from '../index'
import {getAction as action} from '../../../helpers'

export const get = ({
    request: () => action(constants.LIST_REQUESTED),
    success: (response) =>
        action(constants.LIST_SUCCEEDED, {response}),
    failure: (response, message) =>
        action(constants.LIST_FAILED, {
            response,
            message
        })
})

export const add = ({
    request: (data) =>
        action(constants.ADD_REQUESTED, {data}),
    success: () =>
        action(constants.ADD_SUCCEEDED),
    failure: (response, message) =>
        action(constants.ADD_FAILED, {
            response,
            message
        })
})

export const remove = ({
    request: (id) =>
        action(constants.REMOVE_REQUESTED, {id}),
    success: () =>
        action(constants.REMOVE_SUCCEEDED),
    failure: (response, message) =>
        action(constants.REMOVE_FAILED, {
            response,
            message
        })
})
