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
      console.log(page);
      if (page) {
        url.searchParams.set("page", page);
      } else {
        url.searchParams.delete("page");
      }
      window.location.href = url.href;
    });
  });
}

// End Pagination

// Check Box All
const checkboxAll = document.querySelector("[checkboxall]");
const inputsId = checkboxAll.querySelectorAll("input[name=id]");
const inputAll = checkboxAll.querySelector("[checkAll]");
if (checkboxAll) {
  inputAll.addEventListener("click", () => {
    if (inputAll.checked) {
      inputsId.forEach((input) => {
        input.checked = true;
      });
    } else {
      inputsId.forEach((input) => {
        input.checked = false;
      });
    }
  });

  inputsId.forEach((input) => {
    input.addEventListener("click", () => {
      const countChecked = checkboxAll.querySelectorAll(
        "input[name=id]:checked"
      ).length;
      if (countChecked == inputsId.length) {
        inputAll.checked = true;
      } else {
        inputAll.checked = false;
      }
    });
  });
}
// End Check Box All

// Form Change Multi
const formChangeMulti = document.querySelector("[form-change-multi]");

if (formChangeMulti) {
  formChangeMulti.addEventListener("submit", (e) => {
    e.preventDefault();
    const inputsChecked = checkboxAll.querySelectorAll(
      "input[name=id]:checked"
    );
    const typeChange = e.target.elements.type.value;
    if (typeChange == "data-delete") {
      const confirmDelete = confirm(
        "Bạn có chắc chắn muốn xóa tất cả sản phẩm được chọn không?"
      );
      if (!confirmDelete) {
        return;
      }
    }

    if (inputsChecked.length > 0) {
      const ids = [];
      inputsChecked.forEach((input) => {
        if(typeChange == "change-position"){
            const position = input.closest("tr").querySelector("input[name=position]").value;
            ids.push(`${input.value}-${position}`)
        }else{
          ids.push(input.value);
        }
        
      });
      const inputIds = formChangeMulti.querySelector("input[name=ids]");
      inputIds.value = ids.join(", ");
      formChangeMulti.submit();
    } else {
      alert("Vui lòng chọn ít nhất 1 bản ghi!");
    }
  });
}

// End Form Change Multi

// Delete item
const buttonsDelete = document.querySelectorAll("[button-delete]");
if (buttonsDelete.length > 0) {
  const formDelete = document.querySelector("#form-delete-item");
  const path = formDelete.getAttribute("path");
  buttonsDelete.forEach((button) => {
    button.addEventListener("click", () => {
      const checkConfirm = confirm(`Bạn có chắc muốn xóa sản phẩm này không`);
      if (checkConfirm) {
        const idItem = button.getAttribute("data-id");
        const action = `${path}/${idItem}?_method=DELETE`;
        console.log(action);
        formDelete.action = action;
        formDelete.submit();
      }
    });
  });
}
// End Delete Item

// Recover Product
const buttonsRecover = document.querySelectorAll("[button-recover]");

if (buttonsRecover.length > 0) {
  const formRecover = document.querySelector("#form-recover-product");
  const path = formRecover.getAttribute("path");
  buttonsRecover.forEach((button) => {
    button.addEventListener("click", () => {
      const checkConfirm = confirm(
        "Bạn có chắc chắn muốn khôi phục sản phẩm này không"
      );
      if (checkConfirm) {
        const id = button.getAttribute("data-id");
        const action = `${path}${id}?_method=PATCH`;
        formRecover.action = action;
        formRecover.submit();
      }
    });
  });
}

// End Recover Product

// Recover Multi
const formRecoverMulti = document.querySelector("[form-recover-multi]");

if (formRecoverMulti) {
  formRecoverMulti.addEventListener("submit", (e) => {
    e.preventDefault();
    const inputsChecked = checkboxAll.querySelectorAll(
      "input[name=id]:checked"
    );
    if (inputsChecked.length > 0) {
      const ids = [];
      inputsChecked.forEach((input) => {
        ids.push(input.value);
      });
      const inputIds = formRecoverMulti.querySelector("input[name=ids]");
      inputIds.value = ids.join(", ");
      formRecoverMulti.submit();
    } else {
      alert("Vui lòng chọn ít nhất 1 bản ghi!");
    }
  });
}
// End Recover Multi
