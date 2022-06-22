
import { createServer } from 'http';

var server = createServer((req, res) => {
  res.writeHead(200)
  res.write('Hello World!');
  res.end();
})

server.listen(process.env.PORT)
