const { default: axios } = require("axios");
const express = require("express");
const cookieSession = require("cookie-session");
const path = require("path");
const ds = require("./Datastore");
const { createUser, fetchUser } = require("./User");
//test
const app = express();
app.set("view engine", "hbs");

app.use(express.static(path.join(__dirname, "public")));
app.use(cookieSession({ keys: ["key1"] }));
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
  req.session.userId = user.id;
  res.redirect("/dashboard");
});

app.get("/dashboard", async (req, res) => {
  if (!req.session.userId) {
    return res.redirect("/");
  }
  const userId = req.session.userId;
  const key = ds.key(["User"]);
  key.id = userId;
  const user = await ds.get(key);
  res.render("dashboard", { username: user[0].username });
});

app.get("/logout", (req, res) => {
  req.session = null;
  res.redirect("/");
});

app.get("/tasks", async (req, res) => {
  if (!req.session.userId) {
    return res.redirect("/");
  }
  const user = req.session.userId;
  const query = ds.createQuery("Task").filter("createdBy", "=", user);
  const results = await ds.runQuery(query);
  res.send(results[0]);
});

app.listen(3000, () => console.log("app is litening at 3000"));
