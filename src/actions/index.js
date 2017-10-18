export const OPEN_FILE = 'OPEN_FILE'

export const openFile = (file, rawData) => {
  console.log('openFile', file)
  return ({
    type: OPEN_FILE,
    file: file,
    raw: rawData
  })
}

//thunks - testing
export const _openFile = (file, rawData) =>{
  return (dispatch, getState) => {
    dispatch(openFile(file, rawData))
  }
}
