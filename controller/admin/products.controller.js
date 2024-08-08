// [GET] /admin/products
const Product = require("../../models/product.model");
const filterStatusHelper = require("../../helpers/filterStatus");
const searchHelper = require("../../helpers/search");
module.exports.index = async (req, res) => {
  const filterStatus = filterStatusHelper(req.query);

  console.log(req.query.status);
  let find = {
    deleted: false,
  };
  if (req.query.status) {
    find.status = req.query.status;
  }
  // Phần tìm kiếm
  const objectSearch = searchHelper(req.query);
  console.log(objectSearch);
  if (objectSearch.regex) {
    find.title = objectSearch.regex;
  }

  const objectPage = {
    currentPage: 1,
    limit: 4,
    skip: 0,
  };
  if (req.query.page) {
     objectPage.currentPage = parseInt(req.query.page);
  }

    const countProducts = await Product.countDocuments(find);
    const totalPages = Math.ceil(countProducts/objectPage.limit)
    
    objectPage.totalPage = totalPages;


  objectPage.skip = (objectPage.currentPage - 1) * objectPage.limit;

  console.log(objectPage.skip);

  const listProducts = await Product.find(find)
    .limit(objectPage.limit)
    .skip(objectPage.skip);

  res.render("admin/pages/product/index.pug", {
    pageTitle: "Danh sách sản phẩm ",
    listProducts: listProducts,
    filterStatus: filterStatus,
    keyword: objectSearch.keyword,
    totalPages: objectPage
  });
};
