
export const getRequireContextModules = () =>
    require.context('../../modules/', true, /index.js$/)

export const getStore = () => {
    const { store } = require('../store')
    return {
        state: store.getState(),
        dispatch: store.dispatch
    }
}
