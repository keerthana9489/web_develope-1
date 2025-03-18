// Function to handle Google Login Response
function handleCredentialResponse(response) {
    // Decode the JWT token received from Google
    const responsePayload = decodeJwtResponse(response.credential);
    
    // Extract information from the payload (e.g., user ID, email, name)
    console.log("User ID: " + responsePayload.sub);  // Google user ID
    console.log("User Email: " + responsePayload.email);  // User email
    console.log("User Name: " + responsePayload.name);  // User name
    
    // Optional: Send the ID token to your backend for further processing (e.g., user login)
    fetch('/your-backend-login-url', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token: response.credential })
    })
    .then(response => response.json())
    .then(data => {
        console.log('Login successful:', data);
    })
    .catch(error => {
        console.error('Error during login:', error);
    });
}

// Decode the JWT token received from Google
function decodeJwtResponse(token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
}

// Initialize Google Sign-In API
window.onload = function () {
    google.accounts.id.initialize({
        client_id: "YOUR_GOOGLE_CLIENT_ID",  // Replace with your actual Google Client ID
        callback: handleCredentialResponse  // Callback function to handle the login response
    });

    // Render the Google Sign-In button
    google.accounts.id.renderButton(
        document.getElementById("signInDiv"),  // The div where the Google button will be rendered
        { theme: "outline", size: "large" }    // Button styling options
    );
};
