import { auth, googleProvider } from "../firebase-config/firebase-config.js"
import { createUserWithEmailAndPassword, signInWithEmailAndPassword,
    signOut, sendPasswordResetEmail, updateEmail, updatePassword,
    onAuthStateChanged, signInWithPopup, updateProfile } from "firebase/auth"
import React, { useContext, useState, useEffect } from "react"

const AuthContext = React.createContext()

export function useAuth() {
    return useContext(AuthContext)
}



export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState()
    const [loading, setLoading] = useState(true)


    function signup(email, password,displayName) {
        return createUserWithEmailAndPassword(auth, email, password).then ( (u) => updateProfile(u.user, {displayName}))
    }

    function login(email, password) {
        return signInWithEmailAndPassword(auth, email, password)
    }

    function logout() {
        return signOut(auth)
    }

    function resetPassword(email) {
        return sendPasswordResetEmail(auth, email)
    }

    function updateUserEmail(email) {
        return updateEmail(currentUser, email)
    }

    function updateUserPassword(password) {
        return updatePassword(currentUser, password)
    }

    async function signInUserWithGoogle(){
        const googleUSer = await  signInWithPopup(auth,googleProvider);
        console.log({googleUSer})
    }

    function updateUserProfile(displayName,photoUrl){

    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth,
            user => {
                console.log({user})
                setCurrentUser(user)
                setLoading(false)
            },
            error => {
                console.error(error)
            }
        )

        return unsubscribe
    }, [])

    const value = {
        currentUser,
        login,
        signup,
        logout,
        resetPassword,
        updateUserEmail,
        updateUserPassword,
        signInUserWithGoogle
    }

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}
