// Auth check handled by auth-check.js

const form = document.getElementById('loginForm');
const errorMessage = document.getElementById('errorMessage');
const loginBtn = document.getElementById('loginBtn');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value.trim();

  // Reset error
  errorMessage.classList.add('hidden');
  errorMessage.textContent = '';

  // Validasi basic frontend
  if (!email || !password) {
    showError('Email dan password wajib diisi');
    return;
  }

  // Loading state
  loginBtn.textContent = 'Loading...';
  loginBtn.disabled = true;

  try {
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Login gagal');
    }

    // Simpan JWT
    localStorage.setItem('token', data.token);

    // Redirect ke dashboard
    window.location.href = '/admin-dashboard.html';

  } catch (error) {
    showError(error.message);
  } finally {
    loginBtn.textContent = 'Login';
    loginBtn.disabled = false;
  }
});

function showError(message) {
  errorMessage.textContent = message;
  errorMessage.classList.remove('hidden');
}
