const request = require('request')
const WebSocket = require('ws');

var socket = new WebSocket('ws://localhost:2000/count');

request('http://localhost:2000/',(error, response, body) =>{
  console.error("=========this from HTTP Web Service=========");
  console.error('error:', error);
  console.log('statusCode:', response && response.statusCode);
  console.log('body:', body); 
  console.error("============================================");
});


socket.onopen = () => socket.send(process.env.MESSAGE == undefined ? "Your not send a Message to Server :(" : process.env.MESSAGE)
socket.onmessage = (data) => console.log(`[From Server] => ${data.data}`);
socket.onclose = () => console.log('[close] => Connection Closed by Server')
socket.onerror = (err) => console.log(`[error] ${err.message}`)