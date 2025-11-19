import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../firebase/config';
import './LoginPage.scss';

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
        <div className="login-page">
            <div className="login-card fade-in">
                <h2>Bienvenido</h2>
                <p>Inicia sesión para gestionar tu red de ciudades</p>
                <button className="google-button" onClick={handleLoginWithGoogle}>
                    Iniciar sesión con Google
                </button>
            </div>
        </div>
    );
}