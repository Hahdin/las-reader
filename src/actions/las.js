import types from '../types/types'

export const addSection = (section) => {
  return ({
    type: types.ADD_SECTION,
    section: section,
  })
}
