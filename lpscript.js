 function isMobileDevice() {
        return /Mobi|Android|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/.test(navigator.userAgent);
    }

    if (isMobileDevice()) {
        document.body.innerHTML = ""; // Clear the page content
        alert("This website is only accessible via a PC.");
        window.location.href = "pc-only.html"; // Redirect to a custom page or show an alert
    }
document.getElementById('signinForm').addEventListener('submit', function(e) {
    e.preventDefault(); // Prevent form submission

    // Define the correct username and password
    const correctUsername = "Dr Sehran"; // Replace with your username
    const correctPassword = "Clinic@321"; // Replace with your password

    // Get the entered username and password
    const enteredUsername = document.getElementById('username').value.trim();
    const enteredPassword = document.getElementById('password').value.trim();

    // Debugging logs
    console.log('Entered Username:', enteredUsername);
    console.log('Entered Password:', enteredPassword);

    // Check if the entered credentials match
    if (enteredUsername === correctUsername && enteredPassword === correctPassword) {
        window.location.href = "prescription.html"; // Redirect to main page
    } else {
        document.getElementById('error-message').textContent = "Invalid username or password";
    }
});

document.addEventListener('mousemove', function(e) {
    const model = document.querySelector('iframe');
    if (model) { // Ensure iframe exists
        const x = e.clientX / window.innerWidth - 0.5;
        const y = e.clientY / window.innerHeight - 0.5;

        // Rotate model based on mouse position
        model.style.transform = `rotateX(${y * 30}deg) rotateY(${x * 30}deg)`;
    }
});

document.addEventListener('mouseleave', function() {
    const model = document.querySelector('iframe');
    if (model) { // Ensure iframe exists
        // Reset rotation when mouse leaves
        model.style.transform = 'rotateX(0deg) rotateY(0deg)';
    }
});
