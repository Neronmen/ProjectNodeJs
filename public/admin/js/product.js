

const buttonChangeStatus = document.querySelectorAll("[button-change-status]");
const formChangeStatus = document.querySelector("#form-change-status");
console.log(formChangeStatus)
    buttonChangeStatus.forEach(button => {
        button.addEventListener("click", () => {
            const status = button.getAttribute("data-status");
            const id = button.getAttribute("id");
            const action = formChangeStatus.getAttribute("path") + `${status}/${id}?_method=PATCH`   
            formChangeStatus.action = action
            console.log(status)
            formChangeStatus.submit();
        })
        
    })

