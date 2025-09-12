const {products,FilterBy,getProductByArticle,changeProductAmountByArticle,deleteProdFromCart,returnAmountOfProduct}=require('../data/shop');
const {loadData,updateData}=require('../data/FileManager');
const{findUserInSession,users}=require('../data/users')

const getCatalog = (req, res) => {
    
    const{sex,brand,type,title}=req.query;
    if (!sex & !brand & !type & !title) {
      res.render("catalog.hbs", {products});
    }
    else{
      let products=FilterBy(sex,brand,type,title);
      res.render("catalog.hbs", {products});
    }
    
  
  };

const getProductCard=(req,res)=>{
  const{article}=req.query
  let product=getProductByArticle(article);
 
  
  res.render("productCard.hbs",product)
};

const paymentInfo=(req,res)=>{
  res.render("payment.hbs")
}

const deliveryInfo=(req,res)=>{
  res.render("delivery.hbs")
}


const getShoppingCart=(req,res)=>{
  let localUser

  
  if(!req.session.auth || req.session.auth==false){
    localUser=undefined

    
    cartProduct=req.session.cart;
    
  }else{
    localUser=findUserInSession(req.session.userEmail)
   
    cartProduct=localUser.cart

  }

  
  if (!cartProduct || Object.keys(cartProduct).length==0) {
   
    
    res.render("shoppingCart.hbs",cartProduct)
  }
  else if(!localUser){
    localUser={}
    res.render("shoppingCart.hbs",{cartProduct,message:true,localUser})
    
   
  }
  else
  {

    
    res.render("shoppingCart.hbs",{cartProduct,message:true,localUser})
  }
}



const getRegister=(req,res)=>{
  res.render("register.hbs");
}

const getLog=(req,res)=>{
  res.render("logIn.hbs");
}

  const getPersonalAccount=(req,res)=>{
    localUser=findUserInSession(req.session.userEmail)

    
    res.render("personalAccount.hbs",localUser)
    
};

const getAboutPage=(req,res)=>{
  res.render("aboutUs.hbs")
}

const productAdd=(req,res)=>{
  const{article,size,amount}=req.body;

  let result=changeProductAmountByArticle(article,size,amount)
  if(!req.session.cart){
    
    req.session.cart=[result];
  }
  else{
    req.session.cart.push(result)
    
  }

  if(req.session.auth==true){
    let index=users.indexOf(users.find((user) => user.email === req.session.userEmail))
  
    
    if(users[index].cart){
      
      
      users[index].cart.push(result)
    }
    else{
      users[index].cart=[];
      users[index].cart.push(result)
    }
  }
  let checkedProduct=getProductByArticle(article)
  

  let key=true;
  for (let obj of checkedProduct.availableAmount) {
    if(obj.amount>0){
      key=false;
      break;
    }
  }
  if (key) {
    checkedProduct.outOfstock=true;
  }
  else{
    checkedProduct.outOfstock=false; 
  }
  updateData(products,"productsData")
  updateData(users,"users")
   res.status(200).json();
}





const deleteFromCart=(req,res)=>{
  const{article,amount,size}=req.query;
 
  if (!req.session.auth || req.session.auth==false) {
  
    req.session.cart=deleteProdFromCart(article,req.session.cart)
   
  }
  else{
    let curUser=users.find((user) => user.email === req.session.userEmail)
    deleteProdFromCart(article,curUser.cart);
    
  }
  returnAmountOfProduct(article,amount,size)
  res.status(200).json();
}

const getVerification=(req,res)=>{
  res.render("verification.hbs")
}


const addReview=(req,res)=>{
  const{article,userName,review,reviewText}=req.body
  let revProd=getProductByArticle(article)
  if(!revProd.reviews){
    revProd.reviews=[]
  }
  revProd.reviews.push({userName:userName,review:review,reviewText:reviewText});
  
  updateData(products,"productsData")
  res.status(200).json();
}

module.exports={getCatalog,getProductCard,getRegister,getLog,getPersonalAccount,productAdd,
  getShoppingCart,deleteFromCart,getVerification,addReview,getAboutPage,paymentInfo,deliveryInfo}

