
import { createSelector } from 'reselect'
import { moduleName } from '../index'

export const mainSelector = createSelector(
  (state) => state[moduleName],
  (data) => data
)
export const selectList = createSelector(
  (state) => state[moduleName],
  (data) => data.listById
)


export const selectListOfDocumentsById = createSelector(
    selectList, (list) => list.data
)

export const selectListOfDocuments = createSelector(
    mainSelector, (list) => list.list.data
)
