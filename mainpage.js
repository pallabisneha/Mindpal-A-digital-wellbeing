// Function to show the chatbox when the button is clicked
function startChat() {
    document.getElementById('chat-box').style.display = 'block';
    document.querySelector('.talk-button').style.display = 'none';
}

// Function to send the message to the Python chatbot
async function sendMessage() {
    const userInput = document.getElementById('user-input').value;
    if (userInput.trim() !== "") {
        // Show user's message in the chat log
        document.getElementById('chat-log').innerHTML += `<p><strong>You:</strong> ${userInput}</p>`;

        // Clear input field
        document.getElementById('user-input').value = '';

        // Send the message to the server (Python backend)
        const response = await fetch('/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ message: userInput })
        });

        const data = await response.json();
        const botMessage = data.reply;

        // Show chatbot's response in the chat log
        document.getElementById('chat-log').innerHTML += `<p><strong>Bot:</strong> ${botMessage}</p>`;
    }
}
