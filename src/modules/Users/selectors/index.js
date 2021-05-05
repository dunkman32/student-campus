
import { createSelector } from 'reselect'
import { moduleName } from '../index'

export const selectList = createSelector(
  (state) => state[moduleName],
  (data) => data.list
)

export const selectListData = createSelector(
    selectList, (list) => list.data
)
