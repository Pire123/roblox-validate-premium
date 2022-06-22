
import { createServer } from 'http';

createServer((req, res) => {
  res.writeHead(200)
  res.write('haha xd');
  res.end();
}).listen(process.env.PORT)
