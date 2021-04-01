import {
    isBoolean,
    isString,
    isArray,
    isObject
} from 'lodash'

export const getAction = (type, payload = {}) =>
    ({
        type,
        payload
    })

// https://stackoverflow.com/a/42349521
export const getProp = (fn, defaultValue) => {
    try {
        const val = fn()
        if (isBoolean(defaultValue) && !isBoolean(val)) {
            return defaultValue
        }
        if (isString(defaultValue) && !isString(val)) {
            return defaultValue
        }
        if (isArray(defaultValue) && !isArray(val)) {
            return defaultValue
        }
        if (isObject(defaultValue) && !isObject(val)) {
            return defaultValue
        }
        return val || defaultValue
    } catch (err) {
        return defaultValue
    }
}
