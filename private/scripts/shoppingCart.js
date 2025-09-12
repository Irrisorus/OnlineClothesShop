async function deleteFromCart(button) {
    const tr = button.closest('.tr'); 
    const article=tr.querySelector(".prod-article_value")
    const amount=tr.querySelector(".prod-amount")
    const size=tr.querySelector(".prod-article_size")
    tr.parentElement.removeChild(tr);
    const response = await fetch(`/brandhouse/shopping-cart/deleteFromCart?article=${article.textContent}&amount=${amount.textContent}&size=${size.textContent}`, {
        method: "DELETE",
      });
    if (!document.querySelectorAll(".tr")) {
        window.location.reload();
    }  
}

async function confirmedOrder() {
    const response = await fetch("/brandhouse/confirmOrder", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body:JSON.stringify({
            name:firstName.value,
            adress:adress.value,
            email:email.value,
            number:phone.value,
        })
    })

    // if (response.ok) {
    //     window.location.reload();
    // }
}
