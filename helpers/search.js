module.exports = (query) => {
  keyword = "";
    let objectSearch = {
        keyword: "",
        
    }
  if (query.keyword) {
    objectSearch.keyword = query.keyword;
    // Tìm kiếm sản phẩm like tên thôi  không phân biệt hoa thường
    const regex = new RegExp(objectSearch.keyword, "i");
    objectSearch.regex = regex;
  }
  return objectSearch;
};
