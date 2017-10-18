export const OPEN_FILE = 'OPEN_FILE'

let nextWellId = 2
export const clickWell = (name, id) => {
  console.log('clickWell action creator', name, id)
  return ({
    type: 'CLICK_WELL',
    name: name,
    id: nextWellId++
  })
}

export const addWell = (name, id) => ({
  type: 'ADD_WELL',
  name: name,
  id: nextWellId++
})

export const openFile = (file, rawData) => {
  console.log('openFile', file)
  return ({
    type: OPEN_FILE,
    file: file,
    raw: rawData
  })
}


//thunks
export const _openFile = (file, rawData) =>{
  return (dispatch, getState) => {
    dispatch(openFile(file, rawData))
  }
}
