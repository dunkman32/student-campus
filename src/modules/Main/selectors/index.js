
import { createSelector } from 'reselect'
import { moduleName } from '../index'

export const selectList = createSelector(
  (state) => state[moduleName],
  (data) => data.list
)
