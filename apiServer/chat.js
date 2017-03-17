// function addListenersToSocket (io, socket) {
//   const user = socket.user
//   if (user) {
//     handleReconnect(io, socket, user)
//   }
//
//   socket.on('message', (data) => {
//     console.log('socket io OMG');
//     console.log(data);
//   });
// }
//
// module.exports.init = (io) => {
//   io.on('connection', (socket) => addListenersToSocket(io, socket))
// }
