document.addEventListener('DOMContentLoaded', () => {
const openPopupButton = document.querySelector('.edit-button');
const popup = document.getElementById('popup');
const cancelButton = document.getElementById('cancelButton');
const confirmButton = document.getElementById('confirmButton');
const deleteButton = document.querySelector('.delete-button');
const sizesContainer = document.getElementById('sizes-container');
const form=document.querySelector(".product-form")

form.addEventListener("submit",(e)=>{
    e.preventDefault()
})

openPopupButton.addEventListener('click', ()=> {
    popup.style.display = 'flex';
});

cancelButton.addEventListener('click', ()=> {
    popup.style.display = 'none'; 
});

if (deleteButton!=null) {
    deleteButton.addEventListener('click',()=>{
        popup.style.display = 'flex'; 
        confirmButton.classList.add("delete")
    })
}


confirmButton.addEventListener('click', ()=> {
    if(confirmButton.classList.contains("delete")){
        deleteProduct()
    }
    else{
        popup.style.display = 'none'; 
        SendChanges();
    }
    
});




async function SendChanges() {
    const sizes =Array.from(sizesContainer.querySelectorAll(".size"))
    const amounts=Array.from(sizesContainer.querySelectorAll(".size-amount"))
    const img=Array.from(document.querySelectorAll("#photoUrl"))
    
    let imgArr=[]
    let result=[]

    for (let i = 0; i < img.length; i++) {
        imgArr[i]=img[i].value;
    }
  
    
    
    
    for (let index = 0; index < amounts.length; index++) {
      
       result[index]={size:sizes[index].value,amount:amounts[index].value}
       
       
        
    }

    let url=window.location.href
    let resMethod
    let fetchUrl

    if (url.includes("creationCard")) {
        resMethod="POST"
        fetchUrl="/admin/createProduct"
    }
    else if(url.includes("productEdit")){
        resMethod="PUT"
        fetchUrl="/admin/changeProduct"
    
    
    }
    console.log(firstName.value+" "+ article.value);
    
    const response = await fetch(fetchUrl, {
        method:resMethod,
        headers: {
          "Content-Type": "application/json",
        },
        body:JSON.stringify({
            name:firstName.value,
            article:article.value,
            brand:brand.value,
            price:price.value,
            salePrice:discountPrice.value,
            availableAmount:result,
            img:imgArr,
            type:type.value,
            sex:sex.value
        })
    })

    if (response.ok) {
        
            let notification = document.getElementById('notification');
            notification.style.display = 'block'; 
            notification.classList.remove('slide-up');
            setTimeout(() => {
                notification.style.display = 'none'; 
            }, 5000); 
        
    }
}

async function deleteProduct() {
    const response = await fetch(`/admin/product/delete?artilce=${article.value}`, {
        method: "DELETE",
      });
    if (response.ok) {
        window.location.href="/admin/adminCatalog"
    }
    return
}


});