import http from 'http';
import { handleRequest } from '../utils/requestHandler';

const PORT = process.env.PORT || 4000;

const server = http.createServer(handleRequest);

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
