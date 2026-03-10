export const getToken = () => localStorage.getItem('token');

export const getUsuario = () => {
  const usuarioGuardado = localStorage.getItem('usuario');
  return usuarioGuardado ? JSON.parse(usuarioGuardado) : null;
};

export const estaAutenticado = () => !!getToken();

export const cerrarSesion = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('usuario');
  window.location.href = '/login';
};

export const getRol = () => {
  const usuario = getUsuario();
  return usuario ? usuario.role : null;
};

export const esAdmin   = () => getRol() === 'admin';
export const esSoporte = () => getRol() === 'support';
export const esCliente = () => getRol() === 'client';
