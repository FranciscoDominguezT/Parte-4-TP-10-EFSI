import { useEffect, useState } from 'react';
import axios from 'axios';

export default function ValidateTokenPage() {
  const [validationResult, setValidationResult] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token'); 

    if (token) {
      axios.get('http://localhost:3001/api/user/validate-token', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(response => {
        setValidationResult(response.data);
      })
      .catch(error => {
        console.error('Error al validar el token:', error);
        setValidationResult({ valid: false });
      });
    } else {
      setValidationResult({ valid: false });
    }
  }, []);

  if (validationResult === null) {
    return <div>Validando token...</div>;
  }

  return (
    <div>
      {validationResult.valid ? (
        <div>
          <h1>Token válido</h1>
          <p>Bienvenido, {validationResult.user.username}</p>
        </div>
      ) : (
        <h1>Token inválido o expirado</h1>
      )}
    </div>
  );
}
