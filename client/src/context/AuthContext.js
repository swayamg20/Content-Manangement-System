import React ,{useContext,useState,useEffect} from 'react'
import { FirebaseApp } from '../firebase';
import {getAuth,GoogleAuthProvider,signInWithPopup, onAuthStateChanged,signOut} from "firebase/auth"
const auth = getAuth(FirebaseApp());
const AuthContext = React.createContext()
export function useAuth(){
    return useContext(AuthContext)
}
// https://auth-development-d2c09.firebaseapp.com/__/auth/handler
export function AuthProvider({children}) {
    const [currentUser,setCurrentUser] = useState();
    const [loading,setLoading] = useState(true)
    const googleprovider = new GoogleAuthProvider();
    function loginWithGoogle(){
        return signInWithPopup(auth,googleprovider)      
    }

    function logout(){
        return signOut(auth);
    }
    useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth,(user)=>{
            setCurrentUser(user);
            setLoading(false)        
    })
    return unsubscribe;
    },[])
    const value ={
        currentUser,
        loginWithGoogle,
        logout,
    }
  return (
    <AuthContext.Provider value={value}>
        {!loading && children}
    </AuthContext.Provider>
  )
}
