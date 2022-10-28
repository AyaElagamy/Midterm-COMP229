// modules required for routing
let express = require("express");
let router = express.Router();
let mongoose = require("mongoose");

// define the product model
let product = require("../models/products");

/* GET products List page. READ */
router.get("/", (req, res, next) => {
  // find all products in the products collection
  product.find((err, products) => {
    if (err) {
      return console.error(err);
    } else {
      res.render("products/index", {
        title: "Products",
        products: products,
      });
    }
  });
});

//  GET the Product Details page in order to add a new Product
router.get("/add", (req, res, next) => {
  res.render("products/add", {title: "Add Products"});
});

// POST process the Product Details page and create a new Product - CREATE
router.post("/add", (req, res, next) => {

  let newProduct = Product({
    id: req.body.id,
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
  });

  Product.create(newProduct, (err, Product) => {
    if (err) {
      console.log(err);
      res.end(err);
    } else {
      // refresh the Products list
      res.redirect("/products");
    }
  });
});

// GET the Product Details page in order to edit an existing Product
router.get("/details/:id", (req, res, next) => {
  let id = req.params.id; //id of actual object
  product.findById(id, (err, editProduct) => {
    if (err) {
      console.log(err);
      res.end(err);
    } else {
      //show the edit view
      res.render("products/details", {
        title: "Edit Product",
        product: editProduct,
      });
    }
  });
});

// POST - process the information passed from the details form and update the document
router.post("/details/:id", (req, res, next) => {
  let id = req.params.id; //id of actual object
  let updateproduct = Product({
    _id: id,
    id: req.body.id,
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
  });
  product.updateOne({ _id: id }, updateproduct, (err) => {
    if (err) {
      console.log(err);
      res.end(err);
    } else {
      res.redirect("/products");
    }
  });
});

// GET - process the delete
router.get("/delete/:id", (req, res, next) => {
  let id = req.params.id;
  product.remove({ _id: id }, (err) => {
    if (err) {
      console.log(err);
      res.end(err);
    } else {
      res.redirect("/products");
    }
  });
});

module.exports = router;
