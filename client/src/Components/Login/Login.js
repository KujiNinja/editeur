import firebase from "firebase"
import React, { useRef, useState } from 'react';
import { Link, useHistory } from "react-router-dom"
import { useAuth } from "../../context/AuthContext";


function Login() {

  const emailRef = useRef();
  const passwordRef = useRef();
  const history = useHistory();
  const { saveUserDB, login, currentUser } = useAuth();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setError('')
      setLoading(true)
      await login(emailRef.current.value, passwordRef.current.value)
      history.push('/')
  
    } catch (error) {
      setError(error.message)
      setLoading(false)
    }
  }

  const googleSignup = async () => {
    try {
      setError('')
      setLoading(true)
      var provider = new firebase.auth.GoogleAuthProvider()
      const { user } = await firebase.auth().signInWithPopup(provider)

      let userExists = await firebase.firestore().collection('users').doc(user.uid).get().then(req => console.log(req.exists))
      if (!userExists) {
        await saveUserDB(
          user.uid,
          user.email,
          Date.now(),
        )
      }
      history.push('/')

    } catch (error) {
      setError(error.message)
      setLoading(false)
    }
  }

  return (
    <div className='background flex_center'>
      <div className="wrapper-white">
        {error && <p>{error}</p>}
        <button onClick={googleSignup} className='button button-icon'>Sign in via Google account</button>
        <form onSubmit={handleSubmit} className='modal_form'>
          <div className="color_dark mb-1 font-12">Введите логин и пароль</div>
          <input required ref={emailRef} className='auth input mb-1 color-light' type='email' name='email' placeholder='Email' />
          <input required ref={passwordRef} className='auth input mb-1 color-light' type='password' name='password' placeholder='Password' />
          <button disabled={loading} type='submit' className='button button-entrance mb-1'>Войти</button>
          <div className="color_dark">У вас ещё нет аккаунта? <Link className='link link_dark' to="/signup">Зарегистрироваться</Link></div>
        </form>
      </div>
    </div>

  );
}

export default Login;
