module.exports = (objectPage,query,countProducts) => {
    if (query.page) {
        objectPage.currentPage = parseInt(query.page);
     }
   
      
       const totalPages = Math.ceil(countProducts/objectPage.limit)
       
       objectPage.totalPage = totalPages;
   
   
     objectPage.skip = (objectPage.currentPage - 1) * objectPage.limit;
     return objectPage
}