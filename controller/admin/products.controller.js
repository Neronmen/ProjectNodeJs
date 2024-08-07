    // [GET] /admin/products

module.exports.index = (req, res) => {
    res.render("admin/pages/product/index.pug",
        {
            pageTitle: "Danh sách sản phẩm "
        }
    )
  }

