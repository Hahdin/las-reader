import { chartConstants } from '../constants';
export const updateScale = (scaleType) =>{
  return ({
    type: chartConstants.UPDATE_SCALE,
    scaleType: scaleType
  })
}
