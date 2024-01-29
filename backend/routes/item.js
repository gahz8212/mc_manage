const express = require("express");
const router = express.Router();
const multer = require("multer");
const { Item, Image } = require("../models");
const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, cb) {
      cb(null, "uploads/");
    },
    filename(req, file, cb) {
      file.originalname = Buffer.from(file.originalname, "latin1").toString(
        "utf8"
      );
      cb(null, file.originalname);
    },
  }),
  limits: { fileSize: 5 * 1024 * 1024 },
});
router.post("/images", upload.array("images"), (req, res) => {
  console.log(req.files);
  try {
    const images = req.files.map((image) => ({
      url: `/img/${image.filename}`,
    }));
    return res.status(200).json(images);
  } catch (e) {
    return res.status(400).json(e.message);
  }
});
router.post("/addItem", async (req, res) => {
  const { category, name, descript, unit, price, point, use, images } =
    req.body;
  try {
    const item = await Item.create({
      category,
      name,
      descript,
      unit,
      price,
      point,
      use,
    });
    const images_promise = await Promise.all(
      images.map((image) => Image.create({ url: image.url, ItemId: item.id }))
    );
    item.addImages(images_promise.map((image) => image[0]));
    return res.status(200).json("addItem_ok");
  } catch (e) {
    return res.status(400).json(e.message);
  }
});
router.post("/editItem", async (req, res) => {
  const { Images, id, ...rest } = req.body;

  try {
    await Item.update(rest, { where: { id } });
    if (Images) {
      await Image.destroy({ where: { ItemId: id } });
      Images.map(
        async (image) => await Image.create({ url: image.url, ItemId: id })
      );
    }
    return res.status(200).json("editItem_ok");
  } catch (e) {
    return res.status(400).json(e.message);
  }
});
router.post("/excelAdd", async (req, res) => {
  console.log("req.body", req.body);
});
module.exports = router;
