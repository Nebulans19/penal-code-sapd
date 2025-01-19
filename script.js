document.querySelectorAll('section').forEach(section => {
    section.addEventListener('click', () => {
        alert('Anda mengklik ' + section.id);
    });
});
