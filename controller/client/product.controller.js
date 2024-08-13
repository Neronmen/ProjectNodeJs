    // [GET] /products

const Product = require("../../models/product.model");
module.exports.index = async (req, res) => {
    const listProduct = await Product.find({
      status: "active",
      deleted: false
    }).sort({position: "desc"});
    console.log(listProduct)
    listProduct.forEach( item  =>{
        item.priceNew = ((item.price * (100- item.discountPercentage))/100).toFixed(0)
    })
    res.render("client/pages/products/product.pug",{
      pageTitle: "Trang sản phẩm ",
      product: listProduct
    });
    
  }


  

  