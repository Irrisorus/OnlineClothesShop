const sizeChoice=document.querySelectorAll('.size-box');
const quantityMinusBtn=document.querySelector('.quantity-minus-btn');
const ProdQuantity=document.querySelector('.product-quantity');
const quantityPlusBtn=document.querySelector('.quantity-plus-btn');
const addToCartBtn=document.querySelector('.btn')
const form = document.getElementById('addReviewForm');
const reviewBtn=document.getElementById('reviewBtn');
const reviewSwiperWrapper=document.querySelector('.review-slider-wrapper')
let activeBox=document.querySelector('.size-box_active');


sizeChoice.forEach((elem)=>{
    elem.addEventListener('click',(e)=>{  
        if (activeBox) {
            activeBox.classList.remove('size-box_active');
        }
        
        elem.classList.add('size-box_active');
        activeBox=elem;
    })
})

quantityMinusBtn.addEventListener('click',(e)=>{
    if(ProdQuantity.textContent<=1){
        return;
    }
    else{
        ProdQuantity.textContent--;
    }
})
quantityPlusBtn.addEventListener('click',(e)=>{
    if(ProdQuantity.textContent>=10){
        return;
    }
    else{
        ProdQuantity.textContent++;
    }
})

addToCartBtn.addEventListener('click',(e)=>{
    
    AddElemToCart();
})


reviewBtn.addEventListener('click',(e)=>{
  if (userName.value) {
    addReview()
  }
  
})

async function addReview() {
  if(!userName.value && !review.value){
    return;
  }
  const response = await fetch("/brandhouse/product/addReview", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body:JSON.stringify({
        article:article.textContent,
        userName:userName.value,
        review:rating.value,
        reviewText:review.value
    })
  })
  if (response.ok) {
    console.log("resp is ok");
    let slide=`
      <div class="swiper-slide swiper-review-slide">
                        <div class="review-card">
                            <h3>${userName.value}</h3>
                            <div class="stars">${rating.value}★</div>
                            <p class="review-text">${review.value}</p>
                        </div>
      </div>
    ` 
    if (document.querySelector('.no-reviews-h2')) {
      document.querySelector('.no-reviews-h2').remove();
    }
    reviewSlider.appendSlide(slide)



}

form.addEventListener('submit',(e)=>{
  e.preventDefault();
  e.target.reset(); 
})

}



async function AddElemToCart() {
    const response = await fetch("/brandhouse/addToCart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body:JSON.stringify({
            article:article.textContent,
            size:activeBox.textContent,
            amount:ProdQuantity.textContent
        })
    })

    if (response.ok) {
        window.location.reload();
    }
    
}

const swiper = new Swiper('.swiper', {
    
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  
   
  });



  const reviewSlider= new Swiper('.swiper-review-slider', {
    slidesPerView: 1,
    // spaceBetween: 30,
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
    // loop: true,
   dragable:true,
    breakpoints: {
      768: {
        slidesPerView: 2,
      },
      1024: {
        slidesPerView: 3,
      },
    }
  });

