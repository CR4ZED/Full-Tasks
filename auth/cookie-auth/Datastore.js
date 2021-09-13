const { Datastore } = require("@google-cloud/datastore");

const ds = new Datastore({ apiEndpoint: "http://localhost:8081" });

module.exports = ds;
