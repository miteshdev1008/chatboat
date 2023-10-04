var express = require('express')
http = require('http');
var app = express();
var server = http.createServer(app);
var io = require('socket.io')(server);
var axios = require('axios');
const bp = require('body-parser');
const cors = require("cors");

app.use(cors());
app.use(bp.json());




var data = [{
    'hi': 'hello hi there i hope you are fine',

    'hello': 'hello i\'m your buddy how can i help you', 'greet': 'Hello! How can I assist you today?',

    'introduction': 'I\'m your friendly chatbot, here to answer your questions and provide assistance.',

    'who are you': 'I\'m your friendly chatbot, here to answer your questions and provide assistance.',

    'help': 'Sure, I can help with a wide range of topics. Just let me know what you need assistance with!',

    'goodbye': 'Goodbye for now! If you have more questions in the future, don\'t hesitate to reach out.',

    'bye': 'Goodbye for now! If you have more questions in the future, don\'t hesitate to reach out.',

    'fallback': 'I\'m sorry, I didn\'t quite understand that. Could you please rephrase your question?',

    'thanks': 'You\'re welcome! If you have any more questions, feel free to ask.',

    'about me': 'I\'m just a computer program designed to assist you.Is there anything specific you\'d like to know or discuss?',

    'request more info': 'Could you please provide more details so I can better assist you?',

    'error': 'Oops, it seems like there\'s been an error.Please try again later.',

    'no': 'it\'s ok as your wish',

    'what is your name': 'my name is buddy,i am always in your service.'
}]


const apiUrl = 'https://api.openai.com/v1/engines/davinci/completions';
app.get('/', (req, res) => {
    res.sendFile('/home/siddharth/code/chat boat/index.html');
})

io.on('connection', (socket) => {
    console.log('A user connected');
    var msg;

    socket.on('ask', async (username) => {
        var k = username.toLowerCase();
        //to check that data contains key(questions) or not     
        if (data[0].hasOwnProperty(k)) {
            msg = data[0][k];
        }
        else {
            msg = "sorry right now i can\'t have answere at this moment of time i\'ll later back replies you";
        }   
        //sending message to the client(user)
        socket.emit('botanswere', msg);
    });
    // Define the 'disconnect' event listener
    socket.on('disconnect', (reason) => {
        console.log('A user disconnected');
    });
});

async function getAnswere() {
    console.log("ans")
    const chatCompletion = await openai.chat.completions.create({
        messages: [{ role: "user", content: "Say this is a test" }],
        model: "gpt-3.5-turbo",
    });
    console.log(chatCompletion)
    return chatCompletion.data  ;
}
server.listen(5050, '192.168.0.129', () => {
    console.log("app is live on" + '192.168.0.129:' + '5050');
});

