// [GET] /admin/products
const Product = require("../../models/product.model");
const filterStatusHelper = require("../../helpers/filterStatus");
module.exports.index = async (req, res) => {
  const filterStatus = filterStatusHelper(req.query)
 
    console.log(req.query.status)
  let find = {
    deleted: false,
  };
  if(req.query.status){
    find.status = req.query.status
  }

  keyword = ""

  if(req.query.keyword ){

    keyword = req.query.keyword 
    // Tìm kiếm sản phẩm like tên thôi  không phân biệt hoa thường
      const regex = new RegExp(keyword,"i");
      find.title = regex
  }
  const listProducts = await Product.find(find);

  res.render("admin/pages/product/index.pug", {
    pageTitle: "Danh sách sản phẩm ",
    listProducts: listProducts,
    filterStatus: filterStatus,
    keyword: keyword
  });
};
