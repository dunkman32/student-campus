import {constants} from '../index'
import {getAction as action} from '../../../helpers'

export const listById = ({
    request: (id, status) => action(constants.LIST_BY_ID_REQUESTED, {
        id,
        status
    }),
    success: (response) =>
        action(constants.LIST_BY_ID_SUCCEEDED, {response}),
    failure: (response, message) =>
        action(constants.LIST_BY_ID_FAILED, {
            response,
            message
        }),
    change: (id, status) =>
        action(constants.LIST_BY_ID_CHANGE_STATUS, {
            id,
            status
        })
})

export const list = ({
    request: (status, id) => action(constants.LIST_REQUESTED, {status, id}),
    success: (response) =>
        action(constants.LIST_SUCCEEDED, {response}),
    success_2: (response) =>
        action(constants.LIST_SUCCEEDED_2, {response}),
    failure: (response, message) =>
        action(constants.LIST_FAILED, {
            response,
            message
        }),
    change: (id, status) =>
        action(constants.LIST_CHANGE_STATUS, {
            id,
            status
        })
})
