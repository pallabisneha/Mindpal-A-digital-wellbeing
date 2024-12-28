document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const registerForm = document.getElementById('registerForm');
    const loginForm = document.getElementById('loginForm');
    const showLoginBtn = document.getElementById('showLogin');
    const showRegisterBtn = document.getElementById('showRegister');
    const registerBox = document.querySelector('.register-box');
    const loginBox = document.querySelector('.login-box');

    // Form switching functions
    function showLogin() {
        registerBox.classList.remove('show');
        loginBox.classList.add('show');
    }

    function showRegister() {
        loginBox.classList.remove('show');
        registerBox.classList.add('show');
    }

    // Event listeners for form switching
    showLoginBtn.addEventListener('click', (e) => {
        e.preventDefault();
        showLogin();
    });

    showRegisterBtn.addEventListener('click', (e) => {
        e.preventDefault();
        showRegister();
    });

    // Form validation helper
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    function validatePassword(password) {
        return password.length >= 6;
    }

    function showError(input, message) {
        input.classList.add('error');
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = message;
        input.parentElement.appendChild(errorDiv);
        errorDiv.style.display = 'block';

        setTimeout(() => {
            input.classList.remove('error');
            errorDiv.remove();
        }, 3000);
    }

    // Register form handling
    registerForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const username = document.getElementById('username').value.trim();
        const email = document.getElementById('email').value.trim();
        const institute = document.getElementById('institute').value.trim();
        const password = document.getElementById('password').value;

        let isValid = true;

        if (username.length < 3) {
            showError(document.getElementById('username'), 'Username must be at least 3 characters');
            isValid = false;
        }

        if (!validateEmail(email)) {
            showError(document.getElementById('email'), 'Please enter a valid email');
            isValid = false;
        }

        if (institute.length < 2) {
            showError(document.getElementById('institute'), 'Please enter a valid institute name');
            isValid = false;
        }

        if (!validatePassword(password)) {
            showError(document.getElementById('password'), 'Password must be at least 6 characters');
            isValid = false;
        }

        if (isValid) {
            // Store user data
            const userData = {
                username,
                email,
                institute,
                password
            };
            localStorage.setItem(email, JSON.stringify(userData));
            
            // Show success message and switch to login
            alert('Registration successful! Please login.');
            showLogin();
            registerForm.reset();
        }
    });

    // Login form handling
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const email = document.getElementById('loginEmail').value.trim();
        const password = document.getElementById('loginPassword').value;

        let isValid = true;

        if (!validateEmail(email)) {
            showError(document.getElementById('loginEmail'), 'Please enter a valid email');
            isValid = false;
        }

        if (!password) {
            showError(document.getElementById('loginPassword'), 'Please enter your password');
            isValid = false;
        }

        if (isValid) {
            // Check credentials
            const userData = localStorage.getItem(email);
            
            if (userData) {
                const user = JSON.parse(userData);
                if (user.password === password) {
                    // Store current user info
                    localStorage.setItem('currentUser', JSON.stringify(user));
                    // Redirect to hello.html
                    window.location.href = 'welcome.html';
                } else {
                    showError(document.getElementById('loginPassword'), 'Invalid password');
                }
            } else {
                showError(document.getElementById('loginEmail'), 'No account found with this email');
            }
        }
    });

    // Add input animation for all input fields
    document.querySelectorAll('.input-group input').forEach(input => {
        input.addEventListener('focus', () => {
            input.parentElement.classList.add('focused');
        });

        input.addEventListener('blur', () => {
            if (!input.value) {
                input.parentElement.classList.remove('focused');
            }
        });
    });

    // Check if user is already logged in
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser && window.location.pathname.endsWith('index.html')) {
        window.location.href = 'hello.html';
    }
});