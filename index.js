document.querySelector('form').addEventListener('submit', function(e) {
    e.preventDefault();

    // Sends the form data to Zapier
    fetch('https://hooks.zapier.com/hooks/catch/16344326/355ii84/', {
        method: 'POST',
        body: new FormData(e.target)
    })
    .then(response => response.json())
    .then(data => {
        // Remove any existing message div first
        let existingMessage = document.getElementById('dynamicMessage');
        if (existingMessage) {
            existingMessage.remove();
        }

        // Create a new div for the message
        let messageDiv = document.createElement('div');
        messageDiv.id = 'dynamicMessage';  // Assign an ID for easier removal later
        messageDiv.style.padding = '15px';
        messageDiv.style.marginBottom = '15px';
        messageDiv.style.borderRadius = '5px';
        messageDiv.style.color = 'white';
        messageDiv.style.fontWeight = 'bold';
        messageDiv.style.textAlign = 'center';
        
        if (data.status === 'success') {
            // Set styles and content for success message
            messageDiv.style.backgroundColor = '#4CAF50';  // Green background
            messageDiv.innerHTML = 'Thank you for subscribing!';
            
            // Clear the form fields
            e.target.reset();
        } else {
            // Set styles and content for error message
            messageDiv.style.backgroundColor = '#f44336';  // Red background
            messageDiv.innerHTML = 'There was an error. Please try again.';
        }

        // Insert the messageDiv at the top of the form
        e.target.insertBefore(messageDiv, e.target.firstChild);

        // Optionally, remove the message after a few seconds
        setTimeout(() => {
            if (document.getElementById('dynamicMessage')) {
                document.getElementById('dynamicMessage').remove();
            }
        }, 50000);  // Removes the message after 5 seconds
    });
});

