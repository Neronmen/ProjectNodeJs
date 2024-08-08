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
  const buttonPagination = [
    {
      page: "Trang trước",
      class: "",
    },
    {
      page: "1",
      class: "",
      value: "1",
    },
    {
      page: "2",
      class: "",
      value: "2",
    },
    {
      page: "3",
      class: "",
      value: "3",
    },
    {
      page: "4",
      class: "",
      value: "4",
    },
    {
      page: "Kế tiếp ",
      class: "",
    },
  ];

  if (req.query.page) {
    const index = buttonPagination.findIndex(
      (item) => item.page == req.query.page
    );
    buttonPagination[index].class = "active";
  } else {
    buttonPagination[1].class = "active";
  }

  const objectPage = {
    currentPage: 1,
    limit: 6,
    skip: 0,
  };
  if (req.query.page) {
     objectPage.currentPage = parseInt(req.query.page);
  }

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
    buttonPage: buttonPagination,
  });
};
