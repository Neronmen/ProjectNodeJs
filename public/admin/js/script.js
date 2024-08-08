// Bộ lọc hoạt động
const buttonStatus = document.querySelectorAll("[button-status]");
if (buttonStatus.length > 0) {
  console.log(buttonStatus);
  let url = new URL(window.location.href);
  console.log(url);
  buttonStatus.forEach((button) => {
    button.addEventListener("click", () => {
      const status = button.getAttribute("button-status");
      console.log(status);
      if (status) {
        url.searchParams.set("status", status);
      } else {
        url.searchParams.delete("status");
      }
      window.location.href = url.href;
    });
  });
}

// End bộ lộ hoạt động

// Tìm kiếm
const form = document.querySelector("#form-search");
if (form) {
  const url = new URL(window.location.href);
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const keyword = e.target.elements.keyword.value;
    if (keyword) {
      url.searchParams.set("keyword", keyword);
    } else {
      url.searchParams.delete("keyword");
    }
    window.location.href = url.href;
  });
}

// End Tìm kiếm

// Pagination
const buttonPagination = document.querySelectorAll(".page-link");

if (buttonPagination) {
  const url = new URL(window.location.href);
  buttonPagination.forEach((button) => {
    button.addEventListener("click", (e) => {
      e.preventDefault();
        var page = button.getAttribute("button-pagination");
        console.log(page)
        if(page){
          url.searchParams.set("page",page);
        }else{
          url.searchParams.delete("page");
        }
        window.location.href = url.href
    });
  });
}

// End Pagination
