
import { createSelector } from 'reselect'
import { moduleName } from '../index'

export const selectUser = createSelector(
  (state) => state[moduleName],
  (data) => data.user.user
)
