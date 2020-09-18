const express = require("express");
const router = express.Router();
const { Product } = require("../models/Product");
const multer = require("multer");
const { auth } = require("../middleware/auth");
const aws = require("aws-sdk");
const multerS3 = require("multer-s3");
const path = require("path");
const { accessKeyId, secretAccessKey, Bucket } = require("../config/key");
const s3 = new aws.S3({
  accessKeyId: accessKeyId,
  secretAccessKey: secretAccessKey,
  Bucket: Bucket,
});

const ImageUpload = multer({
  storage: multerS3({
    s3: s3,
    bucket: Bucket,
    acl: "public-read",
    key: function (req, file, cb) {
      cb(null, `${Date.now()}_${file.originalname}`);
    },
  }),
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
}).single("file");

function checkFileType(file, cb) {
  // Allowed ext
  const filetypes = /jpeg|jpg|png/;
  // Check ext
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  // Check mime
  const mimetype = filetypes.test(file.mimetype);
  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb("Images Only!");
  }
}

//=================================
//             Product
//=================================

router.post("/uploadImage", auth, (req, res) => {
  ImageUpload(req, res, (err) => {
    if (err) {
      return res.json({ success: false, err });
    } else if (err instanceof multer.MulterError) {
      return res.json({ success: false, err });
    } else {
      return res.json({
        success: true,
        image: req.file.location,
        fileName: req.file.filename,
      });
    }
  });
});

router.post("/uploadProduct", auth, (req, res) => {
  const product = new Product(req.body);

  product.save((err) => {
    if (err) return res.status(400).json({ success: false, err });
    return res.status(200).json({ success: true });
  });
});

router.post("/getProducts", (req, res) => {
  let order = req.body.order ? req.body.order : "desc";
  let sortBy = req.body.sortBy ? req.body.sortBy : "_id";
  let limit = req.body.limit ? parseInt(req.body.limit) : 100;
  let skip = parseInt(req.body.skip);

  let findArgs = {};
  let term = req.body.searchTerm;

  for (let key in req.body.filters) {
    if (req.body.filters[key].length > 0) {
      if (key === "price") {
        findArgs[key] = {
          $gte: req.body.filters[key][0],
          $lte: req.body.filters[key][1],
        };
      } else {
        findArgs[key] = req.body.filters[key];
      }
    }
  }

  if (term) {
    Product.find(findArgs)
      .find({ $text: { $search: term } })
      .populate("writer")
      .sort([[sortBy, order]])
      .skip(skip)
      .limit(limit)
      .exec((err, products) => {
        if (err) return res.status(400).json({ success: false, err });
        res
          .status(200)
          .json({ success: true, products, postSize: products.length });
      });
  } else {
    Product.find(findArgs)
      .populate("writer")
      .sort([[sortBy, order]])
      .skip(skip)
      .limit(limit)
      .exec((err, products) => {
        if (err) return res.status(400).json({ success: false, err });
        res
          .status(200)
          .json({ success: true, products, postSize: products.length });
      });
  }
});

//?id=${productId}&type=single
//id=12121212,121212,1212121   type=array
router.get("/products_by_id", (req, res) => {
  let type = req.query.type;
  let productIds = req.query.id;

  if (type === "array") {
    let ids = req.query.id.split(",");
    productIds = [];
    productIds = ids.map((item) => {
      return item;
    });
  }
  if (type === "single") {
    Product.findByIdAndUpdate(productIds, { $inc: { views: 1 } }).exec();
  }
  Product.find({ _id: { $in: productIds } })
    .populate("writer")
    .exec((err, product) => {
      if (err) return res.status(400).send(err);
      return res.status(200).send(product);
    });
});

module.exports = router;
