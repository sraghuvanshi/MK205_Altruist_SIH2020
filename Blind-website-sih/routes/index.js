var express = require("express");
var router = express.Router();

router.get("/", (req, res) => {
  res.render("index", {
    title: "Blind Website - Home",
  });
});
router.get("/programmes", (req, res) => {
  res.render("programmes", {
    title: "Blind Website - Programmes",
  });
});
router.get("/books", (req, res) => {
  res.render("books", {
    title: "Blind Website - Books",
  });
});
router.get("/whatsNew", (req, res) => {
  res.render("whatsNew", {
    title: "Blind Website - What's New",
  });
});
router.get("/single", (req, res) => {
  res.render("single", {
    title: "Blind Website - Single Scheme",
  });
});
router.get("/google", (req, res) => {
  res.render("google", {
    title: "Blind Website - Google",
  });
});
router.get("/youtube", (req, res) => {
  res.render("youtube", {
    title: "Blind Website - Youtube",
  });
});

module.exports = router;
