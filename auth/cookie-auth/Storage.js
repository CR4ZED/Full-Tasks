const { Storage } = require("@google-cloud/storage");
const path = require("path");

const bucket = new Storage().bucket(
  "staging.teleport-intern-ankush.appspot.com"
);

const uploadImage = async (file) => {
  const response = await bucket.upload(
    path.join(__dirname, "uploads", file.filename),
    {
      destination: file.filename + `.${file.mimetype.split("/")[1]}`,
      public: true,
    }
  );
  return response[0].metadata;
};

module.exports = { uploadImage };
