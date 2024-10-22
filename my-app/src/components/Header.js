import Link from 'next/link';
import { useAuth } from '../context/AuthContext';

export default function Header() {
  const { isAuthenticated, logout } = useAuth(); 

  console.log('Estado de autenticación:', isAuthenticated);

  return (
    <header style={{ padding: '1rem', backgroundColor: '#f8f9fa', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <nav>
        <ul style={{ listStyleType: 'none', margin: 0, padding: 0, display: 'flex', gap: '1rem' }}>
          <li><Link href="/">Home</Link></li>
          <li><Link href="/contacto">Contacto</Link></li>
        </ul>
      </nav>
      {isAuthenticated && (
        <div className="user-info" style={{ display: 'flex', alignItems: 'center' }}>
          <button onClick={logout} style={{ padding: '0.5rem', borderRadius: '5px', backgroundColor: '#0070f3', color: 'white', border: 'none', cursor: 'pointer' }}>Cerrar Sesión</button>
        </div>
      )}
    </header>
  );
}
