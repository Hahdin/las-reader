export const OPEN_FILE = 'OPEN_FILE'
export const SHOW_FILE = 'SHOW_FILE'

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
export const _showFile = (show) => {
  console.log('showFile', show)
  return ({
    type: SHOW_FILE,
    show: show,
  })
}


//thunks
export const _openFile = (file, rawData) =>{
  return (dispatch, getState) => {
    dispatch(openFile(file, rawData))
    dispatch(_showFile(true))
  }
}
