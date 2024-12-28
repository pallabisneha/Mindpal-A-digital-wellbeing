// script.js
document.querySelectorAll('.problem-statement').forEach(item => {
    item.addEventListener('mouseover', () => {
        item.style.backgroundColor = '#FFA07A'; // Change color on hover
    });
    item.addEventListener('mouseout', () => {
        item.style.backgroundColor = '#F4C2C2'; // Revert color on mouse out
    });
});
