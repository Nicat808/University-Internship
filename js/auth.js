const showPasswordBtn = document.querySelector(".show-password-btn")
const passwordInput = document.querySelector("#auth-password")


showPasswordBtn.addEventListener("click",()=>{
    if (showPasswordBtn.classList[1] === "fa-eye") {
        showPasswordBtn.className = "fa-regular fa-eye-slash show-password-btn"
        passwordInput.type = 'text'
    }else{
        showPasswordBtn.className = "fa-regular fa-eye show-password-btn"
        passwordInput.type = 'password'
    }
    
})