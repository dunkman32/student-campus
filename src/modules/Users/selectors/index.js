
import { createSelector } from 'reselect'
import { moduleName } from '../index'

export const mainSelectors = createSelector(
  (state) => state[moduleName],
  (data) => data
)

export const selectList = createSelector(
    mainSelectors,
  (data) => data.list
)

export const selectListData = createSelector(
    selectList, (list) => list.data
)

export const selectUserById = createSelector(
    mainSelectors,
    (data) => data.user.data
)
