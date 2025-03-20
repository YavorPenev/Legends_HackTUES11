document.getElementById('signup-btn').addEventListener('click', async () => {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (!username || !password) {
        alert('Please fill in all fields');
        return;
    }

    try {
        const response = await fetch('/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        });

        const result = await response.json();

        if (response.ok) {
            alert(result.message);
            window.location.href = '/login.html'; // Redirect to login page
        } else {
            alert(result.error);
        }
    } catch (err) {
        console.error('Error during signup:', err);
        alert('An error occurred. Please try again.');
    }
});