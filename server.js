const https = require("https");
const http = require("http");

const { URL } = require("url");
const StringDecoder = require("string_decoder").StringDecoder;

const PORT = process.env.PORT;
const DomainAddress = "https://roblox-validate-premium.up.railway.app/";

const server = http.createServer();

const User_Agent = "Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.5060.53 Safari/537.36";

function isNumeric(num) {
  return !isNaN(num);
}

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

const requestListener = function (request, response) {
  var userid = request.url.substring(1);

  var randomuser = getRandomInt(1e9);

  var gotrandom = false;

  if (userid == null || userid == "" || userid == " " || !isNumeric(userid)) {
    //console.log("user id is not defined in path");

    gotrandom = true;

    userid = randomuser;
  }

  let content = null;

  https
    .request(
      {
        hostname: "www.roblox.com",
        path: "/users/" + userid + "/profile",
        method: "GET",
        headers: {
          "Content-Type": "text/html",
          "user-agent" : User_Agent
        },
      },
      function (req) {
        var str = "";
        req.on("data", function (ch) {
          str += ch;
        });

        req.on("end", function () {
          let ispre = str.toString().includes("icon-premium");

          content = ispre.toString();

          if (gotrandom) {
            response.writeHead(404);
            response.write(
              "usage: " +
                DomainAddress +
                "/USERID" +
                "\r\n" +
                "example: \r\n\nRequest:\nGET " +
                DomainAddress +
                "/" +
                randomuser +
                "\r\n\n" +
                "Response:" +
                "\r\n" +
                content
            );
            response.end();
          } else {
            response.writeHead(200);
            response.write(content);
            response.end();
          }
        });
      }
    )
    .end();
};

server.on("request", requestListener);
server.listen(PORT);
