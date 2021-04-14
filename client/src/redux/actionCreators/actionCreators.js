import { ADD_FILE, GET_FILE} from '../actionTypes/actionTypes'

// clients
export const addFileAC = (payload) => {
  return {
    type: ADD_FILE,
    payload
  }
}

// students
export const getFileAC = (payload) => {
  return {
    type: GET_FILE,
    payload
  }
}
