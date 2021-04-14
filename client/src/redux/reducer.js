import { ADD_FILE, GET_FILE} from './actionTypes/actionTypes'

const initialState = { title: 'books', backFileName: '', file: [] }

const reducer = (state = initialState, action) => {
  switch (action.type) {

    case ADD_FILE:
      return { ...state, backFileName: action.payload }

    case GET_FILE:
      return { ...state, file: action.payload }

    default:
      return state
  }
}

export default reducer
