const express = require("express");
const router = express.Router();
const Article = require("./article.model");

router.post("/", (req, res) => {
  Article.create(req.body, (error, article) => {
    if (error) {
      console.log(`Error creating Article, ${new Date()}: ${error}`);
      res.status(400).json(error);
    } else {
      res.status(201).json(article);
    }
  });
});

router.get("/:articleId", (req, res) => {
  Article.findById(req.params.articleId, (error, article) => {
    if (error) {
      console.log("Error: ", error);
      res.status(400).json(error);
    } else {
      if (!article) {
        res.sendStatus(410);
      } else {
        res.status(200).json(article);
      }
    }
  });
});

module.exports = router;
