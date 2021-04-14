import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import firebase from 'firebase'
import '../InfoBook/InfoBook'

function BoughtBook(props) {
  const params = useParams()
  const [book, setBook] = useState(null)

  useEffect(() => {
    firebase.firestore()
      .collection('books')
      .doc(params.id)
      .get()
      .then(book1 => {
        if (book1.exists)
          setBook(book1.data())
      })

  }, [setBook])
  return (
    <div className='background flex_center flex_column'>
      <div className='bookWindow flex coverBig'>
        <div className="mr-3">
          <img className='imgCover' src={book?.cover} alt={book?.title} />
        </div>
        <div className='bookInfo'>
          <h3 className='color_dark titleBook' >{book?.title}</h3>
          <h5 className='color_dark authorBook' >{book?.bookauthor}</h5>
          <div className='summaryBook color_dark mt-5' >{book?.description}</div>
        </div>
      </div>
      <div className='buttonList'>
        <button className='button buttonBook butlist mr-3' >Читать</button>
        <button className='button buttonBook butlist' >Скачать</button>
      </div>
    </div>
  );
}

export default BoughtBook;
