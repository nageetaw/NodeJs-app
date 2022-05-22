const express = require("express");
const productController = require("../controllers/productController");

const productRoute = express();

productRoute.get("/", productController.home);

productRoute.get("/about", productController.about);

productRoute.post("/createProduct", productController.createProduct_Post);

productRoute.get("/createProduct", productController.createProduct);

productRoute.get("/product", productController.product);

productRoute.get("/productDetail/:id", productController.productDetail);

productRoute.get("/deleteProduct/:id", productController.deleteProduct);

productRoute.get("/updateProduct/:id", productController.updateProduct);

productRoute.post("/updateProduct/:id", productController.updateProduct_Post);

productRoute.use("*", productController.error);

module.exports = productRoute;
