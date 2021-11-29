const socket = require('socket.io');
let io = socket(server);

app.use(function (req, res, next) {
  req.io = io;
  next();
});
io.of('/comments').on('connection', (socket) => {
  console.log('>> Socket-Comment');
});

io.of('/noteRecette').on('connection', (socket) => {
  console.log('>> Socket-noteRecette');
});