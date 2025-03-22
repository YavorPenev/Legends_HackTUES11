document.getElementById('signup-btn').addEventListener('click', async () => {
    const email = document.getElementById('email').value;
    const username = document.getElementById('user_name').value;
    const password = document.getElementById('password').value;

    if (!email || !username || !password) {
        alert('Please fill in all fields');
        return;
    }

    try {
        const response = await fetch('/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, username, password }),
        });

        const result = await response.json();

        if (response.ok) {
            alert(result.message);
            window.location.href = '/'; 
        } else {
            alert(result.error);
        }
    } catch (err) {
        console.error('Error during signup:', err);
        alert('An error occurred. Please try again.');
    }
});