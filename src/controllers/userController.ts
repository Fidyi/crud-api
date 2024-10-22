import { getAllUsers, getUserById, createUser, updateUser, deleteUser } from '../db/inMemoryDb';
import { validateUUID, validateUserData } from '../utils/errorHandlers';
import { IncomingMessage, ServerResponse } from 'http';

export const handleGetUsers = (req: IncomingMessage, res: ServerResponse) => {
  const users = getAllUsers();
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(users));
};

export const handleGetUserById = (id: string, res: ServerResponse) => {
  if (!validateUUID(id)) {
    res.writeHead(400, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Invalid UUID format' }));
    return;
  }
  const user = getUserById(id);
  if (user) {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(user));
  } else {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'User not found' }));
  }
};

export const handleCreateUser = (req: IncomingMessage, res: ServerResponse) => {
  let body = '';

  req.on('data', chunk => {
    body += chunk.toString();
  });

  req.on('end', () => {
    try {
      const userData = JSON.parse(body);

      if (!validateUserData(userData)) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Invalid user data' }));
        return;
      }

      const newUser = createUser(userData);

      res.writeHead(201, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(newUser));
    } catch (err) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'Invalid JSON format' }));
    }
  });
};

export const handleUpdateUser = (id: string, req: IncomingMessage, res: ServerResponse) => {
  if (!validateUUID(id)) {
    res.writeHead(400, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Invalid UUID format' }));
    return;
  }

  let body = '';

  req.on('data', chunk => {
    body += chunk.toString();
  });

  req.on('end', () => {
    try {
      const updatedUserData = JSON.parse(body);
      const updatedUser = updateUser(id, updatedUserData);

      if (!updatedUser) {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'User not found' }));
        return;
      }

      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(updatedUser));
    } catch (err) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'Invalid JSON format' }));
    }
  });
};

export const handleDeleteUser = (id: string, res: ServerResponse) => {
  if (!validateUUID(id)) {
    res.writeHead(400, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Invalid UUID format' }));
    return;
  }

  const userDeleted = deleteUser(id);

  if (userDeleted) {
    res.writeHead(204);
    res.end();
  } else {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'User not found' }));
  }
};
