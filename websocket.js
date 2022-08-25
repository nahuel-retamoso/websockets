import socketIo from 'socket.io';
import { guardarFromForm, guardarNewMessage } from '../modules/guardar.js';
import { productos, messages } from '../modules/data.js';

export const initWsServer = (server) => {
  const io = socketIo(server, {
    cors: {
      origin: "http://localhost:3000",
      methods: ["GET", "POST"],
      credentials: true
    }
  });

  io.on('connection', (socket) => {
    console.log('Nueva Conexion establecida!');


    //WebSocket que se encarga de avisar al front sobre nuevo productos agregados
    socket.on('new-product', (data) => {
      let res = guardarFromForm(data);

      if (res === 400) {
        socket.emit('messages', 'Datos no validos en el formulario');
      } else {
        let product = [productos[productos.length - 1]];
        io.emit('update', productos); //Es el cargado desde el front pintar ese nuevo producto
      }
    });

    //WebSocket que se encarga de contestar al front sobre todos los productos
    socket.on('askProducts', () => {
      if (productos.length > 0) {
        socket.emit('update', productos) //Es el cargado desde el front pintar ese nuevo producto
      }
    });

    //Websocket que se encarga de avisar al front sobre nuevo messages del chat
    socket.on('new-message', (data) => {
      guardarNewMessage(data);
      console.log(data)
      console.log("lista entera", messages)
      let message = [messages[messages.length - 1]];
      io.emit('updateChat', messages); //Es el cargado desde el front pintar ese nuevo mensaje del chat
    });

    //WebSocket que se encarga de contestar al front sobre todos los mensajes almacenado
    socket.on('askMessages', () => {
      console.log('Envie los Messages');
      if (messages.length > 0) {
        socket.emit('updateChat', messages); //Es el cargado desde el front pintar ese nuevo mensaje del chat
      }
    });
  });
  return io;
};