import React, { useEffect, useRef, useState } from 'react';
import { Link, useHistory } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import '../InfoBook/InfoBook'
import firebase from 'firebase'
import './Edit.scss'

function Edit(props) {
  const params = useParams()
  const [book, setBook] = useState(null);
  const history = useHistory()

  const title = useRef();
  const bookauthor = useRef();
  const description = useRef();

  function updateBook(e) {
    e.preventDefault();

    firebase.firestore()
      .collection('books')
      .doc(params.id)
      .set({
        title: title.current.value,
        bookauthor: bookauthor.current.value,
        description: description.current.value
      }, { merge: true })
      history.push('/user')
  }

  useEffect(() => {
    firebase
      .firestore()
      .collection('books')
      .doc(params.id)
      .get()
      .then(req => setBook(req.data()))

  }, [])

  return (
    <div className='background flex_center flex_column'>
      <div className='bookWindow flex coverBig'>
        <div className="mr-3">
          <img className='imgCover' src={book?.cover} alt={book?.title} />
        </div>
        <form onSubmit={updateBook} className='formAddBook' >
          <input ref={title} className='auth input mb-1 wide-input color-light' name='title' type='text' required defaultValue={book?.title} placeholder='Название книги' />
          <input ref={bookauthor} className='auth input mb-1 wide-input color-light' name='bookauthor' type='text' required defaultValue={book?.bookauthor} placeholder='Автор' />
          <textarea ref={description} className='auth input mb-1 input-textarea wide-input color-light' name='description' required defaultValue={book?.description} type='text' placeholder='Описание' ></textarea>
          {/* <Link to='/user'> */}
          <button type="submit" className='button buttonBook butlist' >Сохранить изменения</button>
          {/* </Link> */}
        </form>
      </div>
    </div>
  );
}

export default Edit;
