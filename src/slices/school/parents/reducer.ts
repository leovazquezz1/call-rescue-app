import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { Parents } from '@src/dtos'
import { initStore } from '@src/utils/init_store'

interface ParentsState {
  parentsList: Parents[] | null
  isLoading: boolean
}

const initialState: ParentsState = {
  parentsList: initStore('d-parents-list') as Parents[] | null,
  isLoading: false,
}

const parentsSlice = createSlice({
  name: 'parents',
  initialState,
  reducers: {
    getParentsList(state, action: PayloadAction<Parents[]>) {
      state.parentsList = action.payload
    },

    addParentsList(state, action: PayloadAction<Parents>) {
      const newParents = action.payload
      if (state.parentsList !== null) {
        state.parentsList.unshift(newParents)
      } else {
        state.parentsList = [newParents]
      }
    },
    editParentsList(state, action: PayloadAction<Parents>) {
      const parents = action.payload
      if (state.parentsList !== null) {
        const findStaffIndex = state.parentsList.findIndex(
          (item) => item.id === parents.id
        )
        const findStaffRecord = state.parentsList.find(
          (item) => item.id === parents.id
        )
        if (findStaffIndex !== -1 && findStaffRecord) {
          state.parentsList[findStaffIndex] = parents
        }
      }
    },

    deleteParentsList(state, action: PayloadAction<number[]>) {
      if (state.parentsList !== null) {
        state.parentsList = state.parentsList.filter(
          (item) => !action.payload.includes(item.id)
        )
      }
    },
  },
})

export const {
  getParentsList,
  addParentsList,
  editParentsList,
  deleteParentsList,
} = parentsSlice.actions

export default parentsSlice.reducer
