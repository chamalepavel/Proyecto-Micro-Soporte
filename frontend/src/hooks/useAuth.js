import { useState, useEffect } from 'react';
import { getUsuario, estaAutenticado, cerrarSesion } from '../utils/auth';

export const useAuth = () => {
  const [usuario, setUsuario] = useState(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const usuarioGuardado = getUsuario();
    if (usuarioGuardado) {
      setUsuario(usuarioGuardado);
    }
    setCargando(false);
  }, []);

  const logout = () => {
    cerrarSesion();
    setUsuario(null);
  };

  return {
    usuario,
    cargando,
    logout,
    estaAutenticado,
  };
};
