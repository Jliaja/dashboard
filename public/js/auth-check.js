(function () {
    const token = localStorage.getItem('token');
    const path = window.location.pathname;

    // Normalize path to avoid issues with trailing slashes or index.html
    const isLoginPage = path.includes('login.html') || path === '/' || path.endsWith('/public/');

    if (token) {
        // User is logged in
        if (isLoginPage) {
            // Redirect to dashboard if trying to access login page
            window.location.href = '/admin-dashboard.html';
        }
    } else {
        // User is NOT logged in
        if (!isLoginPage) {
            // Redirect to login page if trying to access protected pages
            window.location.href = '/login.html';
        }
    }
})();
