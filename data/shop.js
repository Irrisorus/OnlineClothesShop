const { updateInfo } = require('../controllers/userController');
const {loadData,updateData}=require('./FileManager');
const { users } = require('./users');
let products =JSON.parse(loadData("productsData"));

function FilterBy(sex,brand,type,title) {
    let filteredProducts=[...products]
   
    
    if(title){
        filteredProducts = filteredProducts.filter((product) =>
            product.name.toLowerCase().includes(title.toLowerCase())
        );
    }

    if(sex){
        filteredProducts = filteredProducts.filter((product) =>
            product.sex.toLowerCase()==sex.toLowerCase()
        );
    }

    if(brand){
        filteredProducts = filteredProducts.filter((product) =>
            product.brand.toLowerCase()==brand.toLowerCase()
        );
    }

    if(type){
        filteredProducts = filteredProducts.filter((product) =>
            product.type.toLowerCase()==type.toLowerCase()
        );
    }
    return filteredProducts;

    
}

function getProductByArticle(article) {
    let filteredProduct=products.find((obj => obj.article == article));
    
    
    return filteredProduct;
}

function changeProductAmountByArticle(article,size,amount) {
    
    const product = products.find(p => p.article === article);
    const item = product.availableAmount.find(s => s.size === size);
    if (item.amount<amount) {
        amount=item.amount;
        item.amount=0
    }else{
        item.amount=item.amount-amount
        
    }
    
 
     updateData(products,"productsData")
    return  {name:product.name,article:product.article,size:item.size,price:product.price,amount:amount,img:product.img[0]};
}

function findProductIndexInCart(article,cart) {
    return cart.findIndex(obj => obj.article == article);
}


function deleteProdFromCart(article,cart) {
    
    
        let index=findProductIndexInCart(article,cart)
      
        
        cart.splice(index,1)
      
        
        updateData(users,"users");
        return cart;
      
}

function returnAmountOfProduct(article,amount,size) {

    
    const product = products.find(p => p.article == article);   
    const item = product.availableAmount.find(s => s.size == size);
    
  
    
    
    item.amount=item.amount+Number(amount);
    updateData(products,"productsData")
    return;
}
module.exports={products,FilterBy,getProductByArticle,changeProductAmountByArticle,deleteProdFromCart,returnAmountOfProduct}