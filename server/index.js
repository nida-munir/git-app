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
      let allGists = [];
      response.body.map(response => {
        const gist = new Object();
        const files = [];
        for (var member in response.files) {
          files.push(member);
        }
        gist.id = response.id;
        gist.files = files;

        allGists.push(gist);
      });
      return res.send({ status: "Success", gists: allGists });
    })
    .catch(console.error);
});
app.post("/api/getSingleGist", (req, res) => {
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
      let notebook = new Object();
      notebook.id = id;
      notebook.html_url = data.body.html_url;
      let notes = [];
      for (var member in data.body.files) {
        let note = new Object();
        note.name = member;
        note.content = data.body.files[member].content;
        notes.push(note);
      }
      notebook.notes = notes;
      console.log("notebook", notebook);
      return res.send({ notebook: notebook });
    })
    .catch(console.error);
});

app.post("/api/deleteGist", (req, res) => {
  // get gist name from body of the request
  const {
    body: { token, id }
  } = req;
  console.log("token: ", token);
  const gists = new Gists({
    token: token
  });

  console.log("id", id);
  gists
    .delete(id)
    .then(r => {
      console.log("Successfully deleted a new gist.");
      return res.send({ status: "Success", id: id });
    })
    .catch(console.error);
});

app.post("/api/addGist", (req, res) => {
  // get gist name from body of the request
  const {
    body: { token, name }
  } = req;
  console.log("token: ", token);
  const gists = new Gists({
    token: token
  });
  const options = {
    description: "",
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
      return res.send({ status: "Success" });
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
      // console.log(response.data);

      return res.send({
        username: response.data.login,
        avatar: response.data.avatar_url
      });
    })
    .catch(function(err) {
      console.log("Erro when fetching user profile.. ", err);
    });
});
