import types from '../types/types'
export const updateScale = (scaleType) =>{
  return ({
    type: types.UPDATE_SCALE,
    scaleType: scaleType
  })
}
