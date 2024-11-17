import { useAuth } from '../context/AuthContext';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import Layout from '../components/Layout';

export default function Contacto() {
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated) {
    return null;
  }
  
  return (
    <Layout>
      <h1>Contacto</h1>
      <p>Información de contacto aquí...</p>
    </Layout>
  );
}
