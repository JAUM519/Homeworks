import { useDispatch, useSelector } from "react-redux";
import { startLogout } from "../store/thunks";
import { Link } from "react-router-dom";

export default function Header() {
  const dispatch = useDispatch();
  const { status, displayName } = useSelector(s => s.auth);
  const notifCount = useSelector(s => s.social.notifications.length);

  return (
    <header style={{display:"flex",gap:16,alignItems:"center",padding:"8px 12px",borderBottom:"1px solid #ddd"}}>
      <Link to="/">Feed</Link>
      <Link to="/notifications">Notificaciones ({notifCount})</Link>
      <Link to="/dms">DMs</Link>
      <div style={{marginLeft:"auto"}}>
        {status === "authenticated"
          ? (<>
               <span style={{marginRight:12}}>{displayName || "Usuario"}</span>
               <button onClick={() => dispatch(startLogout())}>Salir</button>
             </>)
          : (<Link to="/login">Login</Link>)
        }
      </div>
    </header>
  );
}
