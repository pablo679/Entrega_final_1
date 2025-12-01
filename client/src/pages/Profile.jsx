import { useAuth } from '../context/AuthContext';

function Profile() {
  const { user } = useAuth();

  return (
    <main className="auth-container">
      <section className="auth-card">
        <h1>Mi Perfil</h1>
        <p>Información básica de tu cuenta.</p>

        <div className="profile-info">
          <p><strong>Nombre:</strong> {user?.name}</p>
          <p><strong>Email:</strong> {user?.email}</p>
        </div>
      </section>
    </main>
  );
}

export default Profile;
