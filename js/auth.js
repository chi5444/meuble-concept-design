import { supabase, ADMIN_EMAIL } from './supabase.js';

export async function getCurrentUser() {
  const { data: { user } } = await supabase.auth.getUser();
  return user;
}

export function isAdmin(user) {
  return user && user.email && user.email.startsWith('admin@');
}

export async function login(email, password) {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) throw error;
  return data;
}

export async function register(email, password, fullName) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: { data: { full_name: fullName } }
  });
  if (error) throw error;
  return data;
}

export async function logout() {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
  window.location.href = '/index.html';
}

export async function requireAdmin() {
  const user = await getCurrentUser();
  if (!user || !isAdmin(user)) {
    window.location.href = '/login.html';
    return null;
  }
  return user;
}

export async function requireAuth() {
  const user = await getCurrentUser();
  if (!user) {
    window.location.href = '/login.html';
    return null;
  }
  return user;
}

export function updateNavAuth(user) {
  const loginBtn = document.getElementById('nav-login');
  const logoutBtn = document.getElementById('nav-logout');
  const adminLink = document.getElementById('nav-admin');
  const userInfo = document.getElementById('nav-user');

  if (user) {
    if (loginBtn) loginBtn.style.display = 'none';
    if (logoutBtn) logoutBtn.style.display = 'inline-flex';
    if (userInfo) {
      userInfo.style.display = 'inline-flex';
      userInfo.textContent = user.user_metadata?.full_name || user.email;
    }
    if (adminLink && isAdmin(user)) adminLink.style.display = 'inline-flex';
  } else {
    if (loginBtn) loginBtn.style.display = 'inline-flex';
    if (logoutBtn) logoutBtn.style.display = 'none';
    if (userInfo) userInfo.style.display = 'none';
    if (adminLink) adminLink.style.display = 'none';
  }
}