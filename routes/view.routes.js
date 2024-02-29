const express = require("express");
const path = require("path");

const router = express.Router();

router.get("/", (request, response) => {
  response.render(path.resolve(__dirname, "../views", "index.handlebars"), {
    pageTitle: "todo",
  });
});

module.exports = router;
