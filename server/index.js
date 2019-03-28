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
    .list("nida-munir")
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

// app.post("/api/createGist", (req, res) => {
//   const token = req.body.token;
//   // Retrieve the object from storage
//   // var gitHubUser = localStorage.getItem("gitHubUser");

//   console.log("token in api: ", token);
//   const octokit = new Octokit({
//     auth: token
//   });
//   console.log("in /api/createGist");
//   const options = {
//     description: "",
//     public: true,
//     files: {
//       name: {
//         content: "new gits created"
//       }
//     }
//   };
//   console.log("Options", options);
//   octokit.gists.create(options).then(result => {
//     console.log(result);
//   });
// });

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
