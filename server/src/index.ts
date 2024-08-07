import express, { Request, Response } from 'express';
const app = express();
const PORT = 5000;

// Types
import { SocketData, User } from './types';

// Middlewares Imports
import cors from 'cors';
import logger from './middleware/logger';
import { corsOptions } from './config/corsOptions';

// Routes Imports
import codeBlockRouter from './routes/codeblockRoute';

// Socket
import { createServer } from 'http';
import { Server } from 'socket.io';

const server = createServer(app);
const io = new Server(server, {
  cors: corsOptions,
});
// Key = socket.id, Value = {role (mentor or student), roomId}
let socketIdToRoleRoom: Map<string, { role: string; roomId: string }> =
  new Map();

let roomIdToSocketIds: Map<string, string[]> = new Map(); // Key = roomId (codeBlockId), Value = all socket.id in that room.

io.on('connection', (socket) => {
  socket.on('joinRoom', (roomId: string) => {
    socket.join(roomId);
    let socketIdsInRoom: string[] | undefined = roomIdToSocketIds.get(roomId);
    if (!socketIdsInRoom) {
      console.log(roomIdToSocketIds);
      // Room is empty. Join room as a  mentor.
      socketIdToRoleRoom.set(socket.id, { role: 'mentor', roomId: roomId });
      socket.emit('role', 'Mentor');
      roomIdToSocketIds.set(roomId, [socket.id]);
      console.log(`Mentor ${socket.id} in ${roomId} connected.`);
      console.log(roomIdToSocketIds);
    } else {
      // Room is not empty. Join room as a student.

      // room must not have duplicates.
      let existSocket = socketIdToRoleRoom.get(socket.id);
      if (!existSocket) {
        socketIdToRoleRoom.set(socket.id, { role: 'student', roomId: roomId });
        socket.emit('role', 'Student');
        roomIdToSocketIds.get(roomId)?.push(socket.id);
        io.to(roomId).emit(
          'studentCount',
          roomIdToSocketIds.get(roomId)?.length
        );
        console.log(`Student ${socket.id} in ${roomId} connected. `);
        console.log(roomIdToSocketIds);
      }
    }
  });

  socket.on('codeChange', (codeChange) => {
    if (codeChange) {
      const { roomId, code } = codeChange;
      socket.to(roomId).emit('codeChange', code);
    }
  });

  socket.on('disconnect', () => {
    // Get the socket role and room
    const roleRoom = socketIdToRoleRoom.get(socket.id);
    if (!roleRoom) {
      console.log(`Cannot find disconnected ${socket.id}`);
      return;
    }
    const { role, roomId } = roleRoom;

    if (role == 'mentor') {
      // clear the room
      roomIdToSocketIds.delete(roomId);
      // need to notify all sockets in room to go back to home page.
      console.log(`Mentor ${socket.id} in ${roomId} disconnected.`);
      socket.to(roomId).emit('mentorDisconnected');
    } else {
      // role is student
      // check if this is a single student exit, or because mentor leaves.
      let socketIdsInRoom = roomIdToSocketIds.get(roomId);

      if (socketIdsInRoom) {
        // room is not clear (mentor is still here). disconnect student
        roomIdToSocketIds.set(
          roomId,
          socketIdsInRoom.filter((id) => id !== socket.id)
        );
      }
      console.log(`Student ${socket.id} in ${roomId} disconnected.`);
      socket
        .to(roomId)
        .emit('studentCount', (socketIdsInRoom?.length || 1) - 1);
    }
    socket.leave(roomId);
  });
});

// Middlewares
app.use(logger);
app.use(cors(corsOptions));

// Routes
app.use('/codeblock', codeBlockRouter);

server.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
