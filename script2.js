// Store for emergency contacts
let emergencyContacts = JSON.parse(localStorage.getItem('emergencyContacts')) || [];

// DOM Elements
const contactInput = document.getElementById('contact');
const contactsList = document.getElementById('contacts-list');
const sosButton = document.getElementById('sos-btn');
const statusElement = document.getElementById('status');
const locationPopup = document.getElementById('location-popup');
const latitudeElement = document.getElementById('latitude');
const longitudeElement = document.getElementById('longitude');
const popupStatus = document.getElementById('popup-status');

// Initialize the contacts list
function initializeContacts() {
    contactsList.innerHTML = '';
    emergencyContacts.forEach((contact, index) => {
        addContactToList(contact, index);
    });
}

// Show popup with coordinates
function showLocationPopup(latitude, longitude) {
    latitudeElement.textContent = latitude.toFixed(6);
    longitudeElement.textContent = longitude.toFixed(6);
    locationPopup.classList.add('show');
}

// Close popup
function closePopup() {
    locationPopup.classList.remove('show');
    sosButton.disabled = false;
    sosButton.style.backgroundColor = '';
    statusElement.textContent = '';
}

// Create ripple effect
function createRipple(event) {
    const button = event.currentTarget;
    const ripple = button.querySelector('.ripple');
    
    ripple.style.animation = 'none';
    ripple.offsetHeight;
    ripple.style.animation = 'ripple 0.6s linear';
}

// Add contact to the list with animation
function addContactToList(contact, index) {
    const contactItem = document.createElement('div');
    contactItem.className = 'contact-item';
    contactItem.style.opacity = '0';
    contactItem.style.transform = 'translateX(-20px)';
    
    contactItem.innerHTML = `
        <span>${contact}</span>
        <button class="delete-btn" onclick="deleteContact(${index})">Delete</button>
    `;
    
    contactsList.appendChild(contactItem);
    
    setTimeout(() => {
        contactItem.style.transition = 'all 0.3s ease-out';
        contactItem.style.opacity = '1';
        contactItem.style.transform = 'translateX(0)';
    }, 50);
}

// Add new contact with validation and animation
function addContact() {
    const contact = contactInput.value.trim();
    if (!contact) {
        showStatus('Please enter a contact number', 'error');
        animateInput(contactInput);
        return;
    }
    
    const phoneRegex = /^\+?[\d\s-]{10,}$/;
    if (!phoneRegex.test(contact)) {
        showStatus('Please enter a valid phone number', 'error');
        animateInput(contactInput);
        return;
    }

    emergencyContacts.push(contact);
    localStorage.setItem('emergencyContacts', JSON.stringify(emergencyContacts));
    addContactToList(contact, emergencyContacts.length - 1);
    contactInput.value = '';
    showStatus('Contact added successfully', 'success');
}

// Animate input on error
function animateInput(input) {
    input.style.animation = 'none';
    input.offsetHeight;
    input.style.animation = 'shake 0.5s ease-in-out';
}

// Delete contact with fade-out animation
function deleteContact(index) {
    const contactItem = contactsList.children[index];
    contactItem.style.transition = 'all 0.3s ease-out';
    contactItem.style.opacity = '0';
    contactItem.style.transform = 'translateX(20px)';
    
    setTimeout(() => {
        emergencyContacts.splice(index, 1);
        localStorage.setItem('emergencyContacts', JSON.stringify(emergencyContacts));
        initializeContacts();
        showStatus('Contact deleted', 'success');
    }, 300);
}

// Show status message with animation
function showStatus(message, type = 'info') {
    statusElement.textContent = message;
    statusElement.className = `status ${type}`;
    statusElement.style.animation = 'none';
    statusElement.offsetHeight;
    statusElement.style.animation = 'slideIn 0.3s ease-out';
    
    setTimeout(() => {
        statusElement.style.opacity = '0';
        setTimeout(() => {
            statusElement.textContent = '';
            statusElement.style.opacity = '1';
        }, 300);
    }, 3000);
}

// Update popup status
function updatePopupStatus(message, type = 'info') {
    popupStatus.textContent = message;
    popupStatus.className = `popup-status ${type}`;
}

// Get current location with loading animation
async function getCurrentLocation() {
    return new Promise((resolve, reject) => {
        if (!navigator.geolocation) {
            reject('Geolocation is not supported by your browser');
            return;
        }

        sosButton.classList.add('loading');
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                resolve({ latitude, longitude });
            },
            (error) => {
                reject(`Error getting location: ${error.message}`);
            }
        );
    });
}

// Send emergency message with animations
async function sendEmergencyMessage(location) {
    if (emergencyContacts.length === 0) {
        throw new Error('No emergency contacts added');
    }

    const message = `EMERGENCY SOS! I need help! My location: https://www.google.com/maps?q=${location.latitude},${location.longitude}`;
    
    // Simulating message sending with animation
    return new Promise(resolve => {
        updatePopupStatus('Sending emergency messages...');
        setTimeout(() => {
            console.log('Emergency message:', message);
            console.log('Sending to contacts:', emergencyContacts);
            resolve('Emergency messages sent successfully!');
        }, 1000);
    });
}

// Handle SOS button click with animations
async function handleSOS(event) {
    createRipple(event);
    sosButton.disabled = true;
    showStatus('Getting location...', 'info');
    
    try {
        const location = await getCurrentLocation();
        showLocationPopup(location.latitude, location.longitude);
        
        const result = await sendEmergencyMessage(location);
        updatePopupStatus(result, 'success');
        
        // Success animation
        sosButton.style.backgroundColor = '#28a745';
    } catch (error) {
        showStatus(`Error: ${error.message}`, 'error');
        sosButton.disabled = false;
        if (locationPopup.classList.contains('show')) {
            closePopup();
        }
    }
}

// Event Listeners
sosButton.addEventListener('click', handleSOS);
contactInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        addContact();
    }
});

// Add keyframe animations to the document
const style = document.createElement('style');
style.textContent = `
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-10px); }
        75% { transform: translateX(10px); }
    }
`;
document.head.appendChild(style);

// Initialize contacts on page load
initializeContacts();