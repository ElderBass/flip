const { Server } = require('socket.io');

const PATH = '/socket/connect';
let ioServer = null;

const init = (server) => {
    const options = {
        path: PATH,
        pingTimeout: 20000,
        pingInterval: 25000,
        upgradeTimeout: 20000,
        transports: ['polling'],
        cors: {
            origin: 'http://localhost:3000',
        },
        handlePreflightRequest(req, res) {
            res.writeHead(200, {
                'Access-Control-Allow-Origin': true,
                'Access-Control-Allow-Methods': 'POST, GET',
                'Access-Control-Allow-Credentials': true,
            });
            res.end();
        },
    };
    
    ioServer = new Server(server, options);

    ioServer.of(PATH).on('connection', (socket) => {
        console.log('\n POP, LOCK, AND SOCKET \n\n');
        
        socket.on('send_message', (msg) => {
            console.log('\n socket sending message: ', message, '\n\n');
            ioServer.emit('send_message', msg);
        });
    });
};

module.exports = {
    init
};
