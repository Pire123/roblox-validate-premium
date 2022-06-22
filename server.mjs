
import { createServer } from 'http';

createServer((req, res) => {
  res.writeHead(200)
  res.write('Hello World!');
  res.end();
}).listen(process.env.PORT)
