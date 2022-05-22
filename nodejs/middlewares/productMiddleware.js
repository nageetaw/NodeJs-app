function checkInputValidityMiddleware(req, res, move) {
  console.log("checking first middle ware");
  if (!req.body.name || !req.body.price || !req.files.image) {
    res.redirect("/product/api/createProduct");
  } else {
    move();
  }
}

function checkAnOtherMiddleware(req, res, move) {
  console.log("checking another middle ware");
  move();
}
module.exports = { checkInputValidityMiddleware, checkAnOtherMiddleware };
