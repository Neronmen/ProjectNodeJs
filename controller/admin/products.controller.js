    // [GET] /admin/products
    const Product = require("../../models/product.model");
module.exports.index = async (req, res) => {
    const listProducts = await Product.find(
        {
            deleted: false
        }
    );
    console.log(listProducts)

    res.render("admin/pages/product/index.pug",
        {
            pageTitle: "Danh sách sản phẩm ",
            listProducts: listProducts
        }
    )
  }

