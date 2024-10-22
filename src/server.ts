import { createServer } from 'http';
import dotenv from 'dotenv';
import { handleGetUsers, handleGetUserById, handleCreateUser, handleUpdateUser, handleDeleteUser } from './controllers/userController';

dotenv.config();

const PORT = process.env.PORT || 4000;

const server = createServer((req, res) => {
  const urlParts = req.url?.split('/');
  if (req.method === 'GET' && urlParts?.[1] === 'api' && urlParts?.[2] === 'users') {
    if (urlParts[3]) {
      handleGetUserById(urlParts[3], res);
    } else {
      handleGetUsers(req, res);
    }
  } else if (req.method === 'POST' && urlParts?.[1] === 'api' && urlParts?.[2] === 'users') {
    handleCreateUser(req, res);
  } else if (req.method === 'PUT' && urlParts?.[1] === 'api' && urlParts?.[2] === 'users' && urlParts[3]) {
    handleUpdateUser(urlParts[3], req, res);
  } else if (req.method === 'DELETE' && urlParts?.[1] === 'api' && urlParts?.[2] === 'users' && urlParts[3]) {
    handleDeleteUser(urlParts[3], res);
  } else {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Not found' }));
  }
});

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
