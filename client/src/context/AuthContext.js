import React, { useContext, useEffect, useState } from 'react';
import { auth, firestore } from '../service/firebase'
// import firebase from 'firebase'

const AuthContext = React.createContext()

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider({ children }) {

  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(false);

  function signup(email, password) {
    return auth.createUserWithEmailAndPassword(email, password)
  }

  function login(email, password) {
    return auth.signInWithEmailAndPassword(email, password)
  }

  function logout() {
    return auth.signOut()
  }

  function saveUserDB(user, emailAddress, dateCreated, uplBooks = [], purBooks = []) {
    return firestore
      .collection('users')
      .doc(user)
      .set({
        emailAddress, dateCreated, uplBooks, purBooks
      });
  }


  function saveBookDB(title, description, cover, file, price, demo = [], backFileName) {
    return firestore
      .collection('books')
      .add({
        title, description, cover, file, price, demo, backFileName
      });
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setLoading(false)
      setCurrentUser(user)
    })

    return () => unsubscribe();
  }, [])

  const value = {
    currentUser,
    login,
    signup,
    logout,
    saveUserDB,
    saveBookDB
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
