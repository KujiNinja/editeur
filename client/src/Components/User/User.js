import React, { useEffect, useState } from "react";
// import zaglushka from '../BooksList/zaglushka'
import { Link } from 'react-router-dom'
import './User.scss'
import firebase from 'firebase'
import { useAuth } from "../../context/AuthContext";

function User() {
  // const pubBook = ''
  const [uplBooks, setuplBooks] = useState([])
  const [purBooks, setpurBooks] = useState([])

  const [booksNum, setBooksNum] = useState(null)
  const [booksNum1, setBooksNum1] = useState(null)
  // const pubBook = [...zaglushka].splice(0, 5)
  const { currentUser } = useAuth()

  function uplBook() {
    // console.log('curr user',currentUser);
    if (currentUser) {
      firebase.firestore().collection('users').doc(currentUser?.uid).get().then(req => {
        setBooksNum(req.data()?.uplBooks?.length);
        return (
          req.data()?.uplBooks.map(el => {
            return (
              firebase.firestore().collection('books').doc(el).get().then(req => {
                setuplBooks((prev) => [...prev, [req.data(), req.id]])
              })
            )
          })
        )
      })
    }
  }

  function purBook() {
    if (currentUser) {
      firebase.firestore().collection('users').doc(currentUser?.uid).get().then(req => {
        setBooksNum1(req.data()?.purBooks?.length);
        return (
          req.data()?.purBooks.map(el => {
            return (
              firebase.firestore().collection('books').doc(el).get().then(req => {
                setpurBooks((prev) => [...prev, [req.data(), req.id]])
              })
            )
          })
        )
      })
    }
  }

  // loadBooks()
  useEffect(() => {
    uplBook()
    purBook()
  }, [currentUser])


  function disabledChange() {
    document.querySelector('.btn-published').classList.add('disabled')
    document.querySelector('.btn-bought').classList.remove('disabled')
    document.querySelector('.publishedBooks').classList.remove('box-invisible')
    document.querySelector('.boughtBooks').classList.add('box-invisible')
  }
  function disabledChange1() {
    document.querySelector('.btn-published').classList.remove('disabled')
    document.querySelector('.btn-bought').classList.add('disabled')
    document.querySelector('.publishedBooks').classList.add('box-invisible')
    document.querySelector('.boughtBooks').classList.remove('box-invisible')
  }

  return (
    <div className="background">
      <div className="pt-3">
        <Link to={`/${currentUser?.uid}/addbook`} className='button'><button className='button buttonBook margin2 mb-4 mt-5'>Опубликовать книгу</button></Link>
      </div>
      <div className="flex_row">
        <button onClick={disabledChange} className="btn-published button ml-5 mr-3 disabled">Опубликованные книги</button>
        <button onClick={disabledChange1} className="btn-bought button">Купленные книги</button>
      </div>
      <div>
        <div className="publishedBooks">
          <h4 className='h4office ml-5'>Опубликованные</h4>
          <div className="bookWindow blockBooks1 flex_center" >
            <div className="books-box">
              {uplBooks.length === booksNum && uplBooks.map(el => {
                return (
                  <div key={Math.random()} className='oneBook flex_center flex_column'>
                    <Link to={`/user/pub/${el[1]}`}><img className="slider-card_img" src={el[0]?.cover} alt="book" /></Link>
                    <h6 className="slider-card_title slider-text">{el[0]?.title}</h6>
                    <h6 className="slider-card_author slider-text">{el[0]?.bookauthor}</h6>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        <div className="boughtBooks box-invisible">
          <h4 className='h4office ml-5'>Купленные</h4>

          <div className="bookWindow blockBooks1 flex_center" >
            <div className="books-box">
              {purBooks.map(el => {
                return (
                  <div key={Math.random()} className='oneBook flex_center flex_column'>
                    <Link to={`/user/bought/${el[1]}`}><img className="slider-card_img" src={el.image} alt="book" /></Link>
                    <h6 className="slider-card_title slider-text">{el.title}</h6>
                    <h6 className="slider-card_author slider-text">{el.author}</h6>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

      </div>



    </div>
  );
}

export default User;
