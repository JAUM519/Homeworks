// src/pages/LoginPage.jsx
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../firebase/config';

const provider = new GoogleAuthProvider();

export function LoginPage() {
    const handleLoginWithGoogle = async () => {
        try {
            await signInWithPopup(auth, provider);
        } catch (error) {
            console.error("Error de Google Auth:", error);
        }
    };

    return (
        <div>
            <h2>Login con Google</h2>
            <button onClick={handleLoginWithGoogle}>Iniciar sesión con Google</button>
        </div>
    );
}
