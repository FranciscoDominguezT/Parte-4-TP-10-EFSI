import { useState } from 'react';
import { useRouter } from 'next/router';
import Layout from '../components/Layout';
import Link from 'next/link';
import { useAuth } from '../context/AuthContext';

export default function Register() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3001/api/user/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ first_name: firstName, last_name: lastName, username: email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          login(data.token);
          alert('Registro exitoso');
          router.push('/');
        } else {
          alert(data.message || 'Error durante el registro');
        }
      } else {
        const errorData = await response.json();
        alert(errorData.message || 'Error durante el registro');
      }
    } catch (error) {
      console.error('Error durante el registro:', error);
      alert('Error durante el registro');
    }
  };

  return (
    <Layout>
      <h1>Registro de Usuario</h1>
      <form onSubmit={handleSubmit} style={{ maxWidth: '400px', margin: '0 auto', padding: '1rem', backgroundColor: '#f9f9f9', borderRadius: '5px' }}>
        <label>
          Nombre:
          <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} style={{ width: '100%', padding: '0.5rem', marginBottom: '1rem', borderRadius: '5px', border: '1px solid #ccc' }} required />
        </label>
        <label>
          Apellido:
          <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} style={{ width: '100%', padding: '0.5rem', marginBottom: '1rem', borderRadius: '5px', border: '1px solid #ccc' }} required />
        </label>
        <label>
          Email:
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} style={{ width: '100%', padding: '0.5rem', marginBottom: '1rem', borderRadius: '5px', border: '1px solid #ccc' }} required />
        </label>
        <label>
          Contraseña:
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} style={{ width: '100%', padding: '0.5rem', marginBottom: '1rem', borderRadius: '5px', border: '1px solid #ccc' }} required />
        </label>
        <button type="submit" style={{ padding: '0.5rem 1rem', backgroundColor: '#0070f3', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Registrarse</button>
      </form>
      <p style={{ textAlign: 'center', marginTop: '1rem' }}>
        ¿Ya tienes una cuenta? <Link href="/login">Inicia sesión aquí</Link>
      </p>
    </Layout>
  );
}