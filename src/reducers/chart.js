import {
  UPDATE_SCALE,
} from '../types/types'

const initialState = {
  scaleType: 'linear'
}

const chartSettings = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_SCALE:{
      return {
        ...state,
        scaleType: action.scaleType
      }
    }
    default:
      return state
  }
}
export default chartSettings
