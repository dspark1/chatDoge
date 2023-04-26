const messages = document.querySelector('.messages');
const input = document.querySelector('input');
const button = document.querySelector('button');

// Function to add a message to the chat history
function addMessage(user, message) {
  const time = new Date().toLocaleTimeString();
  const html = `<li class="message"><span class="user">${user}</span>: ${message}<span class="time">${time}</span></li>`;
  messages.innerHTML += html;
  messages.scrollTop = messages.scrollHeight;
}

// Function to handle sending a message
async function sendMessage() {
  const message = input.value;
  if (message) {
    addMessage('You', message);
    try {
      // Send message to API using async/await
      const response = await fetch('https://api.example.com/chat', {
        method: 'POST',
        body: JSON.stringify({ message }),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const data = await response.json();
      // Add response from API to chat history
      addMessage('Astrologer', data.message);
    } catch (error) {
      console.error('Error:', error);
    }
    input.value = '';
  }
}

// Add event listener for send button
button.addEventListener('click', sendMessage);

// Add event listener for Enter key in input field
input.addEventListener('keydown', event => {
  if (event.key === 'Enter') {
    sendMessage();
  }
});
