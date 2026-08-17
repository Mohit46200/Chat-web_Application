// const username = prompt("Enter your name:");

// const socket = new WebSocket("ws://localhost:9000");

// const messages = document.getElementById("messages");
// const messageInput = document.getElementById("messageInput");
// const sendButton = document.getElementById("sendButton");


// // Connection established
// // socket.onopen       // Connected
// // socket.onmessage    // Received message
// // socket.onclose      // Disconnected
// // socket.onerror      // Error
// // socket.send()       // Send message

// socket.onopen = () => {       //on open means => When the connection is successfully established, execute this function
//     console.log("Connected to server");
// };


// // Receive message from server
// socket.onmessage = (event) => {

//     const data = JSON.parse(event.data);

//     const message = document.createElement("p");

//     message.innerText = `${data.username}: ${data.message}`;

//     messages.appendChild(message);
// };


// // Send message
// sendButton.addEventListener("click", () => {

//     const message = messageInput.value;

//     if (message === "") {
//         return;
//     }

//     socket.send(
//         JSON.stringify({
//             username: username,
//             message: message
//         })
//     );

//     messageInput.value = "";
// });



// Ask user for their name
let username = prompt("Enter your name:");


// If user cancels or enters nothing
if (!username || username.trim() === "") {
    username = "Anonymous";
}


// Get HTML elements
const messages = document.getElementById("messages");
const messageInput = document.getElementById("messageInput");
const sendButton = document.getElementById("sendButton");
const status = document.getElementById("status");


// Create WebSocket connection
const socket = new WebSocket("wss://chat-web-application-2p61.onrender.com");


// --------------------------------
// WebSocket connection established
// --------------------------------

socket.onopen = () => {

    console.log("Connected to server");

    status.innerText = "Connected";

    status.classList.add("connected");

    messageInput.disabled = false;
    sendButton.disabled = false;

};


// --------------------------------
// Receive message from server
// --------------------------------

socket.onmessage = (event) => {

    try {

        const data = JSON.parse(event.data);

        console.log("Received from server:", data);


        // System message
        if (data.type === "system") {

            const message = document.createElement("p");

            message.classList.add("system-message");

            message.innerText = data.message;

            messages.appendChild(message);

            return;
        }


        // Chat message
        if (data.type === "chat") {

            const message = document.createElement("p");

            message.classList.add("chat-message");

            message.innerText =
                `${data.username}: ${data.message}`;

            messages.appendChild(message);

            // Automatically scroll to bottom
            messages.scrollTop = messages.scrollHeight;

        }

    } catch (error) {

        console.error("Error parsing message:", error);

    }

};


// --------------------------------
// Send message
// --------------------------------

function sendMessage() {

    const message = messageInput.value.trim();


    // Don't send empty message
    if (message === "") {
        return;
    }


    // Check WebSocket connection
    if (socket.readyState !== WebSocket.OPEN) {

        alert("WebSocket is not connected");

        return;
    }


    // Create message object
    const data = {

        username: username,

        message: message

    };


    // Send message to server
    socket.send(JSON.stringify(data));


    // Clear input
    messageInput.value = "";

    messageInput.focus();

}


// --------------------------------
// Send button
// --------------------------------

sendButton.addEventListener("click", () => {

    sendMessage();

});


// --------------------------------
// Press Enter to send
// --------------------------------

messageInput.addEventListener("keydown", (event) => {

    if (event.key === "Enter") {

        sendMessage();

    }

});


// --------------------------------
// Connection closed
// --------------------------------

socket.onclose = () => {

    console.log("Disconnected from server");

    status.innerText = "Disconnected";

    status.classList.remove("connected");

};


// --------------------------------
// WebSocket error
// --------------------------------

socket.onerror = (error) => {

    console.error("WebSocket error:", error);

    status.innerText = "Connection error";

};