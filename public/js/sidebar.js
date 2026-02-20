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

// Sidebar Toggling Logic
function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    const backdropId = 'sidebar-backdrop';
    let backdrop = document.getElementById(backdropId);

    if (sidebar.classList.contains('-translate-x-full')) {
        // Open sidebar
        sidebar.classList.remove('-translate-x-full');
        sidebar.classList.add('translate-x-0');

        // Create backdrop if not exists
        if (!backdrop) {
            backdrop = document.createElement('div');
            backdrop.id = backdropId;
            backdrop.className = 'fixed inset-0 bg-black/50 z-40 transition-opacity opacity-0 md:hidden';
            document.body.appendChild(backdrop);

            // Fade in
            setTimeout(() => backdrop.classList.remove('opacity-0'), 10);

            // Click to close
            backdrop.addEventListener('click', toggleSidebar);
        }
    } else {
        // Close sidebar
        sidebar.classList.add('-translate-x-full');
        sidebar.classList.remove('translate-x-0');

        // Remove backdrop
        if (backdrop) {
            backdrop.classList.add('opacity-0');
            setTimeout(() => backdrop.remove(), 300);
        }
    }
}

// Expose functions globally
window.logout = logout;
window.loadUser = loadUser;
window.toggleSidebar = toggleSidebar;
