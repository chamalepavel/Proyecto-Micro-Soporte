import axios from 'axios';

const BASE_URL = 'http://localhost:3001';

// Función auxiliar: obtiene el token del localStorage
function getToken() {
  return localStorage.getItem('token');
}

// Función auxiliar: crea los headers con el token JWT
function headers() {
  return {
    headers: {
      Authorization: `Bearer ${getToken()}`,
      'Content-Type': 'application/json',
    },
  };
}

// ---- AUTH ----
export async function login(email, password) {
  const res = await axios.post(`${BASE_URL}/api/auth/login`, { email, password });
  return res.data;
}

export async function register(datos) {
  const res = await axios.post(`${BASE_URL}/api/auth/register`, datos, headers());
  return res.data;
}

// ---- TICKETS ----
export async function getTickets() {
  const res = await axios.get(`${BASE_URL}/api/tickets`, headers());
  return res.data;
}

export async function getTicket(id) {
  const res = await axios.get(`${BASE_URL}/api/tickets/${id}`, headers());
  return res.data;
}

export async function createTicket(datos) {
  const res = await axios.post(`${BASE_URL}/api/tickets`, datos, headers());
  return res.data;
}

export async function updateTicket(id, datos) {
  const res = await axios.put(`${BASE_URL}/api/tickets/${id}`, datos, headers());
  return res.data;
}

export async function deleteTicket(id) {
  const res = await axios.delete(`${BASE_URL}/api/tickets/${id}`, headers());
  return res.data;
}

// ---- COMENTARIOS ----
export async function addComment(ticketId, content) {
  const res = await axios.post(`${BASE_URL}/api/tickets/${ticketId}/comentarios`, { content }, headers());
  return res.data;
}

// ---- PRODUCTS ----
export async function getProducts() {
  const res = await axios.get(`${BASE_URL}/api/products`, headers());
  return res.data;
}

export async function createProduct(datos) {
  const res = await axios.post(`${BASE_URL}/api/products`, datos, headers());
  return res.data;
}

export async function deleteProduct(id) {
  const res = await axios.delete(`${BASE_URL}/api/products/${id}`, headers());
  return res.data;
}

// ---- CUSTOMERS ----
export async function getCustomers() {
  const res = await axios.get(`${BASE_URL}/api/customers`, headers());
  return res.data;
}

// ---- USERS ----
export async function getUsers() {
  const res = await axios.get(`${BASE_URL}/api/users`, headers());
  return res.data;
}

export async function updateUser(id, datos) {
  const res = await axios.put(`${BASE_URL}/api/users/${id}`, datos, headers());
  return res.data;
}

export async function deleteUser(id) {
  const res = await axios.delete(`${BASE_URL}/api/users/${id}`, headers());
  return res.data;
}
