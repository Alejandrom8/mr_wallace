const form = document.getElementById('form-login');

function sanitize(strings, ...values) {
    const dirty = strings.reduce((prev, next, i) => `${prev}${next}${values[i]} || ''}`, '');
    return DomPurify.sanitize(dirty);
}

// form.addEventListener('submit', (e) => {
//     e.preventDefault();
    
// });
