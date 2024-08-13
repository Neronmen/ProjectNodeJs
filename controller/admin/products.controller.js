// [GET] /admin/products
const Product = require("../../models/product.model");
const filterStatusHelper = require("../../helpers/filterStatus");
const searchHelper = require("../../helpers/search");
const paginationHelper = require("../../helpers/pagination");
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
  // Pagination
  const countProducts = await Product.countDocuments(find);
  const objectPage = paginationHelper(
    {
      currentPage: 1,
      limit: 4,
      skip: 0,
    },
    req.query,
    countProducts
  );
  const listProducts = await Product.find(find)
    .limit(objectPage.limit)
    .skip(objectPage.skip);

  res.render("admin/pages/product/index.pug", {
    pageTitle: "Danh sách sản phẩm ",
    listProducts: listProducts,
    filterStatus: filterStatus,
    keyword: objectSearch.keyword,
    totalPages: objectPage,
  });
};

// [PATCH] /admin/product/change-status/active/123
module.exports.changeStatus = async (req, res) => {
  const statusCurrent = req.params.status;
  const id = req.params.id;
  const statusChange = statusCurrent == "active" ? "inactive" : "active";
  await Product.updateOne({ _id: id }, { status: statusChange });
  res.redirect("back");
};

// [PATCH] /admin/product/change-multi
module.exports.changeMulti = async (req, res) => {
  const type = req.body.type;
  const ids = req.body.ids.split(", ");
  console.log(type)
  console.log(ids)
  await Product.updateMany({ _id:{ $in: ids } }, {status: type });
  res.redirect("back");
};



// [DELETE] /admin/product/delete
module.exports.delete = async (req, res) => {
  const id = req.params.id;
  // Xóa vĩnh viễn 
  //- await Product.deleteOne({_id: id})
  // Xóa mềm 
  await Product.updateOne({_id: id},{deleted: true})
  res.redirect("back");
};

