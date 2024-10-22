import { useState } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../context/AuthContext';
import Layout from '../components/Layout';
import Link from 'next/link';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3001/api/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          login(data.token);
          router.push('/');
        } else {
          alert(data.message || 'Error durante el login');
        }
      } else {
        const errorData = await response.json();
        alert(errorData.message || 'Error durante el login');
      }
    } catch (error) {
      console.error('Error durante el login:', error);
      alert('Error durante el login');
    }
  };

  return (
    <Layout>
      <h1>Login</h1>
      <form onSubmit={handleSubmit} style={{ maxWidth: '400px', margin: '0 auto', padding: '1rem', backgroundColor: '#f9f9f9', borderRadius: '5px' }}>
        <label>
          Email:
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} style={{ width: '100%', padding: '0.5rem', marginBottom: '1rem', borderRadius: '5px', border: '1px solid #ccc' }} />
        </label>
        <label>
          Contraseña:
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} style={{ width: '100%', padding: '0.5rem', marginBottom: '1rem', borderRadius: '5px', border: '1px solid #ccc' }} />
        </label>
        <button type="submit" style={{ padding: '0.5rem 1rem', backgroundColor: '#0070f3', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Iniciar Sesión</button>
      </form>
      <p style={{ textAlign: 'center', marginTop: '1rem' }}>
        ¿No tienes una cuenta? <Link href="/register">Regístrate aquí</Link>
      </p>
    </Layout>
  );
}