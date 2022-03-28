import type { RootState } from '../../store'

export const selectSearch = (state: RootState) => state.searchReducer.search
export const selectResult = (state: RootState) => state.searchReducer.result