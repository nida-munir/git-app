// save environment variables in dotenv
require("dotenv").config();
const Octokit = require("@octokit/rest");

// const Gists = require("gists");
// const fs = require("fs");

// express set up, handles request, response easily
const express = require("express");
const app = express();

// express session
// const session = require("express-session");

// makes sending requests easy
// const request = require("request");

// node core module, construct query string
// const qs = require("querystring");

// node core module, parses url string into components
// const url = require("url");

// generates a random string for the
// const randomString = require("randomstring");

// random string, will be used in the workflow later
// const csrfString = randomString.generate();

// setting up port and redirect url from process.env
// makes it easier to deploy later
const port = process.env.PORT || 5000;
// const redirect_uri = process.env.HOST + "/redirect";

// console.log("redirect uri", redirect_uri);
// const CLIENT_ID = "92bfb1aa190ee8615b78";
// const CLIENT_SECRET = "abf2ddacc8fcd671aa93c12f99dcb6145bf5edf5";

// serves up the contents of the /views folder as static
app.use(express.static("views"));
app.use(express.json());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
// initializes session
// app.use(
//   session({
//     secret: randomString.generate(),
//     cookie: { maxAge: 60000 },
//     resave: false,
//     saveUninitialized: false
//   })
// );

app.get("/", (req, res, next) => {
  res.sendFile(__dirname + "/index.html");
});

app.listen(port, () => {
  console.log("Server listening at port " + port);
});

app.post("/api/createGist", (req, res) => {
  // Retrieve the object from storage
  var gitHubUser = localStorage.getItem("gitHubUser");

  console.log("token in api: ", JSON.parse(gitHubUser.token));
  const octokit = new Octokit({
    auth: gitHubUser.token
  });
  console.log("in /api/createGist");
  const options = {
    description: "",
    public: true,
    files: {
      name: {
        content: "new gits created"
      }
    }
  };
  console.log("Options", options);
  octokit.gists.create(options).then(result => {
    console.log(result);
  });
});

// app.get("/getAllGists", (req, res) => {
//   fs.readFile("data.json", (err, data) => {
//     if (err) {
//       console.log("Error while reading access_token from json file.");
//       return;
//     }
//     let result = JSON.parse(data);
//     const gists = new Gists({
//       token: result.access_token
//     });
//     // GET /gists/
//     gists
//       .list("nida-munir")
//       .then(response => {
//         // console.log("Successfully", response.body);
//         let allGists = [];
//         response.body.map(response => {
//           const gist = new Object();
//           const files = [];
//           for (var member in response.files) {
//             // console.log("Name: ", member);
//             //console.log("Value: ", response.files[member]);
//             files.push(member);
//           }
//           gist.id = response.id;
//           gist.files = files;

//           allGists.push(gist);
//           //console.log(response.id);
//         });
//         return res.send({ status: "Success", gists: allGists });
//       })
//       .catch(console.error);
//   });
// });
// app.post("/addGist", (req, res) => {
//   // get gist name from body of the request
//   const {
//     body: { name }
//   } = req;

//   // read access token from json file
//   fs.readFile("data.json", (err, data) => {
//     if (err) {
//       console.log("Error while reading access_token from json file.");
//       return;
//     }
//     let result = JSON.parse(data);
//     const gists = new Gists({
//       token: result.access_token
//     });
//     const options = {
//       description: "",
//       public: true,
//       files: {
//         name: {
//           content: "new gits created"
//         }
//       }
//     };
//     console.log(options);
//     gists
//       .create(options)
//       .then(r => {
//         console.log("Successfully created a new gist.");
//         return res.send({ status: "Success" });
//       })
//       .catch(console.error);
//   });
// });
