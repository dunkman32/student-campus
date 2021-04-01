
const allModules = (r) => r.keys().map((key) => r(key))

export const getAllModules = (requireContextModules) => {
    const modules = allModules(requireContextModules)

    return modules.filter((module) => module.moduleName)
}

export const getAllModuleReducers = (requireContextModules) => {
    const buildReducer = (state, module) => ({
        ...state,
        [module.moduleName]: module.reducer
    })

    const moduleReducers = getAllModules(requireContextModules, true)
        .filter((module) => module.reducer)
        .reduce(buildReducer, {})

    return moduleReducers
}

export const getAllModuleSagas = (requireContextModules) => {
    const buildSaga = (module) =>
        module.saga

    const moduleSagas = getAllModules(requireContextModules, false)
        .filter((module) => module.saga)
        .map(buildSaga)

    return moduleSagas
}
