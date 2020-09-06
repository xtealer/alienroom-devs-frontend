// module imports
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

// imported routes
const instagram = require("./instagram");
const mail = require("./mail");

// constants
const PORT = process.env.PORT || 3000;

// create expresss app
const app = express();

// root routes
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/instagram", instagram);
app.use("/mail", mail);

// fallback response if not found
app.use((req, res) => {
  res.status(404).json({
    message: "Not found",
    code: "not_found",
  });
});

// start
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
