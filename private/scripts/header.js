const input=document.querySelector(".searchInput")
const burgerMenu = document.getElementById('burgerMenu');
const catalog = document.getElementById('catalog');
const searchCont = document.getElementById('searchCont');
burgerMenu.addEventListener('click', () => {
    burgerMenu.classList.toggle('active');
     catalog.classList.toggle('active');
     searchCont.classList.toggle('active');
});

document.addEventListener( 'keyup', event => {
    if( event.code === 'Enter' ){
        let InpValue= input.value;
        let url=window.location.href
        
        
        url=url.replace(/(title=)[^&]*/, `$1${InpValue}`);
        document.location=url;
    };
  });

