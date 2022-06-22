
//import { createServer } from 'http';

//createServer((req, res) => {
 ////// res.write('Hello World!');
//  res.end();
//}).listen(process.env.PORT);


http = require('http')

server = http.createServer()

server.on("request",function(req,res){
  res.writeHead(200)
  res.write("haha xd")
  res.end()
})

server.listen(process.env.PORT)

