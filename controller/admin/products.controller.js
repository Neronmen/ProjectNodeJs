// [GET] /admin/products
const Product = require("../../models/product.model");
module.exports.index = async (req, res) => {

  let filterStatus = [
    {
      name: "Tất cả",
      status: "",
      class: ""


    },
    {
      name: "Hoạt Động ",
      status: "active",
      class: ""
    },
    {
      name: "Dừng hoạt động ",
      status: "inactive",
      class: ""
    }
    
  ];

      
      if(req.query.status){
        const index = filterStatus.findIndex(item => item.status == req.query.status);
        filterStatus[index].class = "active";
      }else{
        const index = filterStatus.findIndex(item => item.status == "");
        filterStatus[index].class = "active";
      }
      





    console.log(req.query.status)
  let find = {
    deleted: false,
  };
  if(req.query.status){
    find.status = req.query.status
  }
  

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
