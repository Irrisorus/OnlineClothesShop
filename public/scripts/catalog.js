const brandListItems = document.querySelectorAll('.elem-li__productBrand');
const sexListItems = document.querySelectorAll('#productSex');
const typeListItems = document.querySelectorAll('#productType');
const allListElem= document.querySelectorAll('.elem-li')
const filterSection=document.querySelector(".filter")






allListElem.forEach((elem, index) => {
    const anchorText = elem.querySelector('div');
    
    
    const url=window.location.href
    console.log(url);
    console.log(anchorText.dataset.name)
    if ( url.includes(anchorText.dataset.name)) {
        const inp = elem.querySelector('.inp');
        console.log(inp);
        
        inp.classList.add('inp_active');
    }
});

function redirectToCard(article) {
    console.log(article);
    
    window.location=`http://localhost:3000/brandhouse/catalog/product?article=${article}`
}


brandListItems.forEach((item,index)=> {
    item.addEventListener('click', () => {
        const anchorText = item.querySelector('div');
        const inp = item.querySelector('.inp');
        let url=window.location.href
        
        
        // if(url=="http://localhost:3000/brandhouse/catalog"){
        //     url="http://localhost:3000/brandhouse/catalog?sex=&type=&brand=&title="
        // }
        
        if(inp.classList.contains("inp_active")){
           
            
            inp.classList.remove('active');
           
            
            url=url.replace(/(brand=)[^&]*/, `$1`);
            
             window.location=url;
        }
        else{
           
            inp.classList.add('inp_active');
           
            url=url.replace(/(brand=)[^&]*/, `$1${anchorText.textContent}`);
           
            window.location=url;
        }
        
    });
});

console.log(allListElem);





sexListItems.forEach((item,index) => {
    item.addEventListener('click', () => {
        
        const anchorText = item.querySelector('div');
        const inp = item.querySelector('.inp');
        let url=window.location.href
         
        // if(url=="http://localhost:3000/brandhouse/catalog"){
        //     url="http://localhost:3000/brandhouse/catalog?sex=&type=&brand=&title="
        // }
        if(inp.classList.contains("inp_active")){
           
          
            inp.classList.remove('active');
            
            url=url.replace(/(sex=)[^&]*/, `$1`);
           
            
             window.location=url;
        }
        else{
           

            
            inp.classList.add('inp_active');
           

           switch (anchorText.textContent) {
            case "Мужское":
                url=url.replace(/(sex=)[^&]*/, `$1Male`);
                break;
            case "Женское":
                url=url.replace(/(sex=)[^&]*/, `$1female`);
                break;
        
            default:
                break;
        }
            // url=url.replace(/(sex=)[^&]*/, `$1${anchorText.textContent}`);
           
            window.location=url;
        }
        
    });

});

typeListItems.forEach((item,index)=> {
    item.addEventListener('click', () => {
        const anchorText = item.querySelector('div');
        const inp = item.querySelector('.inp');
        let url=window.location.href
         
        // if(url=="http://localhost:3000/brandhouse/catalog"){
        //     url="http://localhost:3000/brandhouse/catalog?sex=&type=&brand=&title="
        // }
        if(inp.classList.contains("inp_active")){
           
            
            inp.classList.remove('active');
           
            url=url.replace(/(type=)[^&]*/, `$1`);
           
            
             window.location=url;
        }
        else{
           
            switch (anchorText.textContent) {
                case "Футболки":
                    url=url.replace(/(type=)[^&]*/, `$1shirt`);
                    break;
                case "Обувь":
                    url=url.replace(/(type=)[^&]*/, `$1shoes`);
                    break;
                case "Штаны":
                    url=url.replace(/(type=)[^&]*/, `$1pants`);
                    break;
                case "Куртки":
                    url=url.replace(/(type=)[^&]*/, `$1jacket`);
                    break;       
            
                default:
                    break;
            }

            inp.classList.add('inp_active');
            
            // url=url.replace(/(type=)[^&]*/, `$1${anchorText.textContent}`);
           
            window.location=url;
        }
        
    });
});