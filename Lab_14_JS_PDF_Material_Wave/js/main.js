/* jshint esversion: 6 */
import '/css/style.css';

document.querySelector('#download-pdf').addEventListener('click', () => {
    window.print();
});

document.querySelectorAll('.card').forEach(card => {
    card.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        ripple.classList.add('ripple');
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;       
        ripple.style.left = `${x}px`;
        ripple.style.top = `${y}px`;
        this.appendChild(ripple);
        setTimeout(() => ripple.remove(), 600);
    });
});

document.body.addEventListener('input', (e) => {
    if (e.target.hasAttribute('contenteditable')) {
        const allData = {};
        document.querySelectorAll('[contenteditable]').forEach(el => {
            if (el.id) {
                allData[el.id] = el.innerHTML;
            }
        });
        localStorage.setItem('resume', JSON.stringify(allData));
    }
});

window.addEventListener('DOMContentLoaded', () => {
    const saved = JSON.parse(localStorage.getItem('resume'));
    if (saved) {
        Object.keys(saved).forEach(id => {
            const el = document.getElementById(id);
            if (el) el.innerHTML = saved[id];
        });
    }
});