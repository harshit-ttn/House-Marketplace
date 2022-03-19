// Custom Hook


import { useState, useEffect } from 'react'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { useRef } from 'react'

export const useAuthStatus = () => {
    const [loggedIn, setLoggedIn] = useState(false)
    const [checkingStatus, setChecking] = useState(true)
    const isMounted = useRef(true)

    useEffect(() => {
        if (isMounted) {
            const auth = getAuth()
            onAuthStateChanged(auth, (user) => {
                if (user) {
                    setLoggedIn(true)
                }

                setChecking(false)
            })
        }

        return ()=>{
            isMounted.current = false
        }

    }, [isMounted])

    return { loggedIn, checkingStatus }
}
