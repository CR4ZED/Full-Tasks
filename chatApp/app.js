const submit = document.getElementById("submit");
const msg = document.getElementById("msg");
const send = document.getElementById("send");
const messages = document.getElementById("messages");
let name = "anonymous";

const ws = new WebSocket("ws://localhost:8080");
ws.onmessage = ({ data }) => {
  const { name, text } = JSON.parse(data);
  const msg = document.createElement("li");
  msg.textContent = `${name}: ${text}`;
  messages.appendChild(msg);
};

ws.onopen = () => console.log("connected");

function sendMessage(e) {
  e.preventDefault();
  text = msg.value;
  msg.value = "";
  ws.send(JSON.stringify({ name, text }));
}

submit.addEventListener("click", (e) => {
  e.preventDefault();
  name = document.getElementById("name").value || "anonymous";
  document.getElementById("name").value = "";
});
send.addEventListener("click", sendMessage);
