const https = require("https");
const http = require("http");

const { URL } = require("url");
const StringDecoder = require("string_decoder").StringDecoder;

const PORT = process.env.PORT;
//const DomainAddress = process.env.PROJECT_DOMAIN + ".glitch.me";

const server = http.createServer();

const User_Agent =
  "Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.5060.53 Safari/537.36";

function isNumeric(num) {
  return !isNaN(num);
}

function isEmpty(hahaxd) {
  hahaxd = hahaxd.trim();
  if (hahaxd == null || hahaxd == "") {
    return true;
  }
  return false;
}

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function getPre(userid, options, callback) {
  https
    .request(options, function (req) {
      var str = "";

      req.on("data", function (ch) {
        str += ch;
      });

      req.on("end", function () {
        let ispre = str.toString().includes("icon-premium").toString();

        callback(ispre);
      });
    })
    .end();
}

const requestListener = async function (request, response) {
  var userids = request.url.substring(1);

  var waiting = 0;

  var quee = [];

  const randomuser = getRandomInt(1e9);

  var gotrandom = false;

  if (userids.includes(",")) {
    const list = userids.split(",");

    console.log("multi id");

    // const len = list.length

    list.forEach((id, index) => {
      if (isNumeric(id) && !isEmpty(id)) {
        waiting = waiting + 1;

        const options = {
          hostname: "www.roblox.com",
          path: "/users/" + id + "/profile",
          method: "GET",
          headers: {
            "Content-Type": "text/html",
            "user-agent": User_Agent,
          },
        };

        getPre(id, options, (pre) => {
          quee[index] = pre;
          waiting = waiting - 1;

          if (waiting == 0) {
            response.writeHead(200);
            response.write(quee.toString());
            response.end();
          }
        });
      }
    });
  } else if (isNumeric(userids) && !isEmpty(userids)) {
    waiting = waiting + 1;

    let options = {
      hostname: "www.roblox.com",
      path: "/users/" + userids + "/profile",
      method: "GET",
      headers: {
        "Content-Type": "text/html",
        "user-agent": User_Agent,
      },
    };

    getPre(userids, options, (premium) => {
      waiting = waiting - 1;

      response.writeHead(200);
      response.write(premium);
      response.end();
    });
  } else {
    gotrandom = true;
    userids = randomuser;

    waiting = waiting + 1;

    let options = {
      hostname: "www.roblox.com",
      path: "/users/" + userids + "/profile",
      method: "GET",
      headers: {
        "Content-Type": "text/html",
        "user-agent": User_Agent,
      },
    };

    getPre(userids, options, (premium) => {
      waiting = waiting - 1;

      response.writeHead(404);
      response.write(
        "usage: " +
          process.env.domain +
          "/USERID" +
          "\r\n" +
          "example: \r\n\nRequest:\nGET " +
          process.env.domain +
          "/" +
          randomuser +
          "(,..,...,...)\r\n\n" +
          "Response:" +
          "\r\n" +
          premium
      );
      response.end();
    });
  }
};

server.on("request", requestListener);
server.listen(PORT);
