import { createContext, useState, useEffect } from 'react';
import { auth } from '../firebase/config';
import { onAuthStateChanged } from 'firebase/auth';

export const AppContext = createContext(null);

export function AppProvider({ children }) {
    const [user, setUser] = useState(undefined);
    // undefined = aún cargando
    // null = no logueado

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
            if (firebaseUser) {
                const mappedUser = {
                    uid: firebaseUser.uid,
                    name: firebaseUser.displayName,
                    email: firebaseUser.email,
                    photoURL: firebaseUser.photoURL,
                };
                setUser(mappedUser);
                localStorage.setItem("user", JSON.stringify(mappedUser));
            } else {
                setUser(null);
                localStorage.removeItem("user");
            }
        });

        return () => unsubscribe();
    }, []);

    const value = { user, setUser };
    return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}
