import {constants} from '../index'
import {getAction as action} from '../../../helpers'
export const user = ({
    add: (user) => {
        if(user) {
            return action(constants.ADD, {user: user.providerData[0]})
        }
    },
    remove: () => action(constants.REMOVE),
})

