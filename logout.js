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
        if (data === 'oops!, logging out, byeee!, see you again and hey, thanks for using me!.') {
            window.location.href = '/login.html';
        }
    })
    .catch(error => console.error('Error:', error));
});