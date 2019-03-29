const axios = require("axios");
const Gists = require("gists");
// save environment variables in dotenv
require("dotenv").config();

const express = require("express");
const app = express();

const port = process.env.PORT || 5000;

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

app.get("/", (req, res, next) => {
  res.sendFile(__dirname + "/index.html");
});

app.listen(port, () => {
  console.log("Server listening at port " + port);
});

app.post("/api/getAllGists", (req, res) => {
  console.log("Getting updated gists from github");
  const {
    body: { token, name }
  } = req;
  const gists = new Gists({
    token: token
  });
  // GET /gists/
  gists
    .list(name)
    .then(response => {
      let gists = [];

      response.body.map(response => {
        const gist = new Object();
        const files = [];
        for (var member in response.files) {
          files.push(member);
        }
        gist.id = response.id;
        gist.description = response.description;
        gist.filesCount = files.length;
        gist.public = response.public;
        gist.createdAt = response.created_at;
        gist.html_url = response.html_url;
        gists.push(gist);
      });
      return res.send(gists);
    })
    .catch(function() {
      console.log("Couldn't fetch gists.");
    });
});
app.post("/api/files", (req, res) => {
  // get gist name from body of the request
  const {
    body: { token, id }
  } = req;

  const gists = new Gists({
    token: token
  });

  gists
    .get(id)
    .then(data => {
      let gist = new Object();
      gist.id = id;
      gist.html_url = data.body.html_url;
      gist.description = data.body.description;
      let files = [];
      for (var member in data.body.files) {
        let file = new Object();
        file.name = member;
        file.content = data.body.files[member].content;
        file.raw_url = data.body.files[member].raw_url;
        files.push(file);
      }
      gist.files = files;
      // console.log("gist", gist);
      return res.send(gist);
    })
    .catch(console.error);
});

app.post("/api/deleteGist", (req, res) => {
  // get gist name from body of the request
  const {
    body: { token, id }
  } = req;
  const gists = new Gists({
    token: token
  });

  gists
    .delete(id)
    .then(r => {
      console.log("Successfully deleted a new gist.");
      return res.send(id);
    })
    .catch(console.error);
});

app.post("/api/createGist", (req, res) => {
  // get gist name from body of the request
  const {
    body: { token, name }
  } = req;
  console.log("token: ", token);
  const gists = new Gists({
    token: token
  });
  const options = {
    description: name,
    public: true,
    files: {
      [name]: {
        content: "-"
      }
    }
  };
  console.log(options);
  gists
    .create(options)
    .then(r => {
      console.log("Successfully created a new gist.");
      return res.send(r.body.description);
    })
    .catch(console.error);
});

app.post("/api/getUser", (req, res) => {
  // get gist name from body of the request
  const {
    body: { token }
  } = req;
  const url = `https://api.github.com/user?access_token=${token}`;
  axios
    .get(url)
    .then(function(response) {
      return res.send({
        username: response.data.login,
        avatar: response.data.avatar_url
      });
    })
    .catch(function(err) {
      console.log("Erro when fetching user profile.. ", err);
    });
});
