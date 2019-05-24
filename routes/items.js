"use strict";

const express = require('express');
const router  = express.Router();

module.exports = (knex) => {

  router.get("/", (req, res) => {
      console.log("route being hit");
    knex
      .select("*")
      .from("items")
      .then((results) => {
      console.log(results);
      res.json(results);
    });
  });

  return router;
}