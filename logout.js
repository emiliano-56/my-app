document.getElementById('logoutButton').addEventListener('click', function(event) {
    event.preventDefault();

    fetch('/logout', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.text())
    .then(data => {
        alert(data);
        if (data === 'Logout successful') {
            window.location.href = '/login.html';
        }
    })
    .catch(error => console.error('Error:', error));
});