const username = prompt("Enter your name:");

const socket = new WebSocket("https://chat-web-application-2p61.onrender.com/");

const messages = document.getElementById("messages");
const messageInput = document.getElementById("messageInput");
const sendButton = document.getElementById("sendButton");


// Connection established
// socket.onopen       // Connected
// socket.onmessage    // Received message
// socket.onclose      // Disconnected
// socket.onerror      // Error
// socket.send()       // Send message

socket.onopen = () => {       //on open means => When the connection is successfully established, execute this function
    console.log("Connected to server");
};


// Receive message from server
socket.onmessage = (event) => {

    const data = JSON.parse(event.data);

    const message = document.createElement("p");

    message.innerText = `${data.username}: ${data.message}`;

    messages.appendChild(message);
};


// Send message
sendButton.addEventListener("click", () => {

    const message = messageInput.value;

    if (message === "") {
        return;
    }

    socket.send(
        JSON.stringify({
            username: username,
            message: message
        })
    );

    messageInput.value = "";
});