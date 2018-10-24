import { chartConstants } from '../constants';
const initialState = {
  scaleType: 'linear'
}

export const chart = (state = initialState, action) => {
  switch (action.type) {
    case chartConstants.UPDATE_SCALE:{
      return {
        ...state,
        scaleType: action.scaleType
      }
    }
    default:
      return state
  }
}
