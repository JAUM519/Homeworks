import {
    Routes,
    Route,
    Link,
    useLocation,
    useNavigate,
} from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppContext } from './context/AppContext';
import { CitiesPage } from './pages/CitiesPage';
import { CityDetailPage } from './pages/CityDetailPage';
import { LoginPage } from './pages/LoginPage';
import { signOut } from 'firebase/auth';
import { auth } from './firebase/config';
import { loadNetworkFromDb, saveNetworkToDb } from './firebase/cityNetworkDb';
import { replaceFromDb } from './store/slices/citiesSlice';

export function App() {
    const { user } = useContext(AppContext);
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { graph, zonesByCity, version } = useSelector(
        (state) => state.cities
    );

    const [networkLoaded, setNetworkLoaded] = useState(false);

    const isLoginPage = location.pathname === '/';

    useEffect(() => {
        if (user === undefined) return;

        if (user && isLoginPage) {
            navigate('/cities');
            return;
        }

        if (!user && !isLoginPage) {
            navigate('/');
        }
    }, [user, isLoginPage, navigate]);

    const handleLogout = async () => {
        try {
            await signOut(auth);
            navigate('/');
        } catch (err) {
            console.error(err);
        }
    };

    // Cargar red desde Firestore
    useEffect(() => {
        let cancelled = false;

        async function initNetwork() {
            try {
                const data = await loadNetworkFromDb();
                if (!cancelled) {
                    if (data) {
                        dispatch(replaceFromDb(data));
                    } else {
                        await saveNetworkToDb(graph, zonesByCity);
                    }
                    setNetworkLoaded(true);
                }
            } catch (e) {
                console.error('Error loading network from DB', e);
                if (!cancelled) setNetworkLoaded(true);
            }
        }

        initNetwork();

        return () => {
            cancelled = true;
        };
    }, [dispatch]);

    // Guardar red en Firestore cada vez que cambie
    useEffect(() => {
        if (!networkLoaded) return;
        saveNetworkToDb(graph, zonesByCity).catch((err) =>
            console.error('Error saving network', err)
        );
    }, [networkLoaded, version, graph, zonesByCity]);

    return (
        <div>
            {user && !isLoginPage && (
                <nav>
                    <Link to="/cities">Ciudades</Link>
                    {' | '}
                    <button onClick={handleLogout}>Cerrar sesión</button>
                </nav>
            )}

            <Routes>
                <Route path="/" element={<LoginPage />} />
                <Route path="/cities" element={<CitiesPage />} />
                <Route path="/cities/:cityName" element={<CityDetailPage />} />
                <Route path="*" element={<h2>404 - Not found</h2>} />
            </Routes>
        </div>
    );
}
