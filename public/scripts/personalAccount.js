const logOutBtn=document.querySelector("#logOut");
const editBtn=document.querySelector(".edit-button");
const submitChangeBtn=document.querySelector(".submit-change");
const cancelChangeBtn=document.querySelector(".cancel-change");
const popUpEdit=document.querySelector(".popUp-window");
const errorMessage=document.querySelector(".error-message")
const wrapper=document.querySelector(".popUp-wrapper");
const labels=popUpEdit.querySelectorAll("label")

logOutBtn.addEventListener("click",()=>{
    deleteSession();
})



editBtn.addEventListener("click",()=>{
    popUpEdit.classList.add("popUp-window_active")
    wrapper.style.display="flex"
})


submitChangeBtn.addEventListener("click",()=>{
   if(!username.value || !adress.value || !phoneNumber.value||!confirmPassword.value)
    errorMessage.textContent="Одно из полей не заполнено"
    else
    sendChange();
})


cancelChangeBtn.addEventListener("click",()=>{
    popUpEdit.classList.remove("popUp-window_active")
    wrapper.style.display="none"
})


async function deleteSession() {
    const response= await fetch("/brandhouse/logOut",{
        method:"DELETE"
    })
    window.location.pathname="/brandhouse/catalog"
    const data = await response.json();
}


function isValidPhone(phone) {
    return /^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){10,14}(\s*)?$/.test(phone);
  }

async function sendChange() {
    if(!isValidPhone(phoneNumber.value)){
        console.log(phoneNumber.value);
        
        errorMessage.textContent="Введите номер телефона"
        
        return ;
    }
    const response = await fetch("/brandhouse/updateUserInfo", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body:JSON.stringify({
            name:username.value,
            adress:adress.value,
            phoneNumber:phoneNumber.value,
            password:confirmPassword.value,
        })
    })

    if (!response.ok) {
        console.log(" response is not ok");
        errorMessage.textContent="Неправильный пароль"
        return;
    }
    
    // const data = await response.json();
    
        
    
   window.location.reload();
}