
// sidebar.js

async function logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    window.location.href = '/login.html';
}

async function loadUser() {
    const token = localStorage.getItem('token');
    if (!token) return;

    try {
        const res = await fetch('/api/auth/me', {
            headers: { 'Authorization': 'Bearer ' + token }
        });

        if (!res.ok) throw new Error('Failed to fetch user');

        const user = await res.json();

        // Check for name property, fallback to fullName or email parts
        const displayName = user.name || user.fullName || user.email.split('@')[0];

        // Update UI elements
        const userNameEl = document.getElementById('userName');
        const userEmailEl = document.getElementById('userEmail');
        const userAvatarEl = document.getElementById('userAvatar');

        console.log('Sidebar user data:', user);

        if (userNameEl) userNameEl.textContent = displayName;
        if (userEmailEl) userEmailEl.textContent = user.email;

        // Initials for avatar
        if (userAvatarEl && user.name) {
            const initials = user.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
            userAvatarEl.textContent = initials;
        }

    } catch (err) {
        console.error('Error loading user:', err);
        if (err.message.includes('401') || err.message.includes('403')) {
            // Token invalid/expired
            localStorage.removeItem('token');
            window.location.href = '/login.html';
        }
    }
}

// Expose functions globally if needed (already global due to script inclusion, but good for clarity)
window.logout = logout;
window.loadUser = loadUser;
