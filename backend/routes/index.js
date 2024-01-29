const express = require("express");
const router = express.Router();
const { Item, Image } = require("../models");
router.get("/getItems", async (req, res) => {
  //   console.log("aaa");
  try {
    const items = await Item.findAll({ include: { model: Image } });
    console.log(items);
    return res.status(200).json(items);
  } catch (e) {
    return res.status(400).json(e.message);
  }
});
module.exports = router;
