module.exports.index = (req, res) => {
    res.render("client/pages/products/product.pug",{
      pageTitle: "Trang sản phẩm "
    });
  
  }