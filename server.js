const https = require("https");
const http = require("http");

const PORT = process.env.PORT;

const server = http.createServer();

const id = 1590146198

const requestListener = function(reqq,res) {

  
    https.request(
        {
          hostname: "www.roblox.com/users/" + id + "/profile",
          path: "/",
          method: "GET",
          headers: {
            "Content-Type": "text/html"
          }
        },
        function(req) {
          var str = "";
          req.on("data", function(ch) {
            str += ch;
          });

          req.on("end", function() {
             res.writeHead(200)
            res.write(str)
            res.end()
          });
        }
      )
      .end();
  
}


server.on("request", requestListener);
server.listen(PORT);
