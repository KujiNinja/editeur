import { addFileAC, getFileAC} from '../actionCreators/actionCreators'

// инициализирует клиентов
export const fetchAddFile = (file) => {
  return (dispatch) => {
    
    // fetch(process.env.REACT_APP_UPLOADFILE_URL,{
    fetch('http://localhost:4000/testupl',{
      method: 'POST',
      body: file
  })
  .then(res => res.json())
  // .then(data => console.log(data))
  .then(data => dispatch(addFileAC(data)))
}}

// инициализирует студентов
export const fetchGetFile = (id) => {
  return (dispatch) => {
    // fetch(process.env.REACT_APP_GETFILE_URL, {
      fetch('http://localhost:4000/read', { 
      
      method: 'POST',
      responseType: 'blob',
      headers: { 'Content-Type' : 'Application/json' },
      body: JSON.stringify({id: id})
    })
    .then(async res => res.blob([res.data], {type: 'application/pdf'}))
    // .then(data => setFile(data))
  // .then(data => console.log(data))
    .then(data => dispatch(getFileAC(data)))
  }
}
