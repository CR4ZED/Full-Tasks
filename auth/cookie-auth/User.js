const ds = require("./Datastore");
const bcrypt = require("bcrypt");

const kind = "User";

const createUser = async (userData) => {
  const key = ds.key([kind]);
  userData.password = await bcrypt.hash(userData.password, 10);
  const user = {
    key,
    data: userData,
  };
  await ds.insert(user);
  console.log(`saved ${userData.username}`);
  return key.id;
};

const fetchUser = async (userData) => {
  const query = ds.createQuery("User").filter("email", "=", userData.loginMail);
  const [user] = await ds.runQuery(query);
  const isValid = await bcrypt.compare(userData.loginPwd, user[0].password);
  if (isValid) {
    return { ...user[0], id: user[0][ds.KEY]["id"] };
  }
  return { error: "Invalid Password" };
  // console.log(user);
};

module.exports = { createUser, fetchUser };
