document.getElementById('login-btn').addEventListener('click', async () => {
    const username = document.getElementById('user_name').value;
    const password = document.getElementById('password').value;

    if (!username || !password) {
        alert('Please fill in all fields');
        return;
    }

    try {
        const response = await fetch('/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        });

        const result = await response.json();

        if (response.ok) {
            alert(result.message);
            window.location.href = '/'; // Redirect to home page
        } else {
            alert(result.error);
        }
    } catch (err) {
        console.error('Error during login:', err);
        alert('An error occurred. Please try again.');
    }
});