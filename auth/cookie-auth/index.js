const { default: axios } = require("axios");
const express = require("express");
const cookieSession = require("cookie-session");
const cors = require("cors");
const multer = require("multer");

const fs = require("fs");
const path = require("path");

const ds = require("./Datastore");
const { createUser, fetchUser } = require("./User");
const { uploadImage } = require("./Storage");

const PORT = process.env.PORT || 8080;
const upload = multer({ dest: "./uploads" });

const app = express();
app.set("view engine", "hbs");

app.use(cors());
app.use(
  cookieSession({
    name: "session",
    keys: ["key1"],
    expires: new Date(Date.now() + 30 * 60 * 1000),
  })
);
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  if (req.session.userId) {
    return res.redirect("/dashboard");
  }
  res.render("index");
});

app.post("/register", async (req, res) => {
  // const response = await axios.post("http://localhost:3001/register", req.body);
  // if (response.data.error) {
  //   return res.send(response.data);
  // }
  const query = ds.createQuery("User").filter("email", "=", req.body.email);
  const result = await ds.runQuery(query);
  if (result[0].length) {
    return res.send({ error: "User already exists!" });
  }
  const userData = req.body;
  const userId = await createUser(userData);
  // res.send({ msg: "registered!", userId });

  req.session.userId = userId;
  res.redirect("/dashboard");
});

app.post("/login", async (req, res) => {
  // const response = await axios.post("http://localhost:3001/login", req.body);
  // if (response.data.error) {
  //   return res.send({ msg: "invalid credentials!" });
  // }
  // req.session.userId = response.data.id;
  // res.redirect("/dashboard");

  const userData = req.body;
  const user = await fetchUser(userData);
  if (user.error) {
    return res.send(user.error);
  }
  req.session.userId = user.id;
  res.redirect("/dashboard");
});

app.get("/dashboard", async (req, res) => {
  console.log(`id : ${req.session.userId}`);
  if (!req.session.userId) {
    return res.redirect("/");
  }
  const userId = req.session.userId;
  const key = ds.key(["User"]);
  key.id = userId;
  const user = await ds.get(key);
  res.render("dashboard", {
    username: user[0].username,
    avatar:
      user[0].avatar ||
      "https://genslerzudansdentistry.com/wp-content/uploads/2015/11/anonymous-user.png",
  });
});

app.get("/logout", (req, res) => {
  req.session = null;
  res.redirect("/");
});

app.post("/upload", upload.single("avatar"), async (req, res) => {
  const response = await uploadImage(req.file);
  fs.unlink(path.join(__dirname, "uploads", req.file.filename), async (err) => {
    if (err) throw err;
    console.log("removing.......");
    const key = ds.key(["User"]);
    key.id = req.session.userId;
    console.log(response);
    const user = await ds.get(key);
    user[0].avatar = `https://storage.googleapis.com/${response.bucket}/${response.name}`;
    await ds.upsert({ key, data: user[0] });
    res.redirect("/dashboard");
  });
});

app.get("/loadAvatar", async (req, res) => {});

app.listen(PORT, () => console.log("app is litening at " + PORT));
