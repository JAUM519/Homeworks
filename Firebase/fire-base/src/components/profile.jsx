import React from 'react';
import { useSelector } from 'react-redux';
import { getAuth, signOut } from 'firebase/auth';
import { app } from '../firebase/config';

const Profile = () => {
  const user = useSelector(state => state.auth?.user ?? state.auth);
  const auth = getAuth(app);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      window.location.href = '/login';
    } catch (err) {
      console.error('Sign out error', err);
    }
  };

  if (!user) return <div>No hay usuario iniciado</div>;

  return (
    <div className="profile">
      {user.photoURL && <img src={user.photoURL} alt="avatar" width={120} />}
      <h2>{user.displayName ?? user.name ?? 'Sin nombre'}</h2>
      <p>Email: {user.email}</p>
      <p>UID: {user.uid}</p>
      <button onClick={handleSignOut}>Cerrar sesión</button>
    </div>
  );
};

export default Profile;