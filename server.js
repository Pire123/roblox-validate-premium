const https = require("https");
const http = require("http");

const PORT = process.env.PORT;

const server = http.createServer();

const requestListener = function(reqq,res) {

  
    https.request(
        {
          hostname: "api.ipify.org",
          path: "/",
          method: "GET",
          headers: {
            "Content-Type": "x-www-form-urlencode"
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
