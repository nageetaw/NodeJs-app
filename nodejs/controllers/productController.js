const productModal = require("../models/productModal");
const path = require("path");

function home(req, res) {
  res.render("Home");
}

function about(req, res) {
  // console.log("in about");
  res.render("About");
}

function createProduct_Post(req, res) {
  const { image } = req.files;
  // console.log(req.files);
  image.mv(path.resolve("./public/images", image.name), (error) => {
    if (error) {
      res.send(error);
    } else {
      const newProduct = new productModal({
        ...req.body,
        image: image.name,
      });
      newProduct
        .save()
        .then((result) => res.render("Home"))
        .catch((err) => res.send("error occured in add product"));
    }
  });
}
function createProduct(req, res) {
  res.render("createProduct");
}

async function product(req, res) {
  const products = await productModal.find();
  res.render("product", { products });
}

async function productDetail(req, res) {
  const id = req.params.id;
  // console.log(id);
  const product = await productModal.findOne({ _id: id });
  // console.log(product);
  res.render("productDetail", { product });
}

async function deleteProduct(req, res) {
  const id = req.params.id;
  const response = await productModal.findOneAndDelete({ _id: id });
  response !== null
    ? res.redirect("/product/api/product")
    : res.send("page not found");
}

async function updateProduct(req, res) {
  const id = req.params.id;
  const product = await productModal.findById({ _id: id });
  res.render("updateProduct", { product });
}

async function updateProduct_Post(req, res) {
  const { name, price } = req.body;
  const id = req.params.id;
  var updatedFields = {};
  if (req.files !== null) {
    const { image } = req.files;
    updatedFields = {
      name: name,
      price: price,
      image: image.name,
    };
    image.mv(path.resolve("./public/images", image.name), (error) => {
      if (!error) {
        productModal.updateOne(
          {
            _id: id,
          },
          updatedFields,
          (err) => {
            // console.log("in callback");
            if (err) {
              res.send(`Error: ` + err);
            } else res.redirect("/product/api/");
          }
        );
      } else {
        res.send(error);
      }
    });
  } else {
    updatedFields = {
      name: name,
      price: price,
    };

    productModal.updateOne(
      {
        _id: id,
      },
      updatedFields,
      (err) => {
        // console.log("in callback");
        if (err) {
          res.send(`Error: ` + err);
        } else res.redirect("/product/api/");
      }
    );
  }
}

function error(res, res) {
  res.send("page not found");
}
module.exports = {
  home,
  about,
  createProduct,
  createProduct_Post,
  product,
  productDetail,
  deleteProduct,
  updateProduct,
  updateProduct_Post,
  error,
};
