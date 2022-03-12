
//
module.exports = mySocket = (req, action, data = '...', hub = '/comments') => {

  req.io.of(hub).emit(action,data);

  ADD = 'add';
  EDIT = 'edit';
  DELETE = 'delete';
}

// module.exports = mySocket = (app) => {
//   const server = require('http').Server(app);
//   socketIo = require('socket.io')(server);

//   ADD = 'add';
//   EDIT = 'edit';
//   DELETE = 'delete';

//   emit = (action, data = '...', hub = '/comments') => {

//     socketIo
//       .of(hub)
//       .on('connection', socket => {
//         console.log('socket');
//         socket.emit(action, { data: data });
//       });
//   }

//   on = (action, data = '...', hub = '/comments') => {

//     socketIo
//       .of(hub)
//       .on('connection', socket => {
//         console.log('socket');
//         socket.on(action, { data: data });
//       });
//   }
// }


  // emitSocket('add');
  // emitSocket('edit');
  // emitSocket('delete');
